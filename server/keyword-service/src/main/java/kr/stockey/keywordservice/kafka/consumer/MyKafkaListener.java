package kr.stockey.keywordservice.kafka.consumer;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class MyKafkaListener {


//    @KafkaListener(topics = "stock-order",groupId = "stock-order-consumer", containerFactory = "kafkaListenerContainerFactory1")
//    public void receive1() {
//
//    }
}
