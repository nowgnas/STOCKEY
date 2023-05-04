package kr.stockey.investmentservice.kafka;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.ListTopicsOptions;
import org.apache.kafka.clients.admin.ListTopicsResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Set;
import java.util.concurrent.ExecutionException;

@Component
public class KafkaTopicListener {

    @Autowired
    private KafkaAdmin kafkaAdmin;

    @PostConstruct
    public void printTopics() {
        try (AdminClient adminClient = AdminClient.create(kafkaAdmin.getConfigurationProperties())) {
            ListTopicsOptions options = new ListTopicsOptions().listInternal(true);
            ListTopicsResult topicsResult = adminClient.listTopics(options);
            Set<String> topicNames = topicsResult.names().get();
            System.out.println("Kafka Topics:");
            topicNames.forEach(System.out::println);
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error while fetching Kafka topics:");
            e.printStackTrace();
        }
    }
}
