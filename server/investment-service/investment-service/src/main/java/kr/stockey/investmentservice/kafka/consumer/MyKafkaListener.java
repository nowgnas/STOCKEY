package kr.stockey.investmentservice.kafka.consumer;

import kr.stockey.investmentservice.dto.OrderProducerDto;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;


@Component
public class MyKafkaListener {
    @KafkaListener(topics = "stock-orders",groupId = "your-group-id4")
    public void receive1(OrderProducerDto order) {
        // do something with the message
        System.out.println("order1 = " + order);
    }

    @KafkaListener(topics = "order-test-topic", groupId = "your-group-id4")
    public void receive2(OrderProducerDto order) {
        // do something with the message
        System.out.println("order2 = " + order);
    }
}
