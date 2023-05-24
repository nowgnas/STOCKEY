package kr.stockey.keywordservice.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class RoundRobinUrlGenerator {
    private final List<String> brokers;
    private final AtomicInteger index;
    private final RestTemplate restTemplate;

    public RoundRobinUrlGenerator(List<String> brokers, RestTemplate restTemplate) {
        this.brokers = brokers;
        this.restTemplate = restTemplate;
        this.index = new AtomicInteger(0);
    }

    public String getNextUrl() {
        System.out.println("index1 = " + index);
        System.out.println("brokers = " + brokers);
        int current = index.getAndUpdate(i -> (i + 1) % brokers.size());
        System.out.println("index2 = " + index);
        return brokers.get(current);
    }
}
