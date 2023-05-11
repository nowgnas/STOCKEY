package kr.stockey.investmentservice.entity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "deposit")
@ToString
public class Deposit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deposit_id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @NotNull
    @Column(name = "money", nullable = false)
    private Long money;

    @Builder
    public Deposit(Long memberId, LocalDateTime createdAt, Long money) {
        this.memberId = memberId;
        this.createdAt = createdAt;
        this.money = money;
    }
}