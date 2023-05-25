package kr.stockey.favoriteservice.repository;

import kr.stockey.favoriteservice.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite,Long> {

    @Query("select f from Favorite f where f.memberId = :memberId and f.industryId != null")
    List<Favorite> findFavoriteIndustry(Long memberId);
    @Query("select f from Favorite f where f.memberId = :memberId and f.stockId != null")
    List<Favorite> findFavoriteStock(Long memberId);
    @Query("SELECT f FROM Favorite f WHERE f.memberId = :memberId and f.keywordId != null")
    List<Favorite> findFavoriteKeyword(Long memberId);


    boolean existsByMemberIdAndIndustryId(Long memberId, Long industryId);
    boolean existsByMemberIdAndStockId(Long memberId, Long stockId);
    boolean existsByMemberIdAndKeywordId(Long memberId,Long keywordId);
    Favorite findByMemberIdAndIndustryId(Long memberId,Long industryId);
    Favorite findByMemberIdAndStockId(Long memberId,Long stockId);

    Favorite findByMemberIdAndKeywordId(Long memberId,Long keywordId);

    Long countByStockId(Long stockId);

}
