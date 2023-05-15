package kr.stockey.stockservice.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Entity
@Table(name = "daily_stock")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyStock {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_stock_id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "stock_date", nullable = false)
    private LocalDate stockDate;

    @NotNull
    @Column(name = "open_price", nullable = false)
    private Integer openPrice;

    @NotNull
    @Column(name = "close_price", nullable = false)
    private Integer closePrice;

    @NotNull
    @Column(name = "low_price", nullable = false)
    private Integer lowPrice;

    @NotNull
    @Column(name = "high_price", nullable = false)
    private Integer highPrice;

    @NotNull
    @Column(name = "volume", nullable = false)
    private Integer volume;

    @NotNull
    @Column(name = "change_rate", nullable = false)
    private Float changeRate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "stock_id", nullable = false)
    private Stock stock;

    @Builder
    public DailyStock(Long id, LocalDate stockDate, Integer openPrice, Integer closePrice, Integer lowPrice, Integer highPrice, Integer volume, Float changeRate, Stock stock) {
        this.id = id;
        this.stockDate = stockDate;
        this.openPrice = openPrice;
        this.closePrice = closePrice;
        this.lowPrice = lowPrice;
        this.highPrice = highPrice;
        this.volume = volume;
        this.changeRate = changeRate;
        this.stock = stock;
    }
}