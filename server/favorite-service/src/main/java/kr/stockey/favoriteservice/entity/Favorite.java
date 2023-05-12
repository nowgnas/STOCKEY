package kr.stockey.favoriteservice.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.Assert;

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
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "stock_id",nullable = true)
    private Long stockId;


    @Column(name = "industry_id", nullable = true)
    private Long industryId;


    @Column(name = "keyword_id", nullable = true)
    private Long keywordId;

    @Builder
    public Favorite(Long memberId,Long industryId,Long stockId,Long keywordId){
        Assert.notNull(memberId, "memberId must not be null");

        this.memberId = memberId;
        this.stockId = stockId;
        this.keywordId = keywordId;
        this.industryId = industryId;
    }

}