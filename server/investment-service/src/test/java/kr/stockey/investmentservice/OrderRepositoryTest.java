package kr.stockey.investmentservice;

import kr.stockey.investmentservice.redis.Order;
import kr.stockey.investmentservice.redis.OrderRedisRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(properties = {
        "spring.redis.host=localhost",
        "spring.redis.port=6379"
})
public class OrderRepositoryTest {
    @Autowired
    private OrderRedisRepository orderRepository;

    @Test
    public void testGetAllOrders() {
        // Save some test orders to Redis
        Order order1 = new Order(1L, null, LocalDateTime.now());
        Order order2 = new Order(2L, null, LocalDateTime.now());
        orderRepository.save(order1);
        orderRepository.save(order2);

        // Retrieve all orders from Redis
        List<Order> allOrders = (List<Order>) orderRepository.findAll();
        System.out.println("allOrders = " + allOrders);

        // Assertions
        Assertions.assertEquals(2, allOrders.size());
        assertThat(allOrders.get(0).getMemberId()).isEqualTo(order1.getMemberId());
        assertThat(allOrders.get(1).getMemberId()).isEqualTo(order2.getMemberId());

        orderRepository.delete(order1);
        orderRepository.delete(order2);
    }
}
