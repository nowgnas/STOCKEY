package kr.stockey.favoriteservice.service;

import com.ssafy.backend.domain.favorites.entity.Favorite;
import com.ssafy.backend.domain.industry.entity.Industry;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.stock.entity.Stock;

import java.util.List;

public interface FavoriteService {
    List<Favorite> _findByIndustry(Member member);
    List<Favorite>  _findByStock(Member member);

    boolean existsByMemberAndIndustry(Industry industry, Member member);
    boolean existsByMemberAndStock(Stock stock, Member member);



}
