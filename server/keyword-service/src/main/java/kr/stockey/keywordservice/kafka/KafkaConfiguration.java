package kr.stockey.keywordservice.kafka;

import kr.stockey.keywordservice.dto.KeyphraseRequestDto;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaConfiguration {

    @Value("${kafka_cluster.broker1}")
    private String broker1;
    @Value("${kafka_cluster.broker2}")
    private String broker2;

    public String getKafkaBootstrapServersAsString() {
        return broker1 + ", " + broker2;
    }

    public <T> ConsumerFactory<String, T> consumerFactory(String groupId, String autoOffsetReset, Class<T> targetType) {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, getKafkaBootstrapServersAsString());
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, autoOffsetReset);

        // Create a custom JsonDeserializer for the valueType
        JsonDeserializer<T> jsonDeserializer = new JsonDeserializer<>(targetType);

        jsonDeserializer.addTrustedPackages("kr.stockey.keywordservice.*", "java.util", "java.lang");

        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);

        // Wrap the custom JsonDeserializer with ErrorHandlingDeserializer
        ErrorHandlingDeserializer<T> errorHandlingDeserializer = new ErrorHandlingDeserializer<>(jsonDeserializer);

        // Create a custom DefaultKafkaConsumerFactory with the custom ErrorHandlingDeserializer
        return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), errorHandlingDeserializer);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, KeyphraseRequestDto> kafkaListenerContainerFactory1() {
        ConcurrentKafkaListenerContainerFactory<String, KeyphraseRequestDto> factory = new ConcurrentKafkaListenerContainerFactory<>();
        /*
        "earliest": the consumer will start consuming messages from the beginning of the topic partition
        "latest": the consumer will only consume messages that are produced after the consumer has subscribed to the topic partition
        "none": if no committed offset is available, the consumer will throw an exception.
         */
        factory.setConsumerFactory(consumerFactory("keyphrase-consumer", "latest", KeyphraseRequestDto.class));
        factory.setConcurrency(4); // Set the desired level of concurrency
        return factory;
    }
}
