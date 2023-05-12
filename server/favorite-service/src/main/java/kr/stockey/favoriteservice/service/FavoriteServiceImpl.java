package kr.stockey.favoriteservice.service;

import com.ssafy.backend.domain.favorites.entity.Favorite;
import com.ssafy.backend.domain.favorites.repository.FavoriteRepository;
import com.ssafy.backend.domain.industry.entity.Industry;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.stock.entity.Stock;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {
    private final FavoriteRepository favoriteRepository;

    // 내 관심 산업
    public List<Favorite> _findByIndustry(Member member) {
        return favoriteRepository.findByIndustry(member);
    }

    // 특정산업 관심여부
    public boolean existsByMemberAndIndustry(Industry industry, Member member) {
        return favoriteRepository.existsByMemberAndIndustry(member, industry);
    }

    @Override
    public List<Favorite> _findByStock(Member member) {
        return favoriteRepository.findByStock(member);
    }

    @Override
    public boolean existsByMemberAndStock(Stock stock, Member member) {
        return favoriteRepository.existsByMemberAndStock(member,stock);
    }
}
