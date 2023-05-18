package kr.stockey.investmentservice;
import kr.stockey.investmentservice.dto.OrderListDto;
import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.entity.Contract;
import kr.stockey.investmentservice.entity.DailyStock;
import kr.stockey.investmentservice.entity.Deposit;
import kr.stockey.investmentservice.entity.MyStock;
import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import kr.stockey.investmentservice.kafka.producer.StockOrderProducer;
import kr.stockey.investmentservice.mapper.InvestmentDtoMapper;
import kr.stockey.investmentservice.redis.Order;
import kr.stockey.investmentservice.redis.OrderRedisRepository;
import kr.stockey.investmentservice.repository.ContractRepository;
import kr.stockey.investmentservice.repository.DailyStockRepository;
import kr.stockey.investmentservice.repository.DepositRepository;
import kr.stockey.investmentservice.repository.MyStockRepository;
import kr.stockey.investmentservice.service.InvestmentService;
import kr.stockey.investmentservice.service.InvestmentServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@Transactional
public class OrderExecuteTest {
    @Autowired
    InvestmentService investmentService;

    @Autowired
    InvestmentServiceImpl investmentServiceImpl;

    @Autowired
    OrderRedisRepository orderRedisRepository;

    @Autowired
    ContractRepository contractRepository;

    @Autowired
    StockOrderProducer stockOrderProducer;

    @Autowired
    InvestmentDtoMapper investmentDtoMapper;

    @Autowired
    DailyStockRepository dailyStockRepository;

    @Autowired
    DepositRepository depositRepository;

    @Autowired
    MyStockRepository myStockRepository;

    private List<OrderListDto> orderList1;
    private List<OrderListDto> orderList2;
    private DailyStock stock1;
    private DailyStock stock2;
    private DailyStock stock3;
    private DailyStock stock4;


    @Test
    @Transactional
    void 주문체결_테스트() {
        investmentServiceImpl.executeRun();

        List<Contract> memb1Contracts = contractRepository.findByMemberId(1L);
        System.out.println("memb1Contracts = " + memb1Contracts);
        List<Contract> memb2Contracts = contractRepository.findByMemberId(2L);
        System.out.println("memb2Contracts = " + memb2Contracts);

        assertThat(memb1Contracts.size()).isEqualTo(5); // 주문3, 체결2
        assertThat(memb2Contracts.size()).isEqualTo(8); // 주문4, 체결4

        List<Order> allOrdersFin = (List<Order>) orderRedisRepository.findAll();
        assertThat(allOrdersFin.size()).isEqualTo(0); // 주문 체결 완료되면 레디스에서 삭제되어야 함

        List<Deposit> all = depositRepository.findAll();
        System.out.println("all = " + all);

        List<MyStock> m1Stocks = myStockRepository.findByMemberId(1L);
        System.out.println("m1Stocks = " + m1Stocks);
        assertThat(m1Stocks.size()).isEqualTo(2);
        for (int i = 0; i < m1Stocks.size(); i++) {
            assertThat(m1Stocks.get(i).getCount()).isEqualTo(memb1Contracts.get(i).getCount());
        }

        // member1에 대해 두번째 주문 및 체결 -> 딱 한주씩만 남기도록 진행
        System.out.println("####### 두번째 주문!! ######");
        set2ndSellOrderMember1();
        investmentServiceImpl.executeRun();

        List<MyStock> m1StocksAllSell = myStockRepository.findByMemberId(1L);
        System.out.println("m1StocksAllSell = " + m1StocksAllSell);
        assertThat(m1StocksAllSell.size()).isEqualTo(2);
        for (MyStock myStock : m1StocksAllSell) {
            assertThat(myStock.getCount()).isEqualTo(1L);
        }
    }

    private void set2ndSellOrderMember1() {
        orderRedisRepository.deleteAll(); // 레디스에 주문 목록 삭제
        // 기존 주문 정보 삭제 -> 이전 주문 말고 새로운 주문만 테스트 해보기 위함
        Iterable<Contract> allOrderAndContract = contractRepository.findAll();
        for (Contract contract : allOrderAndContract) {
            if (contract.getCategory().equals(InvCategory.ORDER)) {
                contractRepository.delete(contract);
            }
        }

        List<OrderListDto> tmpOrderList = new ArrayList<>();
        OrderListDto order1 = OrderListDto.builder()
                .stockId(1L)
                .count(9)
                .orderType(ContractType.SELL)
                .build();
        tmpOrderList.add(order1);

        OrderListDto order2 = OrderListDto.builder()
                .stockId(3L)
                .count(7)
                .orderType(ContractType.SELL) // 처음일때는 sell 불가능
                .build();
        tmpOrderList.add(order2);

        Order memb_order = investmentDtoMapper
                        .toRedisOrderDto(OrderProducerDto.builder()
                        .memberId(1L)
                        .orders(tmpOrderList)
                        .orderTime(LocalDateTime.now()
                        .minusHours(1)).build());

        orderRedisRepository.save(memb_order);
    }



