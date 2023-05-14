package kr.stockey.investmentservice.tmp;

import kr.stockey.investmentservice.entity.Stock;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "stock_click_statistics")
public class StockClickStatistic {
    @Id
    @Column(name = "stock_hit_id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "stock_id", nullable = false)
    private Stock stock;

    @NotNull
    @Column(name = "stock_date", nullable = false)
    private LocalDate stockDate;

    @Column(name = "count", columnDefinition = "INT UNSIGNED not null")
    private Long count;

    @Size(max = 20)
    @NotNull
    @Column(name = "category", nullable = false, length = 20)
    private String category;

}