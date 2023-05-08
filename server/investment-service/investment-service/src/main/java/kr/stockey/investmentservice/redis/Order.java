package kr.stockey.investmentservice.redis;

import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.time.LocalDateTime;

@RedisHash(value = "order", timeToLive = 864000) // 개발용 10일, 실제 서비스: 60분 (60분 후에 DB 적재)
@Getter
@ToString
@AllArgsConstructor
public class Order implements Serializable, Comparable<Order> {

    @Id
    private Long memberId;
    private Long stockId;
    private Integer count; // stock quantity
    private ContractType orderType; // BUY or SELL
    private InvCategory invCategory; // ORDER, CONTRACT
    private LocalDateTime orderTime;

    @Override
    public int compareTo(Order other) {
        return this.orderTime.compareTo(other.getOrderTime());
    }
}