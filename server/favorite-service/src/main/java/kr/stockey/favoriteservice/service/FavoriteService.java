package kr.stockey.favoriteservice.service;


import kr.stockey.favoriteservice.api.request.GetLikeStockRankRequest;
import kr.stockey.favoriteservice.dto.core.FavoriteDto;

import java.util.List;

public interface FavoriteService {
    List<FavoriteDto> findByIndustry(Long memberId);
    List<FavoriteDto> findByStock(Long memberId);
    List<FavoriteDto> findByKeyword(Long memberId);

    boolean existsByMemberAndIndustry(Long industryId,Long memberId);
    boolean existsByMemberAndStock(Long stockId,Long memberId);
    boolean existsByMemberAndKeyword(Long keywordId,Long memberId);

    void createFavoriteIndustry(Long industryId,Long memberId);
    void createFavoriteStock(Long stockId,Long memberId);
    void createFavoriteKeyword(Long keywordId,Long memberId);


    void deleteFavoriteIndustry(Long industryId,Long memberId);
    void deleteFavoriteStock(Long stockId,Long memberId);
    void deleteFavoriteKeyword(Long keywordId,Long memberId);

    Integer getLikeStockRank(GetLikeStockRankRequest request);



}
