package kr.stockey.investmentservice.kafka.producer;

import kr.stockey.investmentservice.dto.OrderProducerDto;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StockOrderProducer {
    private static final String TOPIC = "stock-orders";

    private final KafkaTemplate<String, OrderProducerDto> kafkaTemplate;

    public void send(OrderProducerDto orderProducerDto) {
        kafkaTemplate.send(TOPIC, orderProducerDto);
    }
}
