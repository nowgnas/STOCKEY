package kr.stockey.investmentservice;

import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import kr.stockey.investmentservice.kafka.KafkaListenerExceptionHandler;
import kr.stockey.investmentservice.kafka.consumer.MyKafkaListener;
import kr.stockey.investmentservice.redis.Order;
import kr.stockey.investmentservice.redis.OrderRedisRepository;
import kr.stockey.investmentservice.service.InvestmentService;

import kr.stockey.investmentservice.service.InvestmentServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.annotation.KafkaListener;

import java.time.LocalDateTime;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class InvestmentServiceApplicationTests {

    @Autowired
    InvestmentService investmentService;

    @Autowired
    InvestmentServiceImpl investmentServiceImpl;

    @Autowired
    OrderRedisRepository orderRedisRepository;

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
    void 주문체결_테스트() {
        investmentServiceImpl.orderExecute();
    }
}
