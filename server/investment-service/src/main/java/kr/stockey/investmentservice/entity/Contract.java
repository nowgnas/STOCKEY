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
    @Column(name = "constract_id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @NotNull
    @Column(name = "stock_id", nullable = false)
    private Long stockId;

    @NotNull
    @Column(name = "count", columnDefinition = "INT UNSIGNED not null")
    private Long count;

    @NotNull
    @Column(name = "contract_price", nullable = false)
    private Long contractPrice;

    @Size(max = 10)
    @NotNull
    @Column(name = "contract_type", nullable = false, length = 10)
    private ContractType contractType;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Size(max = 20)
    @NotNull
    @Column(name = "category", nullable = false, length = 20)
    private InvCategory category;

    @Builder
    public Contract(Long memberId, Long stockId, Long count, Long contractPrice,
                    ContractType contractType, LocalDateTime createdAt, InvCategory category) {
        this.memberId = memberId;
        this.stockId = stockId;
        this.count = count;
        this.contractPrice = contractPrice;
        this.contractType = contractType;
        this.createdAt = createdAt;
        this.category = category;
    }
}