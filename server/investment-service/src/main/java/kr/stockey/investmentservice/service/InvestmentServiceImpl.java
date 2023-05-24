package kr.stockey.investmentservice.service;

import kr.stockey.investmentservice.api.response.GetPopularStocksResponse;
import kr.stockey.investmentservice.api.response.WholeStockInfoResponse;
import kr.stockey.investmentservice.client.MemberClient;
import kr.stockey.investmentservice.dto.*;
import kr.stockey.investmentservice.entity.*;
import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import kr.stockey.investmentservice.exception.investment.InvestmentException;
import kr.stockey.investmentservice.exception.investment.InvestmentExceptionType;
import kr.stockey.investmentservice.kafka.producer.StockOrderProducer;
import kr.stockey.investmentservice.mapper.InvestmentMapper;
import kr.stockey.investmentservice.redis.Order;
import kr.stockey.investmentservice.redis.OrderRedisRepository;
import kr.stockey.investmentservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class InvestmentServiceImpl implements InvestmentService{

    private final long DEFAULT_CREDIT = 10000000;
    public Map<Long, Long> stockPriceMap = new HashMap<>();; // 데이터 캐싱
    public Map<Long, String> stockIdToNameMap; // 변하지 않는 주식 정보 캐싱
    public List<TraderRankDto> traderRankDtoList; // 유저 랭킹 정보 캐싱 -> 주문 체결시마다 update

    private final StockOrderProducer stockOrderProducer;
    private final OrderRedisRepository orderRedisRepository;
    private final DepositRepository depositRepository;
    private final MyStockRepository myStockRepository;
    private final ContractRepository contractRepository;
    private final DailyStockRepository dailyStockRepository;
    private final StockRepository stockRepository;
    private final InvestmentMapper investmentMapper;
    private final MemberClient memberClient;

    @PostConstruct
    public void init() {
        initStockPriceMap();
        stockIdToNameMap = makeStockIdToNameMap();
        traderRankDtoList = updateUserRank();
        log.info("Caching data initialization complete!");
        log.info("stock price map:");
        System.out.println(stockPriceMap);
        log.info("stockIdToName map:");
        System.out.println(stockIdToNameMap);
        log.info("trader rank:");
        System.out.println(traderRankDtoList);
    }


    /**
     * 주문을 받아서 카프카 topic에 적재
     * 주문 가능시간: 9시 ~ 15시 && 매 05분 ~ 다음 시간 00분까지
     */
    @Override
    public void takeStockOrder(OrderProducerDto orderProducerDto) {
        // 주문 가능 시간일 때만 진행
        if (checkOrderAvailableTime()) {
            stockOrderProducer.send(orderProducerDto);
        }
    }

    private boolean checkOrderAvailableTime() {
//        LocalDateTime now = LocalDateTime.now(); // 한국 시간 기준으로 현재 시간을 가져옴
//
//        int hour = now.getHour();
//
//        // 주문 가능시간: 9시 ~ 15시
//        if (!(hour >= 9 && hour < 15)) {
//            throw new InvestmentException(InvestmentExceptionType.NOT_ORDERING_TIME);
//        }
        return true;
    }

    /**
     * 매 02분마다 체결 진행
     */

//    @Scheduled(cron = "0 2 * * * *", zone = "Asia/Seoul")
    @Transactional
    @Scheduled(cron = "0 0/1 * * * *", zone = "Asia/Seoul")  // 0분부터 55분까지 1분 간격으로 실행 -> 개발용
    public void orderExecuteScheduler() {
        // 실행할 메소드 내용 작성
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        // 오전 9시 ~ 오후 3시 사이, 2분일 때 실행
        if (now.getHour() >= 9 && now.getHour() <= 15 && now.getMinute() == 2 || true) {
            executeRun();
        }
    }

    public void executeRun() {
        // 주문 체결 실행
        orderExecute();
        // 랭킹 업데이트
        traderRankDtoList = updateUserRank();
    }


    private List<TraderRankDto> updateUserRank() {
        List<TraderRankDto> traderRankDtos = new ArrayList<>();
        // 전체 회원 가져오기
        Map<Long, String> memberIdAndNicknameMap = getWholeMemberInfo();
        // member id만 모으기
        Set<Long> memberIds = memberIdAndNicknameMap.keySet();
        for (Long memberId : memberIds) {
            String nickname = memberIdAndNicknameMap.get(memberId);
            // 회원의 자산 정보 가져오기
            Long totalAssets = getMyAccount(memberId).getTotalAssets();
            traderRankDtos.add(new TraderRankDto(nickname, totalAssets, null));
        }
        assignRanks(traderRankDtos);
        return traderRankDtos;
    }

    private void assignRanks(List<TraderRankDto> traders) {
        List<TraderRankDto> sortedTraders = traders.stream()
                .sorted((o1, o2) -> o2.getTotalAsset().compareTo(o1.getTotalAsset()))
                .toList();

        long rank = 1;
        long count = 1;
        Long previousAsset = null;

        for (TraderRankDto trader : sortedTraders) {
            if (previousAsset != null && !trader.getTotalAsset().equals(previousAsset)) {
                rank = count;
            }

            trader.setRanking(rank);
            previousAsset = trader.getTotalAsset();
            count++;
        }
    }

    @Override
    public List<TraderRankDto> getTraderRank(Long num) {
        return getFirstNElements(traderRankDtoList, num);
    }

    @Override
    public List<AccountFlowDto> getWeeklyAssetInfo(Long memberId) {

        // 현재 보유 주식 정보 가져오기


        List<LocalDate> weekDates = getWeekDates(LocalDate.now());
        // 최신 날짜 순으로 정렬
        weekDates.sort(Collections.reverseOrder());

        // 특정 날짜에 대해 모든 체결 데이터 가져오기
        for (LocalDate date : weekDates) {
            System.out.println(date);
        }

        return null;
    }

    @Override
    public OrderStatusDto getOrderStatus(Long stockId) {
        Long buyCnt = 0L;
        Long sellCnt = 0L;

        List<Order> allOrders = (List<Order>) orderRedisRepository.findAll();
        for (Order order : allOrders) {
            List<OrderListDto> orderListDtos = order.getOrders().stream()
                    .filter(dto -> dto.getStockId().equals(stockId))
                    .toList();
            for (OrderListDto orderListDto : orderListDtos) {
                if (orderListDto.getOrderType().equals(ContractType.BUY)) {
                    buyCnt++;
                } else {
                    sellCnt++;
                }
            }
        }
        return OrderStatusDto.builder().buy(buyCnt).sell(sellCnt).build();
    }

    @Override
    public Long getMyRank(String nickname) {
        return traderRankDtoList.stream()
                .filter(traderRankDto -> traderRankDto.getNickName().equals(nickname))
                .findFirst()
                .map(TraderRankDto::getRanking)
                .orElse(-1L);
    }

    @Override
    public List<WholeStockInfoResponse> getWholeStockInfo() {
        List<WholeStockInfoResponse> responses = new ArrayList<>();
        for (Long stockId : stockPriceMap.keySet()) {
            String stockName = stockIdToNameMap.get(stockId);
            Long stockPrice = stockPriceMap.get(stockId);
            responses.add(new WholeStockInfoResponse(stockId, stockName, stockPrice));
        }
        return responses;
    }

    @Override
    public List<GetPopularStocksResponse> getPopularStocks(Long topN) {
        Map<Long, Long> stockOrderCountMap = new HashMap<>();
        // 1. 현재 레디스에 등록된 주문 모두 가져오기
        List<Order> wholeCurOrders = (List<Order>) orderRedisRepository.findAll();
        for (Order memberOrder : wholeCurOrders) {
            List<OrderListDto> orders = memberOrder.getOrders();
            for (OrderListDto order : orders) {
                Long stockId = order.getStockId();
                Long count = Long.valueOf(order.getCount());
                if (stockOrderCountMap.containsKey(stockId)) {
                    // If the stockId already exists, add the count to the existing value
                    stockOrderCountMap.put(stockId, stockOrderCountMap.get(stockId) + count);
                } else {
                    // If the stockId does not exist, add a new entry with the count as value
                    stockOrderCountMap.put(stockId, count);
                }
            }
        }

        List<Map.Entry<Long, Long>> sortedEntries = stockOrderCountMap.entrySet().stream()
                .sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
                .limit(topN).toList();

        List<GetPopularStocksResponse> res = new ArrayList<>();
        for (Map.Entry<Long, Long> entry : sortedEntries) {
            res.add(new GetPopularStocksResponse(entry.getKey(), stockIdToNameMap.get(entry.getKey())));
        }
        return res;
    }

    // 인자로 들어온 날짜가 속한 주의 날짜들 리턴 (월 ~ 일)
    private List<LocalDate> getWeekDates(LocalDate date) {
        LocalDate sunday = date.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        LocalDate monday = sunday.minusDays(6);

        List<LocalDate> weekDates = new ArrayList<>();
        LocalDate currentDay = monday;
        while (!currentDay.isAfter(sunday)) {
            weekDates.add(currentDay);
            currentDay = currentDay.plusDays(1);
        }

        return weekDates;
    }

    private  <T> List<T> getFirstNElements(List<T> inputList, Long N) {
        return inputList.stream()
                .limit(N)
                .toList();
    }

    private Map<Long, String> getWholeMemberInfo() {
        return memberClient.getWholeMembers();
    }


    @Override
    public Boolean checkOrderSubmit(Long memberId) {
        Optional<Order> orderOptional = orderRedisRepository.findById(String.valueOf(memberId));
        if (orderOptional.isEmpty()) {
            return false; // 레디스에 없다면 주문 제출 안된것
        }
        return true; // 레디스에 있다면 주문 제출 된것 (체결은 안된것)
    }

    @Override
    public List<OrderHistoryDto> getOrderHistory(Long memberId) {
        // 리턴 데이터
        List<OrderHistoryDto> orderHistoryDtoList = new ArrayList<>();

        // 현재 날짜 기준 이번주 첫날, 끝날 날짜 정보 가져오기
        List<LocalDateTime> stEdWeekDates = getStEdWeekDates();// 월요일, 일요일 시간 정보
        LocalDateTime startTime = stEdWeekDates.get(0);
        LocalDateTime endTime = stEdWeekDates.get(1);

        // 특정 유저의 이번주에 주문, 체결 정보 모두 가져오기

        // redis에 존재하는 주문 정보 가져오기 -> 체결 데이터 없는 정보
        List<Order> allOrders = (List<Order>) orderRedisRepository.findAll();
        for (Order order : allOrders) {
            List<OrderListDto> orderListDtos = order.getOrders();
            for (OrderListDto orderListDto : orderListDtos) {
                OrderHistoryDto orderHistoryDto = OrderHistoryDto.builder()
                        .stockId(orderListDto.getStockId())
                        .stockName(stockIdToNameMap.get(orderListDto.getStockId()))
                        .orderCount(Long.valueOf(orderListDto.getCount()))
                        .contractCount(0L)
                        .contractPrice(0L)
                        .profit(0.0)
                        .contractType(orderListDto.getOrderType())
                        .createdAt(order.getOrderTime())
                        .build();
                orderHistoryDtoList.add(orderHistoryDto);
            }
        }

        // db에 저장된 주문, 체결 정보 가져오기
        List<Contract> contractsAndOrders = contractRepository.findByMemberIdAndCreatedAtBetween(memberId, startTime, endTime);
        List<ContractDto> contractsAndOrdersDtoList = investmentMapper.toContractDtoList(contractsAndOrders);

        // contract, order 리스트 나누기
        Map<InvCategory, List<ContractDto>> contractsByCategory = contractsAndOrdersDtoList.stream()
                .collect(Collectors.groupingBy(ContractDto::getCategory));

        // Then you can access the lists by the category
        List<ContractDto> contractList = contractsByCategory.get(InvCategory.CONTRACT);
        List<ContractDto> orderList = contractsByCategory.get(InvCategory.ORDER);

        if (orderList!=null) {
            // First, create a map from the contractList for easy access
            Map<Long, ContractDto> contractMap = contractList.stream()
                    .filter(Objects::nonNull)
                    .filter(contract -> contract.getMatchOrderId() != null)
                    .collect(Collectors.toMap(ContractDto::getMatchOrderId, contract -> contract));

            // Then, for each order, find the corresponding contract
            for (ContractDto order : orderList) {
                ContractDto matchingContract = contractMap.get(order.getId());
                if (matchingContract != null) {
                    OrderHistoryDto orderHistoryDto = OrderHistoryDto.builder()
                            .stockId(order.getStockId())
                            .stockName(stockIdToNameMap.get(order.getStockId()))
                            .orderCount(order.getCount())
                            .contractCount(matchingContract.getCount())
                            .contractPrice(matchingContract.getContractPrice())
                            .profit(matchingContract.getProfit())
                            .contractType(order.getContractType())
                            .createdAt(order.getCreatedAt())
                            .build();
                    orderHistoryDtoList.add(orderHistoryDto);
                }
            }
        }
        return orderHistoryDtoList;
    }

    private List<LocalDateTime> getStEdWeekDates() {
        // Get this week's Monday and Sunday information based on today's date and time
        LocalDateTime dateTime = LocalDateTime.now();
        LocalDateTime sunday = dateTime.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)).withHour(23).withMinute(59).withSecond(59);
        LocalDateTime monday = sunday.minusDays(6).withHour(0).withMinute(0).withSecond(0);
        return Arrays.asList(monday, sunday);
    }

    private Map<Long, String> makeStockIdToNameMap() {
        List<Stock> stocks = stockRepository.findAll();
        Map<Long, String> idNameMap = new HashMap<>();
        for (Stock stock : stocks) {
            idNameMap.put(stock.getId(), stock.getName());
        }
        return idNameMap;
    }

    @Override
    public AccountDto getMyAccount(Long memberId) {
        // 총 자산 = 주식 평가금액 + 예수금
        Long curDeposit = 0L; // 예수금
        Long curStockValuation = 0L; // 주식 평가금액
        Long totalAsset = 0L; // 총 자산

        // 예수금 -> history에서 최신 가져오기
        Optional<Deposit> depositOptional = depositRepository.findLatestDepositByMemberId(memberId);
        if (depositOptional.isEmpty()) {
            // 첫거래면 보유 주식이 없음. 돈은 기본 크레딧
            curDeposit = DEFAULT_CREDIT;
            return new AccountDto(curDeposit, curStockValuation, curDeposit);
        } else {
            Deposit deposit = depositOptional.get();
            curDeposit = deposit.getMoney();
        }

        // 주식 평가금액 -> myStock 데이터 가져와서 특정 stockId에 해당하는 주식 현재가 가져와서 count랑 곱하기
        List<MyStock> myStocks = myStockRepository.findByMemberId(memberId);
        for (MyStock myStock : myStocks) {
            try {
                System.out.println("myStock = " + myStock);
                Long curStockId = myStock.getStockId();
                Long curStockPrice = stockPriceMap.get(curStockId);
                curStockValuation += curStockPrice * myStock.getCount();
            } catch (NullPointerException e) {
                String curStockName = stockIdToNameMap.get(myStock.getStockId());
                log.error("일일 주가 크롤링러로 부터 온 오늘 날짜의 데이터가 존재하지 않음. 주식명: " + curStockName);
            }

        }

        // 총 자산 = 주식 평가금액 + 예수금
        totalAsset = curDeposit + curStockValuation;
        return new AccountDto(totalAsset, curStockValuation, curDeposit);
    }

    @Override
    public List<MyStockInfoDto> getMyStockInfo(Long memberId) {
        List<MyStockInfoDto> resLst = new ArrayList<>();

        // 1. 주식 목록
        List<MyStock> myStocks = myStockRepository.findByMemberId(memberId);
        if (myStocks.isEmpty()) {
            throw new InvestmentException(InvestmentExceptionType.NO_OWNED_STOCK);
        }

        // 전체 주식 평가 금액
        double totalSv = myStocks.stream()
                .mapToDouble(this::calcMyStockValuation)
                .sum();

        for (MyStock myStock : myStocks) {
            Long curStockId = myStock.getStockId();
            // 2. 평가액 비중 = 해당 종목의 평가금액 / 전체 주식 평가금액
            Long curSv = stockPriceMap.get(curStockId) * myStock.getCount(); // 해당 종목의 평가금액
            Double curSvp = curSv / totalSv;

            // 3. 수익률 = (현재가 - 매입 평균단가) / 매입 평균단가
            Double avgPrice = myStock.getAvgPrice(); // 매입 평균단가
            Long curStockPrice = stockPriceMap.get(curStockId); // 현재가
            Double curRrp = (curStockPrice - avgPrice) * 100 / avgPrice; // 수익률

            // 현재 주식명
            String curStockName = stockIdToNameMap.get(myStock.getStockId());

            // MyStockInfo 객체 생성
            MyStockInfoDto myStockInfoDto = MyStockInfoDto.builder()
                    .stockId(curStockId)
                    .stockName(curStockName)
                    .svp(curSvp)
                    .rrp(curRrp)
                    .curStockPrice(stockPriceMap.get(curStockId))
                    .avgPrice(avgPrice)
                    .count(myStock.getCount()).build();

            resLst.add(myStockInfoDto);
        }
        return resLst;
    }

    private double calcMyStockValuation(MyStock myStock) {
        Long stockId = myStock.getStockId();
        Long stockPrice = stockPriceMap.get(stockId);
        double sv = stockPrice * myStock.getCount();
        return sv;
    }


    public void orderExecute() {
        // 주식 현재가 테이블 가져오기 (매 2분마다 갱신된 최신 주가정보 가져오기)
//        Map<Long, Long> stockPriceMap = getStockPrice();

        // 레디스에 쌓인 모든 order 데이터 가져와 list로 만들기
        Iterable<Order> orderIterable = orderRedisRepository.findAll();
        List<Order> rawOrderList = new ArrayList<>();
        for (Order order : orderIterable) {
            rawOrderList.add(order);
        }
        // 시간순 정렬
        Collections.sort(rawOrderList);
        System.out.println("rawOrderList = " + rawOrderList);

        // 이전 라운드에 대한 주문만 남기기
        List<Order> wholeRedisOrderList = filterOrders(rawOrderList);
        System.out.println("wholeRedisOrderList = " + wholeRedisOrderList);

        // wholeOrderList 내용 DB에 적재 및 가져오기
        List<Contract> justOrdersEntities = loadOrderIntoDB(wholeRedisOrderList);
        List<OrderDto> justOrders = investmentMapper.toOrderDtoList(justOrdersEntities);

        System.out.println("justOrders = " + justOrders);
        List<MemberOrderDto> memberOrderList = justOrdersToMemberOrderList(justOrders);

        // 앞에서 부터 주문 체결 진행 (각 멤버 id는 고유)
        for (MemberOrderDto memberOrder : memberOrderList) {
            // member id로 가장 최신 deposit history 체크 -> 없다면 최초거래이므로 기본크레딧에서 시작
            Long curMemberId = memberOrder.getMemberId();
            System.out.println("curMemberId = " + curMemberId);
            Optional<Deposit> depositOptional = depositRepository.findLatestDepositByMemberId(curMemberId);
            List<OrderListDto> stockOrders = memberOrder.getOrders();
            
            Long curMoney;
            if (depositOptional.isEmpty()) {
                // 잔액 히스토리가 없다면 디폴트 크레딧으로 시작 & 첫 거래이므로 보유 주식도 없음
                curMoney = DEFAULT_CREDIT;
            } else {
                // 최신 잔액부터 시작
                Deposit deposit = depositOptional.get();
                curMoney = deposit.getMoney();
            }

            // 현재 멤버의 보유주식 전체 get
            List<MyStock> myStocks = myStockRepository.findByMemberId(curMemberId);

            // 현재 멤버의 주문 목록 탐색
            for (OrderListDto stockOrder : stockOrders) {
                Long curStockId = stockOrder.getStockId(); // 현재 주문 주식 id
                Long curStockPrice = stockPriceMap.get(curStockId); // 주식 현재가
                int orderStockCount = stockOrder.getCount(); // 주문한 주식 수
                System.out.println("stockOrder = " + stockOrder);
                System.out.println("curStockPrice = " + curStockPrice);

                // 현재 주문에 대해 기존 보유종목 가져오기
                Optional<MyStock> myCurStockOptional = myStocks.stream()
                        .filter(myStock -> myStock.getStockId().equals(curStockId))
                        .findFirst();

                switch (stockOrder.getOrderType()) {
                    case BUY -> {
                        // 소지금보다 결제할 수량이 더 크다면 돈 되는 만큼만 구매
                        // [0]: 지불금액 [1]: 구매수량
                        System.out.println("stockPriceMap = " + stockPriceMap);
                        System.out.println("curMoney = " + curMoney);
                        System.out.println("curStockPrice = " + curStockPrice);
                        System.out.println("orderStockCount = " + orderStockCount);
                        Long[] buyInfo = calcBuyPayInfo(curMoney, curStockPrice, orderStockCount);
                        Long actualPayMoney = buyInfo[0];
                        Long actualBuyNum = buyInfo[1];

                        // 금액 지불
                        curMoney -= actualPayMoney;

                        if (myCurStockOptional.isPresent()) {
                            // 기존 보유 종목이 있다면 구매 시 평단 재계산, 보유주식 증가 필요
                            MyStock myStock = myCurStockOptional.get();
                            // 평단 재계산
                            double newMyAvgPrice = calculateNewAvgUnitPrice(myStock.getAvgPrice(), myStock.getCount(),
                                    curStockPrice, actualBuyNum);
                            // 보유주식 증가
                            myStock.setAvgPrice(newMyAvgPrice);
                            myStock.setCount(myStock.getCount() + actualBuyNum);

                        } else {
                            // 기존 보유종목이 없다면 보유 주식에 구매한 데이터 save
                            MyStock myStock = MyStock.builder()
                                    .memberId(curMemberId)
                                    .stockId(curStockId)
                                    .avgPrice(Double.valueOf(curStockPrice))
                                    .count(actualBuyNum).build();
                            myStockRepository.save(myStock);
                        }

                        // 체결 엔티티 생성 save
                        Contract contract = Contract.builder()
                                .memberId(curMemberId)
                                .stockId(curStockId)
                                .count(actualBuyNum)
                                .contractPrice(curStockPrice)
                                .contractType(ContractType.BUY)
                                .createdAt(LocalDateTime.now())
                                .category(InvCategory.CONTRACT)
                                .matchOrderId(memberOrder.getMemberId())
                                .build();
                        contractRepository.save(contract);
                    }
                    case SELL -> {
                        if (myCurStockOptional.isEmpty()) {
                            log.error("보유 종목이 없으면 판매 하지 못함");
                            break;
                        }

                        MyStock myStock = myCurStockOptional.get();
                        System.out.println("sell - myStock = " + myStock);
                        Long myStockCount = myStock.getCount();
                        System.out.println("sell - myStockCount = " + myStockCount);
                        Long actualSellQuantity = Math.min(myStockCount, orderStockCount);
                        System.out.println("sell - actualSellQuantity = " + actualSellQuantity);

                        // profit 계산 ((매도가 - 매입 평균 단가) * 매도 수량)
                        Double profit = (curStockPrice - myStock.getAvgPrice()) * actualSellQuantity;
                        System.out.println("sell - profit = " + profit); // *

                        // 보유주식 감소, 만약 모든 보유 주식을 팔았다면 mystock 엔티티 삭제 진행
                        if (myStockCount.equals(actualSellQuantity)) {
                            myStockRepository.deleteById(myStock.getId());
                        } else {
                            myStock.setCount(myStockCount - actualSellQuantity);
                            System.out.println("setter - myStock = " + myStock);
                        }

                        // 예수금 증가
                        curMoney += actualSellQuantity * curStockPrice;

                        // 체결 엔티티 생성 save
                        Contract contract = Contract.builder()
                                .memberId(curMemberId)
                                .stockId(curStockId)
                                .count(actualSellQuantity)
                                .contractPrice(curStockPrice)
                                .contractType(ContractType.SELL)
                                .createdAt(LocalDateTime.now())
                                .category(InvCategory.CONTRACT)
                                .matchOrderId(memberOrder.getMemberId())
                                .profit(profit)
                                .build();
                        contractRepository.save(contract);
                    }
                }
            }

            orderRedisRepository.deleteById(String.valueOf(memberOrder.getMemberId())); // 주문에 사용된 데이터는 레디스에서 삭제

            // 정산 완료된 금액을 deposit history에 넣기
            Deposit resultDeposit = Deposit.builder()
                    .memberId(curMemberId)
                    .createdAt(LocalDateTime.now())
                    .money(curMoney).build();
            depositRepository.save(resultDeposit);
        }
    }

    private List<MemberOrderDto> justOrdersToMemberOrderList(List<OrderDto> justOrders) {
        List<MemberOrderDto> memberOrderDtos = new ArrayList<>();
        for (OrderDto o : justOrders) {
            OrderListDto orderListDto = new OrderListDto(o.getId(), o.getStockId(), o.getCount(), ContractType.valueOf(o.getContractType()));
            System.out.println("orderListDto = " + orderListDto);
            Optional<MemberOrderDto> foundMemberOrderDtoOptional = memberOrderDtos.stream()
                    .filter(dto -> o.getMemberId().equals(dto.getMemberId()))
                    .findFirst();

            if (foundMemberOrderDtoOptional.isPresent()) {
                // 존재한다면 주문 리스트에 add
                System.out.println("foundMemberOrderDtoOptional.get().getOrders() = " + foundMemberOrderDtoOptional.get().getOrders());
                System.out.println("foundMemberOrderDtoOptional.get().getOrders().class = " + foundMemberOrderDtoOptional.get().getOrders().getClass());
                foundMemberOrderDtoOptional.get().getOrders().add(orderListDto);
            } else {
                // 처음 나왔다면 주문 리스트 새로 생성
                List<OrderListDto> orderListDtoLst = new ArrayList<>();
                orderListDtoLst.add(orderListDto);
                memberOrderDtos.add(new MemberOrderDto(o.getMemberId(), orderListDtoLst, o.getCreatedAt()));
            }
            System.out.println("foundMemberOrderDto = " + foundMemberOrderDtoOptional);
            System.out.println("memberOrderDtos = " + memberOrderDtos);
        }
        return memberOrderDtos;
    }

    public List<Contract> loadOrderIntoDB(List<Order> wholeOrderList) {
        List<Contract> savedContractList = new ArrayList<>();
        for (Order order : wholeOrderList) {
            for (OrderListDto orderListDto : order.getOrders()) {
                // DB에 넣을 엔티티 생성
                Contract contract = Contract.builder()
                        .memberId(order.getMemberId())
                        .stockId(orderListDto.getStockId())
                        .count(Long.valueOf(orderListDto.getCount()))
                        .contractType(orderListDto.getOrderType())
                        .createdAt(order.getOrderTime())
                        .category(InvCategory.ORDER)
                        .matchOrderId(-1L)
                        .contractPrice(0L)
                        .profit(0.0)
                        .build();
                Contract savedContract = contractRepository.save(contract);
                savedContractList.add(savedContract);
            }
        }
        return savedContractList;
    }


    // 구매 가격과 수량을 리턴
    private Long[] calcBuyPayInfo(Long curMoney, Long curStockPrice, int orderStockCount) {
        Long maxBuyableQuantity = curMoney / curStockPrice; // 최대 구매 가능 주식 수
        Long actualQuantity = Math.min(maxBuyableQuantity, orderStockCount); // 돈이 부족하면 왼쪽, 충분하면 오른쪽
        Long payMoney = curStockPrice * actualQuantity;

        Long[] result = new Long[2];
        result[0] = payMoney; // *
        result[1] = actualQuantity;
        return result;
    }

    @Scheduled(cron = "0 0/5 * * * *", zone = "Asia/Seoul")  // 0분부터 55분까지 5분 간격으로 실행
    protected void updateStockPriceMap() {
        LocalDate today = LocalDate.now();
        List<DailyStock> dailyStockList = dailyStockRepository.findByStockDate(today);
        for (DailyStock dailyStock : dailyStockList) {
            stockPriceMap.put(dailyStock.getStockId(), Long.valueOf(dailyStock.getClosePrice()));
        }
    }

    private void initStockPriceMap() {
        LocalDate today = LocalDate.now();
        List<DailyStock> dailyStockList = dailyStockRepository.findByStockDate(today);
        for (DailyStock dailyStock : dailyStockList) {
            System.out.println("Long.valueOf(dailyStock.getClosePrice()) = " + Long.valueOf(dailyStock.getClosePrice()));
            stockPriceMap.put(dailyStock.getStockId(), Long.valueOf(dailyStock.getClosePrice()));
        }
    }

    private List<Order> filterOrders(List<Order> rawOrderList) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime oneHourAgo = currentDateTime.minusHours(1);
        LocalDateTime desiredStartTime = LocalDateTime.of(oneHourAgo.getYear(), oneHourAgo.getMonth(), oneHourAgo.getDayOfMonth(), oneHourAgo.getHour(), 0, 0);
        LocalDateTime desiredEndTime = LocalDateTime.of(oneHourAgo.getYear(), oneHourAgo.getMonth(), oneHourAgo.getDayOfMonth(), currentDateTime.getHour(), 0, 0);

        List<Order> filteredOrderList = new ArrayList<>();
        for (Order order : rawOrderList) {
            LocalDateTime orderTime = order.getOrderTime();
            if (true || orderTime.isAfter(desiredStartTime) && orderTime.isBefore(desiredEndTime)) {
                filteredOrderList.add(order);
            }
        }

        return filteredOrderList;
    }


    private double calculateNewAvgUnitPrice(double currentAvgUnitPrice, long numStocksOwned,
                                            double newPurchasePrice, long numNewStocks) {
        // 평균 가격 = 총 구매 가격 / 총 수량
        return ((currentAvgUnitPrice * numStocksOwned) + (newPurchasePrice * numNewStocks)) / (numStocksOwned + numNewStocks);
    }
}
