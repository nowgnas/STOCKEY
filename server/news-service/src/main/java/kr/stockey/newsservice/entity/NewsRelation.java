package kr.stockey.newsservice.entity;

import com.ssafy.backend.domain.industry.entity.Industry;
import com.ssafy.backend.domain.keyword.entity.Keyword;
import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.stock.entity.Stock;
import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Entity
@Table(name = "news_relation_v2")
public class NewsRelation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_keyword_id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "news_id", nullable = false)
    private News news;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "industry_id")
    private Industry industry;

    @Size(max = 45)
    @Column(name = "news_type", length = 45)
    private String newsType;

}