package kr.stockey.investmentservice.kafka.consumer;

import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.mapper.InvestmentDtoMapper;
import kr.stockey.investmentservice.redis.Order;
import kr.stockey.investmentservice.redis.OrderRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class MyKafkaListener {

    private final OrderRedisRepository orderRedisRepository;
    private final InvestmentDtoMapper investmentDtoMapper;


    public void saveOrderToRedis(Order order) {
        orderRedisRepository.save(order);
    }

    @KafkaListener(topics = "stock-orders",groupId = "group-id-1", containerFactory = "kafkaListenerContainerFactory1")
    public void receive1(OrderProducerDto order) throws Exception {
        // 들어온 주문을 레디스에 저장
        Order orderRedis = investmentDtoMapper.toRedisOrderDto(order);
        System.out.println("orderRedis = " + orderRedis);
        // 만약에 레디스에 멤버 id의 키가 있으면, 중복 주문이므로 에러 진행시켜
        if (orderRedisRepository.findById(order.getMemberId().toString()).isEmpty()){
            saveOrderToRedis(orderRedis);
        }else {
            throw new Exception("중복 주문 허가 안함");
        }
    }

//    @KafkaListener(topics = "order-test-topic", groupId = "group-id-1")
//    public void receive2(OrderProducerDto order) {
//        // do something with the message
//        System.out.println("order2 = " + order);
//    }
}
