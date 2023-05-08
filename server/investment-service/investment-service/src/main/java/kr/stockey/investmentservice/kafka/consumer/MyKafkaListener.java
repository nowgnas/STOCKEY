package kr.stockey.investmentservice.kafka.consumer;

import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.redis.Order;
import kr.stockey.investmentservice.redis.OrderRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class MyKafkaListener {

//    private final OrderRedisRepository orderRedisRepository;
//
//
//    public void saveOrderToRedis(Order order) {
//        orderRedisRepository.save(order);
//    }

    @KafkaListener(topics = "stock-orders",groupId = "group-id-1", containerFactory = "kafkaListenerContainerFactory1")
    public void receive1(OrderProducerDto order) {
        // do something with the message
        System.out.println("order1 = " + order);
        // 들어온 주문을 레디스에 저장

    }

//    @KafkaListener(topics = "order-test-topic", groupId = "group-id-1")
//    public void receive2(OrderProducerDto order) {
//        // do something with the message
//        System.out.println("order2 = " + order);
//    }
}
