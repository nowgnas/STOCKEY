package kr.stockey.investmentservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InvestmentServiceImpl implements InvestmentService{

//    @Value(value = "${message.topic.name}")
//    private String topicName;
//
//    private final KafkaTemplate<String, String> kafkaTemplate;
//
//    public void sendMessage(String message) {
//        System.out.println(String.format("Produce message : %s", message));
//        this.kafkaTemplate.send(topicName, message);
//    }
}
