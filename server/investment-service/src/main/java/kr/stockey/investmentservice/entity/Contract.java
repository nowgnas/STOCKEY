package kr.stockey.investmentservice.entity;

import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "contract")
@ToString
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @NotNull
    @Column(name = "stock_id", nullable = false)
    private Long stockId;

    @NotNull
    @Column(name = "count", nullable = false)
    private Long count;

    @Column(name = "contract_price", nullable = true)
    private Long contractPrice;

//    @Size(max = 10)
    @NotNull
    @Enumerated(EnumType.STRING) // Specify the mapping strategy
    @Column(name = "contract_type", nullable = false, length = 10)
    private ContractType contractType;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

//    @Size(max = 20)
    @NotNull
    @Enumerated(EnumType.STRING) // Specify the mapping strategy
    @Column(name = "category", nullable = false, length = 20)
    private InvCategory category;
    @Setter
    @Column(name = "match_order_id", nullable = true)
    private Long matchOrderId;

    @Column(name = "profit", nullable = true, length = 20)
    private Double profit;

    @Builder
    public Contract(Long id, Long memberId, Long stockId, Long count, Long contractPrice, ContractType contractType,
                    LocalDateTime createdAt, InvCategory category, Long matchOrderId, Double profit) {
        this.memberId = memberId;
        this.stockId = stockId;
        this.count = count;
        this.contractPrice = contractPrice;
        this.contractType = contractType;
        this.createdAt = createdAt;
        this.category = category;
        this.matchOrderId = matchOrderId;
        this.profit = profit;
    }
}