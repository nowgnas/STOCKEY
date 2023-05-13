package kr.stockey.favoriteservice.service;

import kr.stockey.favoriteservice.dto.core.FavoriteDto;
import kr.stockey.favoriteservice.entity.Favorite;
import kr.stockey.favoriteservice.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FavoriteServiceImpl implements FavoriteService {
    private final FavoriteRepository favoriteRepository;

    @Override
    public List<FavoriteDto> findByIndustry(Long memberId) {
        List<Favorite> favoriteIndustry = favoriteRepository.findFavoriteIndustry(memberId);
        return getFavoriteDto(favoriteIndustry);
    }

    @Override
    public List<FavoriteDto> findByStock(Long memberId) {
        List<Favorite> favoriteStock = favoriteRepository.findFavoriteStock(memberId);
        return getFavoriteDto(favoriteStock);
    }

    @Override
    public List<FavoriteDto> findByKeyword(Long memberId) {
        List<Favorite> favoriteKeyword = favoriteRepository.findFavoriteKeyword(memberId);
        return getFavoriteDto(favoriteKeyword);
    }

    @Override
    public boolean existsByMemberAndIndustry(Long industryId, Long memberId) {
        return favoriteRepository.existsByMemberIdAndIndustryId(memberId, industryId);
    }

    @Override
    public boolean existsByMemberAndStock(Long stockId, Long memberId) {
        return favoriteRepository.existsByMemberIdAndStockId(memberId, stockId);
    }

    @Override
    public boolean existsByMemberAndKeyword(Long keywordId, Long memberId) {
        return favoriteRepository.existsByMemberIdAndKeywordId(memberId,keywordId);
    }

    @Override
    @Transactional
    public void deleteFavoriteIndustry(Long industryId, Long memberId) {
        Favorite favorite = favoriteRepository
                .findByMemberIdAndIndustryId(memberId, industryId);
        favoriteRepository.delete(favorite);
    }

    @Override
    @Transactional
    public void deleteFavoriteStock(Long stockId, Long memberId) {
        Favorite favorite = favoriteRepository
                .findByMemberIdAndStockId(memberId, stockId);
        favoriteRepository.delete(favorite);
    }

    @Override
    @Transactional
    public void deleteFavoriteKeyword(Long keywordId, Long memberId) {
        Favorite favorite = favoriteRepository
                .findByMemberIdAndKeywordId(memberId, keywordId);
        favoriteRepository.delete(favorite);
    }

    @Override
    @Transactional
    public void createFavoriteIndustry(Long industryId, Long memberId) {
        Favorite favorite = Favorite.builder()
                .memberId(memberId)
                .industryId(industryId)
                .build();
        favoriteRepository.save(favorite);
    }

    @Override
    @Transactional
    public void createFavoriteStock(Long stockId, Long memberId) {
        Favorite favorite = Favorite.builder()
                .memberId(memberId)
                .stockId(stockId)
                .build();
        favoriteRepository.save(favorite);
    }

    @Override
    @Transactional
    public void createFavoriteKeyword(Long keywordId, Long memberId) {
        Favorite favorite = Favorite.builder()
                .memberId(memberId)
                .keywordId(keywordId)
                .build();
        favoriteRepository.save(favorite);
    }

    // List Favorite => FavoriteDto
    private List<FavoriteDto> getFavoriteDto(List<Favorite> favoriteStock) {
        List<FavoriteDto> returnDto = new ArrayList<>();
        favoriteStock.forEach(v->{
            returnDto.add(new ModelMapper().map(v, FavoriteDto.class));
        });
        return returnDto;
    }



}
