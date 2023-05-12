package kr.stockey.favoriteservice.entity;

import com.ssafy.backend.domain.industry.entity.Industry;
import com.ssafy.backend.domain.keyword.entity.Keyword;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.stock.entity.Stock;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "favorite")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY,optional = true)
    @JoinColumn(name = "stock_id",nullable = true)
    private Stock stock;


    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "industry_id", nullable = true)
    private Industry industry;


    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "keyword_id", nullable = true)
    private Keyword keyword;


    @Builder(builderClassName = "industryBuilder", builderMethodName = "industryBuilder")
    public Favorite(Member member,Industry industry){
        this.member = member;
        this.industry = industry;
    }

    @Builder(builderClassName = "stockBuilder", builderMethodName = "stockBuilder")
    public Favorite(Member member,Stock stock){
        this.member = member;
        this.stock = stock;
    }

    @Builder(builderClassName = "keywordBuilder", builderMethodName = "keywordBuilder")
    public Favorite(Member member,Keyword keyword){
        this.member = member;
        this.keyword = keyword;
    }

}