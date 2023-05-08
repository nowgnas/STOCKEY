package kr.stockey.investmentservice.service;

import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.kafka.producer.StockOrderProducer;
import kr.stockey.investmentservice.redis.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.CompletableFuture;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InvestmentServiceImpl implements InvestmentService{

    private final StockOrderProducer stockOrderProducer;


    /**
     * 주문을 받아서 카프카 topic에 적재
     * 주문 가능시간: 9시 ~ 15시 && 매 05분 ~ 다음 시간 00분까지
     */
    @Override
    public void takeStockOrder(OrderProducerDto orderProducerDto) throws Exception {
        // 주문 가능 시간일 때만 진행
        if (checkOrderAvailableTime()) {
            stockOrderProducer.send(orderProducerDto);
        }
    }

    private boolean checkOrderAvailableTime() throws Exception {
        LocalDateTime now = LocalDateTime.now(); // 한국 시간 기준으로 현재 시간을 가져옴

        int hour = now.getHour();
        int minute = now.getMinute();

        // 주문 가능시간: 9시 ~ 15시 && 매 05분 ~ 다음 시간 00분까지
        if (!(hour >= 9 && hour < 15) && minute >= 1 && minute <= 4) {
            throw new Exception("주문 가능한 시간이 아닙니다.");
        }
        return true;
    }

    
}
