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
public class Order implements Serializable {

    @Id
    private Long memberId;
    private Long stockId;
    private Integer count; // stock quantity
    private ContractType orderType; // BUY or SELL
    private InvCategory invCategory; // ORDER, CONTRACT
    private LocalDateTime orderTime;

//    public Order(Long memberId, Long stockId, Integer count, ContractType orderType, InvCategory invCategory, LocalDateTime orderTime) {
//        this.id = memberId + "_" + orderTime.toString(); // Key 값을 설정
//        this.memberId = memberId;
//        this.stockId = stockId;
//        this.count = count;
//        this.orderType = orderType;
//        this.invCategory = invCategory;
//        this.orderTime = orderTime;
//    }

//    @PostConstruct
//    public void init() {
//        this.id = memberId + "_" + orderTime.toString(); // 객체 생성 후에 ID를 생성하는 초기화 로직
//    }
}