package kr.stockey.investmentservice.tmp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "keywords_statistic")
public class KeywordsStatistic {
    @Id
    @Column(name = "keywords_statistic_id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "keywords_id", nullable = false)
    private Keyword keywords;

    @NotNull
    @Column(name = "statistic_date", nullable = false)
    private LocalDate statisticDate;

    @NotNull
    @Column(name = "count", nullable = false)
    private Long count;

    @Size(max = 20)
    @Column(name = "category", length = 20)
    private String category;

}