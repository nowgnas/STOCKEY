package kr.stockey.keywordservice.config;

import kr.stockey.keywordservice.utils.RoundRobinUrlGenerator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Configuration
public class MqConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public RoundRobinUrlGenerator roundRobinUrlGenerator(@Value("${django_urls.server1}") String server1,
                                                         @Value("${django_urls.server2}") String server2) {
        List<String> servers = Arrays.asList(server1, server2);
        return new RoundRobinUrlGenerator(servers);
    }
}