    @BeforeEach
    public void setUp() {
        // 레디스 초기화
        orderRedisRepository.deleteAll();

        // 주문 리스트 초기화
        orderList1 = new ArrayList<>();
        orderList2 = new ArrayList<>();

        OrderListDto order1 = OrderListDto.builder()
                .stockId(1L)
                .count(10)
                .orderType(ContractType.BUY)
                .build();
        orderList1.add(order1);

        OrderListDto order2 = OrderListDto.builder()
                .stockId(3L)
                .count(8)
                .orderType(ContractType.BUY)
                .build();
        orderList1.add(order2);

        OrderListDto order3 = OrderListDto.builder()
                .stockId(2L)
                .count(5)
                .orderType(ContractType.SELL) // 처음일때는 sell 불가능
                .build();
        orderList1.add(order3);

        OrderListDto order4 = OrderListDto.builder()
                .stockId(1L)
                .count(10)
                .orderType(ContractType.BUY)
                .build();
        orderList2.add(order4);

        OrderListDto order5 = OrderListDto.builder()
                .stockId(2L)
                .count(5)
                .orderType(ContractType.BUY)
                .build();
        orderList2.add(order5);

        OrderListDto order6 = OrderListDto.builder()
                .stockId(3L)
                .count(8)
                .orderType(ContractType.BUY)
                .build();
        orderList2.add(order6);

        OrderListDto order7 = OrderListDto.builder()
                .stockId(4L)
                .count(15)
                .orderType(ContractType.BUY)
                .build();
        orderList2.add(order7);

        // 주문 생성 및 진행 - 최초 주문일경우
        Order memb1_order = investmentDtoMapper.toRedisOrderDto(OrderProducerDto.builder().memberId(1L).orders(orderList1).orderTime(LocalDateTime.now().minusHours(1)).build());
        Order memb2_order = investmentDtoMapper.toRedisOrderDto(OrderProducerDto.builder().memberId(2L).orders(orderList2).orderTime(LocalDateTime.now().minusHours(1)).build());
        orderRedisRepository.save(memb1_order);
        orderRedisRepository.save(memb2_order);

        List<Order> allOrders = (List<Order>) orderRedisRepository.findAll();
        assertThat(allOrders.size()).isEqualTo(2);

        int member1_OrderNum = orderList1.size();
        int member2_OrderNum = orderList2.size();

        for (Order od : allOrders) {
            if (od.getMemberId().equals(1L)) {
                assertThat(od.getOrders().size()).isEqualTo(member1_OrderNum);
            } else if(od.getMemberId().equals(2L)) {
                assertThat(od.getOrders().size()).isEqualTo(member2_OrderNum);
            }
        }

        // stock price 값 세팅 -> id: 1, 2, 3, 4
        stock1 = DailyStock.builder()
                .stockId(1L)
                .stockDate(LocalDate.now())
                .openPrice(1000)
                .closePrice(1200)
                .lowPrice(980)
                .highPrice(1300)
                .volume(10000)
                .changeRate(0.2f)
                .build();

        stock2 = DailyStock.builder()
                .stockId(2L)
                .stockDate(LocalDate.now())
                .openPrice(1500)
                .closePrice(1400)
                .lowPrice(1380)
                .highPrice(1550)
                .volume(8000)
                .changeRate(-0.1f)
                .build();

        stock3 = DailyStock.builder()
                .stockId(3L)
                .stockDate(LocalDate.now())
                .openPrice(2000)
                .closePrice(2100)
                .lowPrice(1980)
                .highPrice(2200)
                .volume(12000)
                .changeRate(0.05f)
                .build();

        stock4 = DailyStock.builder()
                .stockId(4L)
                .stockDate(LocalDate.now())
                .openPrice(1800)
                .closePrice(1900)
                .lowPrice(1750)
                .highPrice(2000)
                .volume(15000)
                .changeRate(0.1f)
                .build();

        dailyStockRepository.save(stock1);
        dailyStockRepository.save(stock2);
        dailyStockRepository.save(stock3);
        dailyStockRepository.save(stock4);

        investmentServiceImpl.init();
    }
}
