package kr.stockey.investmentservice;

import kr.stockey.investmentservice.dto.OrderListDto;
import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.dto.TraderRankDto;
import kr.stockey.investmentservice.entity.Contract;
import kr.stockey.investmentservice.entity.Stock;
import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import kr.stockey.investmentservice.mapper.InvestmentDtoMapper;
import kr.stockey.investmentservice.redis.Order;
import kr.stockey.investmentservice.redis.OrderRedisRepository;
import kr.stockey.investmentservice.service.InvestmentService;

import kr.stockey.investmentservice.service.InvestmentServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
@ExtendWith(MockitoExtension.class)
class InvestmentServiceApplicationTests {

    @Autowired
    InvestmentService investmentService;

    @Autowired
    InvestmentServiceImpl investmentServiceImpl;

    @Autowired
    OrderRedisRepository orderRedisRepository;

    @Autowired
    InvestmentDtoMapper investmentDtoMapper;

    @Test
    void 주문적재_테스트() throws Exception {
//        OrderProducerDto orderProducerDto
//                = new OrderProducerDto(100L, 1L, 10,
//                ContractType.BUY, InvCategory.ORDER, LocalDateTime.now());
//
//        orderRedisRepository.deleteById(String.valueOf(orderProducerDto.getMemberId()));
//
//        investmentService.takeStockOrder(orderProducerDto);
//        Thread.sleep(1000); // 1초 대기
//
//        Order order = orderRedisRepository.findById(String.valueOf(orderProducerDto.getMemberId())).get();
//        System.out.println("order = " + order);
//
//        assertThat(order.getMemberId()).isEqualTo(orderProducerDto.getMemberId());
//
////        assertThrows(Exception.class, () -> {
////            // 동일한 주문이 들어오면 에러발생
////            investmentService.takeStockOrder(orderProducerDto);
////
////        });
//
//        orderRedisRepository.deleteById(String.valueOf(orderProducerDto.getMemberId()));
    }

    @Test
    void 주문체결_테스트() throws Exception {
        // 레디스에 데이터 적재
        // 1. 첫 모의투자 상황 (잔액 history x, 보유주식 x)
        Long memberId = -99L;
        List<OrderListDto> orderListDtoList = getOrderList();
        OrderProducerDto orderProducerDto = new OrderProducerDto(memberId, orderListDtoList, LocalDateTime.now());
        Order redisOrderDto = investmentDtoMapper.toRedisOrderDto(orderProducerDto);
        Order savedOrder = orderRedisRepository.save(redisOrderDto);
        System.out.println("savedOrder = " + savedOrder);

        investmentServiceImpl.orderExecute();

        // 적재했던 데이터 삭제
        orderRedisRepository.deleteById(String.valueOf(savedOrder.getMemberId()));
    }

    private List<OrderListDto> getOrderList() {
        List<OrderListDto> orderListDtoList = new ArrayList<>();

        OrderListDto orderListDto1 = new OrderListDto();
        orderListDto1.setStockId(1L);
        orderListDto1.setCount(10);
        orderListDto1.setOrderType(ContractType.BUY);
        orderListDtoList.add(orderListDto1);

        OrderListDto orderListDto2 = new OrderListDto();
        orderListDto2.setStockId(2L);
        orderListDto2.setCount(5);
        orderListDto2.setOrderType(ContractType.SELL);
        orderListDtoList.add(orderListDto2);

        OrderListDto orderListDto3 = new OrderListDto();
        orderListDto3.setStockId(3L);
        orderListDto3.setCount(8);
        orderListDto3.setOrderType(ContractType.BUY);
        orderListDtoList.add(orderListDto3);

        OrderListDto orderListDto4 = new OrderListDto();
        orderListDto4.setStockId(4L);
        orderListDto4.setCount(3);
        orderListDto4.setOrderType(ContractType.SELL);
        orderListDtoList.add(orderListDto4);

        OrderListDto orderListDto5 = new OrderListDto();
        orderListDto5.setStockId(5L);
        orderListDto5.setCount(15);
        orderListDto5.setOrderType(ContractType.BUY);
        orderListDtoList.add(orderListDto5);

        return orderListDtoList;
    }

