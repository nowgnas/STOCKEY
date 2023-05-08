package kr.stockey.investmentservice.service;

import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.kafka.producer.StockOrderProducer;
import kr.stockey.investmentservice.redis.Order;
import kr.stockey.investmentservice.redis.OrderRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InvestmentServiceImpl implements InvestmentService{

    private final StockOrderProducer stockOrderProducer;
    private final OrderRedisRepository orderRedisRepository;


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

    /**
     * 매 02분마다 체결 진행
     */

    @Scheduled(cron = "0 2 * * * *", zone = "Asia/Seoul")
    public void orderExecuteScheduler() {
        // 실행할 메소드 내용 작성
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        if (now.getHour() >= 9 && now.getHour() <= 15 && now.getMinute() == 2) {
            // 오전 9시 ~ 오후 3시 사이, 2분일 때 실행
            // 실행할 코드 작성
            orderExecute();
        }
    }

    public void orderExecute() {
        // 레디스에 쌓인 모든 order 데이터 가져와 list로 만들기
        Iterable<Order> orderIterable = orderRedisRepository.findAll();
        List<Order> orderList = new ArrayList<>();
        for (Order order : orderIterable) {
            orderList.add(order);
        }
        // 시간순 정렬
        Collections.sort(orderList);

    }
}
