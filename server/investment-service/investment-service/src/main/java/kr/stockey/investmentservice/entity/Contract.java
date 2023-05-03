package kr.stockey.investmentservice.entity;

import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "contract")
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

    @Column(name = "count", columnDefinition = "INT UNSIGNED not null")
    private Long count;

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

}