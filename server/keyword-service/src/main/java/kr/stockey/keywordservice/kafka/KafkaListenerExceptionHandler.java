package kr.stockey.keywordservice.kafka;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class KafkaListenerExceptionHandler {
    @Around("@annotation(org.springframework.kafka.annotation.KafkaListener)")
    public Object handleException(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            return joinPoint.proceed();
        } catch (Exception e) { // 추후 RuntimeException으로 변경
            // 여기에서 원하는 에러 처리를 수행합니다.
            System.err.println("Kafka Listener에서 RuntimeException 발생: " + e.getMessage());
            return null;
        }
    }
}
