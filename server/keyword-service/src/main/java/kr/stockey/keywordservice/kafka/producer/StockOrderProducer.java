package kr.stockey.keywordservice.kafka.producer;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StockOrderProducer {
    private static final String TOPIC = "stock-order";

//    private final KafkaTemplate<String, OrderProducerDto> kafkaTemplate;

//    public void send(OrderProducerDto orderProducerDto) {
//        kafkaTemplate.send(TOPIC, orderProducerDto);
//    }
}
