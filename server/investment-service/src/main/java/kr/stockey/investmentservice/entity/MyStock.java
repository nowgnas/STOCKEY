package kr.stockey.investmentservice.entity;

import kr.stockey.investmentservice.tmp.Member;
import kr.stockey.investmentservice.tmp.Stock;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "my_stock")
public class MyStock {
    @Id
    @Column(name = "my_stock_id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @NotNull
    @Column(name = "stock_id", nullable = false)
    private Long stockId;

    @NotNull
    @Setter
    @Column(name = "avg_price", nullable = false)
    private Double avgPrice;

    @Column(name = "count", columnDefinition = "INT UNSIGNED not null")
    @Setter
    private Long count;

    @Builder
    public MyStock(Long memberId, Long stockId, Double avgPrice, Long count) {
        this.memberId = memberId;
        this.stockId = stockId;
        this.avgPrice = avgPrice;
        this.count = count;
    }
}