package kr.stockey.keywordservice.kafka.producer;

import kr.stockey.keywordservice.dto.KeyphraseRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KeyphraseRequestProducer {
    private static final String TOPIC = "keyphrase-request";

    private final KafkaTemplate<String, KeyphraseRequestDto> kafkaTemplate;

    public void send(KeyphraseRequestDto keyphraseRequestDto) {
        kafkaTemplate.send(TOPIC, keyphraseRequestDto);
    }
}
