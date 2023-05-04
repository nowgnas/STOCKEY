package kr.stockey.investmentservice.service;

import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.kafka.producer.StockOrderProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InvestmentServiceImpl implements InvestmentService{

    private final StockOrderProducer stockOrderProducer;

    @Override
    public void takeStockOrder(OrderProducerDto orderProducerDto) {
        stockOrderProducer.send(orderProducerDto);
    }
}
