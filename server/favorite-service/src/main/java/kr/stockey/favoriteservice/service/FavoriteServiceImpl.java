package kr.stockey.favoriteservice.service;

import kr.stockey.favoriteservice.dto.core.FavoriteDto;
import kr.stockey.favoriteservice.entity.Favorite;
import kr.stockey.favoriteservice.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
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


    // List Favorite => FavoriteDto
    private List<FavoriteDto> getFavoriteDto(List<Favorite> favoriteStock) {
        List<FavoriteDto> returnDto = new ArrayList<>();
        favoriteStock.forEach(v->{
            returnDto.add(new ModelMapper().map(v, FavoriteDto.class));
        });
        return returnDto;
    }



}