    @Test
    public void testFilterOrders() {
        // create some test Order objects
        Order order1 = new Order(1L, null, LocalDateTime.parse("2022-05-11T09:00:01"));
        Order order2 = new Order(2L, null, LocalDateTime.parse("2022-05-11T09:30:00"));
        Order order3 = new Order(3L, null, LocalDateTime.parse("2022-05-11T10:00:00"));
        Order order4 = new Order(4L, null, LocalDateTime.parse("2022-05-11T10:05:00"));

        // create a list of the test Order objects
        List<Order> orderList = new ArrayList<>();
        orderList.add(order1);
        orderList.add(order2);
        orderList.add(order3);
        orderList.add(order4);

        // call the filterOrders() method with the test Order list
        List<Order> filteredOrderList = filterOrders(orderList, LocalDateTime.parse("2022-05-11T10:02:00"));

        // check that the filtered list contains only orders within the desired time range
        assertEquals(2, filteredOrderList.size());
        Assertions.assertTrue(filteredOrderList.contains(order1));
        Assertions.assertTrue(filteredOrderList.contains(order2));
    }

    private List<Order> filterOrders(List<Order> rawOrderList, LocalDateTime currentDateTime) {
        LocalDateTime oneHourAgo = currentDateTime.minusHours(1);
        LocalDateTime desiredStartTime = LocalDateTime.of(oneHourAgo.getYear(), oneHourAgo.getMonth(), oneHourAgo.getDayOfMonth(), oneHourAgo.getHour(), 0, 0);
        LocalDateTime desiredEndTime = LocalDateTime.of(oneHourAgo.getYear(), oneHourAgo.getMonth(), oneHourAgo.getDayOfMonth(), currentDateTime.getHour(), 0, 0);

        List<Order> filteredOrderList = new ArrayList<>();
        for (Order order : rawOrderList) {
            LocalDateTime orderTime = order.getOrderTime();
            if (orderTime.isAfter(desiredStartTime) && orderTime.isBefore(desiredEndTime)) {
                filteredOrderList.add(order);
            }
        }

        return filteredOrderList;
    }

    @Test
    void testStocksToMap() {
        Stock stock1 = new Stock(1L, "Stock A");
        Stock stock2 = new Stock(2L, "Stock B");
        Stock stock3 = new Stock(3L, "Stock C");

        List<Stock> stocks = Arrays.asList(stock1, stock2, stock3);

        Map<Long, String> stockIdToNameMap = stocks.stream()
                .collect(Collectors.toMap(Stock::getId, Stock::getName));

        // Perform assertions
        assertEquals(3, stockIdToNameMap.size());
        assertEquals("Stock A", stockIdToNameMap.get(1L));
        assertEquals("Stock B", stockIdToNameMap.get(2L));
        assertEquals("Stock C", stockIdToNameMap.get(3L));
    }

    static class Stock {
        private Long id;
        private String name;

