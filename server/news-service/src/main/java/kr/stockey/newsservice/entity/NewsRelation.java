package kr.stockey.newsservice.entity;

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


    @Column(name = "keyword_id")
    private Long keywordId;

    @Column(name = "stock_id")
    private Long stockId;

    @Column(name = "industry_id")
    private Long industryId;

    @Size(max = 45)
    @Column(name = "news_type", length = 45)
    private String newsType;

}