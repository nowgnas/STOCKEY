package kr.stockey.apigatewayservice.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class MicroServiceFilter extends AbstractGatewayFilterFactory<MicroServiceFilter.Config> {
    public MicroServiceFilter(){
        super(Config.class);
    }
    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            log.error("[MicroServiceFilter] 클라이언트에서 직접 호출 X");
            return onError(exchange, "Bad Client Request ", HttpStatus.BAD_REQUEST);
        });
    }

    // Webflux = > mono(단일값)
    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus status) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(status);
        log.error(err);
        return response.setComplete();
    }


    public static class Config {

    }

}
