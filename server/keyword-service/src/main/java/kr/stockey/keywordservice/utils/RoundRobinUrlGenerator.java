package kr.stockey.keywordservice.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class RoundRobinUrlGenerator {
    private final List<String> servers;
    private final AtomicInteger index;

    public RoundRobinUrlGenerator(List<String> servers) {
        this.servers = servers;
        this.index = new AtomicInteger(0);
    }

    public String getNextUrl() {
        int current = index.getAndUpdate(i -> (i + 1) % servers.size());
        return servers.get(current);
    }
}
