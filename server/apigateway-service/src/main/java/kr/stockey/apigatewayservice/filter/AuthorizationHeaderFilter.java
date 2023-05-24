package kr.stockey.apigatewayservice.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpCookie;
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


    @Autowired
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
            String jwt = authorizationHeader.replace("Bearer ", "");

            if (!isJwtValid(jwt)) {
                return onError(exchange, "JWT is not valid ", HttpStatus.UNAUTHORIZED);
            }

            // UserId 가져오기
            String userId = getuserId(jwt);
            log.info(userId);

            // 헤더에 userId 추가
            ServerHttpRequest  newRequest = exchange.getRequest().mutate()
                    .headers(httpHeaders -> {
                        httpHeaders.set(USER_ID_HEADER, userId);
                        if (request.getCookies().containsKey("refreshToken")) {
                            HttpCookie refreshToken = request.getCookies().get("refreshToken").get(0);
                            httpHeaders.set("refreshToken", refreshToken.getValue());
                        }
                    })
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
            String key = env.getProperty("jwt.secretKey");
            subject = JWT.require(Algorithm.HMAC256(key))
                    .withSubject("AccessToken")
                    .build()
                    .verify(jwt)
                    .getToken();

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
    private String getuserId(String jwt) {
        DecodedJWT payload = JWT.decode(jwt);
        return payload.getAudience().get(0);

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


