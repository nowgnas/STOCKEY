package kr.stockey.stockservice.entity;

import com.ssafy.backend.domain.stock.entity.Stock;
import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Entity
@Table(name = "stock_click_statistic")
public class StockClickStatistic {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_click_statistic_id", nullable = false)
    private Long id;

    @Column(name = "stock_date")
    private LocalDate stockDate;

    @Column(name = "count", columnDefinition = "INT UNSIGNED")
    private Long count;

    @Size(max = 45)
    @Column(name = "category", length = 45)
    private String category;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "stock_id", nullable = false)
    private Stock stock;

}