        public Stock(Long id, String name) {
            this.id = id;
            this.name = name;
        }

        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }
    }


    @Test
    public void testOrderHistoryDtoListModification() {
        // Create a sample orderHistoryDtoList
        List<OrderHistoryDto> orderHistoryDtoList = new ArrayList<>();
        orderHistoryDtoList.add(new OrderHistoryDto(1L, "Order 1", null));
        orderHistoryDtoList.add(new OrderHistoryDto(2L, "Order 2", null));
        orderHistoryDtoList.add(new OrderHistoryDto(3L, "Order 3", null));

        // Create a sample stockIdToNameMap
        Map<Long, String> stockIdToNameMap = new HashMap<>();
        stockIdToNameMap.put(1L, "Stock 1");
        stockIdToNameMap.put(2L, "Stock 2");
        stockIdToNameMap.put(3L, "Stock 3");

        // Update the stockName field in the OrderHistoryDto objects
        for (OrderHistoryDto orderHistoryDto : orderHistoryDtoList) {
            String stockName = stockIdToNameMap.get(orderHistoryDto.getStockId());
            orderHistoryDto.setStockName(stockName);
        }

        // Assert the modified stockName field in the OrderHistoryDto objects
        assertEquals("Stock 1", orderHistoryDtoList.get(0).getStockName());
        assertEquals("Stock 2", orderHistoryDtoList.get(1).getStockName());
        assertEquals("Stock 3", orderHistoryDtoList.get(2).getStockName());
    }

    // Sample class for OrderHistoryDto
    private static class OrderHistoryDto {
        private Long stockId;
        private String orderName;
        private String stockName;

        public OrderHistoryDto(Long stockId, String orderName, String stockName) {
            this.stockId = stockId;
            this.orderName = orderName;
            this.stockName = stockName;
        }

        public Long getStockId() {
            return stockId;
        }

        public String getOrderName() {
            return orderName;
        }

        public String getStockName() {
            return stockName;
        }

        public void setStockName(String stockName) {
            this.stockName = stockName;
        }
    }

    @Test
    public void testCalculateSumOfValuations() {
        // Create a sample list of MyStock objects
        List<MyStock> myStocks = new ArrayList<>();
        myStocks.add(new MyStock(1L, 10));
        myStocks.add(new MyStock(2L, 5));
        myStocks.add(new MyStock(3L, 8));

        // Calculate the sum of valuations using lambda expression
        double sum = myStocks.stream()
                .mapToDouble(this::calcMyStockValuation)
                .sum();

        // Assert the expected sum of valuations
        assertEquals(230.0, sum);
    }

    private double calcMyStockValuation(MyStock myStock) {
        double stockPrice = 10.0; // Replace with your desired stock price
        double valuation = stockPrice * myStock.getCount();
        return valuation;
    }

    private static class MyStock {
        private Long stockId;
        private int count;

        public MyStock(Long stockId, int count) {
            this.stockId = stockId;
            this.count = count;
        }

        public Long getStockId() {
            return stockId;
        }

        public int getCount() {
            return count;
        }
    }

    @Test
    public void getTraderRankTest() {
        investmentService.getTraderRank(10L);
    }

    @Test
    public void testAssignRanks() {
        TraderRankDto trader1 = new TraderRankDto("Trader1", 400L, null);
        TraderRankDto trader2 = new TraderRankDto("Trader2", 200L, null);
        TraderRankDto trader3 = new TraderRankDto("Trader3", 200L, null);
        TraderRankDto trader4 = new TraderRankDto("Trader4", 300L, null);
        TraderRankDto trader5 = new TraderRankDto("Trader5", 200L, null);
        TraderRankDto trader6 = new TraderRankDto("Trader6", 100L, null);

        List<TraderRankDto> traders = Arrays.asList(trader1, trader2, trader3, trader4, trader5, trader6);

        assignRanks(traders);

        assertEquals(1L, trader1.getRanking());
        assertEquals(2L, trader4.getRanking());
        assertEquals(3L, trader2.getRanking());
        assertEquals(3L, trader3.getRanking());
        assertEquals(3L, trader5.getRanking());
        assertEquals(6L, trader6.getRanking());
    }

    public void assignRanks(List<TraderRankDto> traders) {
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

    @Test
    public void testGetFirstNElements() {
        List<String> inputList = Arrays.asList("Element 1", "Element 2", "Element 3", "Element 4", "Element 5");

        int N = 3;
        List<String> result = getFirstNElements(inputList, N);

        List<String> expected = Arrays.asList("Element 1", "Element 2", "Element 3");
        Assertions.assertEquals(expected, result);
    }

    public <T> List<T> getFirstNElements(List<T> inputList, int N) {
        return inputList.stream()
                .limit(N)
                .toList();
    }
}
