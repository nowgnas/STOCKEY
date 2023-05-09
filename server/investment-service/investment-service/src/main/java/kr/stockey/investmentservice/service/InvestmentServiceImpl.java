package kr.stockey.investmentservice.service;

import kr.stockey.investmentservice.dto.OrderListDto;
import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.entity.Contract;
import kr.stockey.investmentservice.entity.Deposit;
import kr.stockey.investmentservice.entity.MyStock;
import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import kr.stockey.investmentservice.kafka.producer.StockOrderProducer;
import kr.stockey.investmentservice.redis.Order;
import kr.stockey.investmentservice.redis.OrderRedisRepository;
import kr.stockey.investmentservice.repository.ContractRepository;
import kr.stockey.investmentservice.repository.DepositRepository;
import kr.stockey.investmentservice.repository.MyStockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class InvestmentServiceImpl implements InvestmentService{

    private final long DEFAULT_CREDIT = 10000000;
    private final StockOrderProducer stockOrderProducer;
    private final OrderRedisRepository orderRedisRepository;
    private final DepositRepository depositRepository;
    private final MyStockRepository myStockRepository;
    private final ContractRepository contractRepository;


    /**
     * 주문을 받아서 카프카 topic에 적재
     * 주문 가능시간: 9시 ~ 15시 && 매 05분 ~ 다음 시간 00분까지
     */
    @Override
    public void takeStockOrder(OrderProducerDto orderProducerDto) throws Exception {
        // 주문 가능 시간일 때만 진행
        if (checkOrderAvailableTime()) {
            stockOrderProducer.send(orderProducerDto);
        }
    }

    private boolean checkOrderAvailableTime() throws Exception {
        LocalDateTime now = LocalDateTime.now(); // 한국 시간 기준으로 현재 시간을 가져옴

        int hour = now.getHour();
        int minute = now.getMinute();

        // 주문 가능시간: 9시 ~ 15시 && 매 05분 ~ 다음 시간 00분까지
        if (!(hour >= 9 && hour < 15) && minute >= 1 && minute <= 4) {
            throw new Exception("주문 가능한 시간이 아닙니다.");
        }
        return true;
    }

    /**
     * 매 02분마다 체결 진행
     */

    @Scheduled(cron = "0 2 * * * *", zone = "Asia/Seoul")
    public void orderExecuteScheduler() {
        // 실행할 메소드 내용 작성
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        if (now.getHour() >= 9 && now.getHour() <= 15 && now.getMinute() == 2) {
            // 오전 9시 ~ 오후 3시 사이, 2분일 때 실행
            // 실행할 코드 작성
            orderExecute();
        }
    }

    @Transactional
    public void orderExecute() {
        // 주식 현재가 테이블 가져오기 (매 2분마다 갱신된 최신 주가정보 가져오기)
        Map<Long, Long> stockPriceMap = getStockPrice();

        // 레디스에 쌓인 모든 order 데이터 가져와 list로 만들기
        Iterable<Order> orderIterable = orderRedisRepository.findAll();
        List<Order> wholeOrderList = new ArrayList<>();
        for (Order order : orderIterable) {
            wholeOrderList.add(order);
        }
        // 시간순 정렬
        Collections.sort(wholeOrderList);

        // 앞에서 부터 주문 체결 진행 (각 멤버 id는 고유)
        for (Order memberOrder : wholeOrderList) {
            // member id로 가장 최신 deposit history 체크 -> 없다면 최초거래이므로 기본크레딧에서 시작
            Long curMemberId = memberOrder.getMemberId();
            Optional<Deposit> depositOptional = depositRepository.findLatestDepositByMemberId(curMemberId);
            List<OrderListDto> stockOrders = memberOrder.getOrders();
            Long curMoney;

            if (depositOptional.isEmpty()) {
                // 잔액 히스토리가 없다면 디폴트 크레딧으로 시작 & 첫 거래이므로 보유 주식도 없음
                curMoney = DEFAULT_CREDIT;
                for (OrderListDto stockOrder : stockOrders) {
                    Long curStockId = stockOrder.getStockId(); // 현재 주문 주식 id
                    Long curStockPrice = stockPriceMap.get(curStockId); // 주식 현재가
                    int orderStockCount = stockOrder.getCount(); // 주문한 주식 수

                    switch (stockOrder.getOrderType()) {
                        case BUY -> {
                            // 소지금보다 결제할 수량이 더 크다면.. 돈 되는 만큼만 구매
                            Long maxBuyableQuantity = curMoney / curStockPrice; // 최대 구매 가능 주식 수
                            Long actualQuantity = Math.min(maxBuyableQuantity, orderStockCount); // 돈이 부족하면 왼쪽, 충분하면 오른쪽
                            Long payMoney = curStockPrice * actualQuantity;

                            // 금액 지불
                            curMoney -= payMoney;

                            // 보유종목 update (처음 거래니까 그냥 save)
                            MyStock myStock = MyStock.builder()
                                    .memberId(curMemberId)
                                    .stockId(curStockId)
                                    .avgPrice((double) curStockPrice)
                                    .count(actualQuantity).build();
                            myStockRepository.save(myStock);

                            // 체결 엔티티 생성 및 saveAll list에 추가
                            Contract contract = Contract.builder()
                                    .memberId(curMemberId)
                                    .stockId(curStockId)
                                    .count(actualQuantity)
                                    .contractType(ContractType.BUY)
                                    .createdAt(LocalDateTime.now())
                                    .category(InvCategory.CONTRACT)
                                    .build();
                            contractRepository.save(contract);
                        }
                        case SELL -> log.error("첫거래일때는 Sell 할 수 없음");
                    }
                }

            } else {
                // 최신 잔액부터 시작
                Deposit deposit = depositOptional.get();
                curMoney = deposit.getMoney();

                // 보유주식 가져오기
                List<MyStock> myStocks = myStockRepository.findByMemberId(curMemberId);

                for (OrderListDto stockOrder : stockOrders) {
                    Long curStockId = stockOrder.getStockId(); // 현재 주문 주식 id
                    Long curStockPrice = stockPriceMap.get(curStockId); // 주식 현재가
                    int orderStockCount = stockOrder.getCount(); // 주문한 주식 수

                    switch (stockOrder.getOrderType()) {
                        case BUY -> {
                            // 소지금보다 결제할 수량이 더 크다면.. 돈 되는 만큼만 구매
                            Long maxBuyableQuantity = curMoney / curStockPrice; // 최대 구매 가능 주식 수
                            Long actualQuantity = Math.min(maxBuyableQuantity, orderStockCount); // 돈이 부족하면 왼쪽, 충분하면 오른쪽
                            Long payMoney = curStockPrice * actualQuantity;

                            // 금액 지불
                            curMoney -= payMoney;

                            // 보유종목 update (처음 거래니까 그냥 save)
                            MyStock myStock = MyStock.builder()
                                    .memberId(curMemberId)
                                    .stockId(curStockId)
                                    .avgPrice((double) curStockPrice)
                                    .count(actualQuantity).build();
                            myStockRepository.save(myStock);

                            // 체결 엔티티 생성 및 saveAll list에 추가
                            Contract contract = Contract.builder()
                                    .memberId(curMemberId)
                                    .stockId(curStockId)
                                    .count(actualQuantity)
                                    .contractType(ContractType.BUY)
                                    .createdAt(LocalDateTime.now())
                                    .category(InvCategory.CONTRACT)
                                    .build();
                            contractRepository.save(contract);
                        }
                        case SELL -> log.error("첫거래일때는 Sell 할 수 없음");
                    }
                }
            }

            // 정산 완료된 금액을 deposit history에 넣기
            Deposit resultDeposit = Deposit.builder()
                    .memberId(curMemberId)
                    .createdAt(LocalDateTime.now())
                    .money(curMoney).build();
            depositRepository.save(resultDeposit);
        }

        // 코드 완성 후 이거 세개만 @Transactional 하는게 좋을지 이 메소드 전체에 하는게 좋을지 형한테 물어보기

        // wholeOrderList 내용 DB에 적재

    }

    private Map<Long, Long> getStockPrice() {
        // 주식 서버와 통신하여 현재 가격 가져오기
        return null;
    }
}
