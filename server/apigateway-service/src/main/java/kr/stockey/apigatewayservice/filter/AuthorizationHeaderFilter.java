package kr.stockey.apigatewayservice.filter;

import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {
    private static final String USER_ID_HEADER = "X-UserId";

    Environment env;


    public AuthorizationHeaderFilter(Environment env) {
        super(Config.class);
        this.env = env;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            //Authorization 헤더가 없을 시
            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return onError(exchange, "no authorization header", HttpStatus.UNAUTHORIZED);
            }
            //성공
            String authorizationHeader = request.getHeaders().getFirst("Authorization");
            String jwt = authorizationHeader.replace("Bearer", "");

            if (!isJwtValid(jwt)) {
                return onError(exchange, "JWT is not valid ", HttpStatus.UNAUTHORIZED);
            }
            
            // UserId 가져오기
            String userId = getuserId(jwt);

            // 헤더에 userId 추가
            ServerHttpRequest  newRequest = exchange.getRequest().mutate()
                    .headers(httpHeaders -> httpHeaders.set(USER_ID_HEADER, userId))
                    .build();
            // 새로운 exchange 생성
            ServerWebExchange newExchange = exchange.mutate().request(newRequest).build();
            
            return chain.filter(newExchange);
        });
    }

    /**
     * jwt 토큰 유효 체크
     */
    private boolean isJwtValid(String jwt) {
        boolean returnValue = true;
        String subject = null;
        try {
            String key = env.getProperty("token.secret");
            subject = Jwts.parser().setSigningKey(key)
                    .parseClaimsJws(jwt).getBody()
                    .getSubject();
        } catch (Exception ex) {
            log.error("ex = {}", ex);
            returnValue = false;
        }

        if(subject==null ||subject.isEmpty()){
            returnValue = false;
        }
        return returnValue;
    }

    /**
     * jwt토큰 => userId 리턴
     */
    private String getuserId(String jwt){
        String key = env.getProperty("token.secret");
        String subject = Jwts.parser().setSigningKey(key)
                .parseClaimsJws(jwt).getBody()
                .getSubject();
        return subject;
    }

    // Webflux = > mono(단일값)
    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus status) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        log.error(err);

        return response.setComplete();
    }

    public static class Config {

    }
}

