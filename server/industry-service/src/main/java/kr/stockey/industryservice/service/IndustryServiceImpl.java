package kr.stockey.industryservice.service;


import com.ssafy.backend.domain.favorites.entity.Favorite;
import com.ssafy.backend.domain.favorites.repository.FavoriteRepository;
import com.ssafy.backend.domain.favorites.service.FavoriteService;
import com.ssafy.backend.domain.industry.api.response.GetIndustryMarketCapResponse;
import com.ssafy.backend.domain.industry.api.response.IndustryCapitalDto;
import com.ssafy.backend.domain.industry.dto.IndustryDto;
import com.ssafy.backend.domain.industry.dto.IndustryEpochSumDto;
import com.ssafy.backend.domain.industry.entity.Industry;
import com.ssafy.backend.domain.industry.mapper.IndustryDtoMapper;
import com.ssafy.backend.domain.industry.mapper.IndustryMapper;
import com.ssafy.backend.domain.industry.repository.IndustryRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.stock.api.response.GetStockTodayResponse;
import com.ssafy.backend.domain.stock.dto.IndustrySumDto;
import com.ssafy.backend.domain.stock.dto.StockBriefDto;
import com.ssafy.backend.domain.stock.dto.StockTodayDto;
import com.ssafy.backend.domain.stock.entity.DailyStock;
import com.ssafy.backend.domain.stock.entity.Stock;
import com.ssafy.backend.domain.stock.mapper.StockDtoMapper;
import com.ssafy.backend.domain.stock.mapper.StockMapper;
import com.ssafy.backend.domain.stock.repository.DailyStockRepository;
import com.ssafy.backend.domain.stock.repository.StockRepository;
import com.ssafy.backend.global.exception.favorite.FavoriteException;
import com.ssafy.backend.global.exception.favorite.FavoriteExceptionType;
import com.ssafy.backend.global.exception.industry.IndustryException;
import com.ssafy.backend.global.exception.industry.IndustryExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class IndustryServiceImpl implements IndustryService {
    private final IndustryRepository industryRepository;
    private final StockRepository stockRepository;
    private final IndustryMapper industryMapper;
    private final IndustryDtoMapper industryDtoMapper;
    private final StockMapper stockMapper;
    private final StockDtoMapper stockDtoMapper;

    private final FavoriteService favoriteService;

    private final FavoriteRepository favoriteRepository;
    private final DailyStockRepository dailyStockRepository;

    //모든 산업 반환
    public List<IndustryDto> getAll() {
        List<Industry> industries = industryRepository.findAll();
        return industryMapper.toDto(industries);
    }

    //단일 산업 상세
    public IndustryDto getOne(Long id) {
        Industry industry = getIndustry(id);
        return industryMapper.toDto(industry);
    }

    // 모든 산업에 대하여 시가총액순으로 반환
    public List<IndustryCapitalDto> getAllMarketCap() {
        List<Industry> industries = industryRepository.findAll();
        List<IndustryCapitalDto> results = new ArrayList<>();
        for (Industry industry : industries) {
            long sum = 0;
            // 해당 산업의 모든 종목들
            List<Stock> stocks = stockRepository.findByIndustry(industry);
            for (Stock stock : stocks) {
                sum += stock.getMarketCap();
            }
            // 시가총액이 존재한다면
            if (sum > 0) {
                results.add(industryDtoMapper.toDto(industry, sum));
            }
        }
        Collections.sort(results, ((o1, o2) -> -o1.getSum().compareTo(o2.getSum())));
        return results;
    }

    //시가총액 상위 5개 종목
    public List<StockBriefDto> getStockList() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Stock> stockList = stockRepository.findTop5Stocks(pageable);
        return stockMapper.toDto(stockList);

    }

    //해당 산업의 시가총액 상위 5개 종목
    public List<StockBriefDto> getStockList(Long id) {
        Pageable pageable = PageRequest.of(0, 5);
        // 단방향 매핑으로 찾기
        Industry industry = getIndustry(id);
        List<Stock> stockList = stockRepository.findTop5Stocks(industry, pageable);
        return stockMapper.toDto(stockList);
    }

    // 관심  산업 리스트 출력
    public List<IndustryDto> getMyIndustries(Member member) {
        List<Favorite> favorites = favoriteService._findByIndustry(member);
        List<Industry> industryList = new ArrayList<>();
        for (Favorite favorite : favorites) {
            industryList.add(favorite.getIndustry());
        }
        return industryMapper.toDto(industryList);
    }

    // 관심 여부 확인
    public boolean checkFavorite(Member member, Long id) {
        Industry industry = getIndustry(id);
        boolean result = favoriteService.existsByMemberAndIndustry(industry, member);
        return result;
    }

    // 관심 산업 등록
    @Transactional
    public void addFavorite(Member member, Long id) {
        Industry industry = getIndustry(id);
        boolean isFavorite = checkFavorite(member, id);
        //이미 관심등록했다면
        if (isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.ALREADY_EXIST);
        }
        Favorite favorite = Favorite.industryBuilder()
                .member(member)
                .industry(industry)
                .build();
        favoriteRepository.save(favorite);

    }

    @Transactional
    public void deleteFavorite(Member member, Long id) {
        Industry industry = getIndustry(id);
        boolean isFavorite = checkFavorite(member, id);
        // 관심 등록하지 않았다면
        if (!isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.NOT_FOUND);
        }
        Favorite favorite = favoriteRepository.findByMemberAndIndustry(member, industry);
        checkUser(member, favorite);
        favoriteRepository.delete(favorite);
    }

    public List<GetIndustryMarketCapResponse> getMarketCapList(Long id) {
        Industry industry = getIndustry(id);
        List<IndustrySumDto> marketList = stockRepository.getMarketList(industry.getId());
        List<IndustryEpochSumDto> result = new ArrayList<>();

        // LocalDate -> epochTime
        for(IndustrySumDto industryDto : marketList){
            LocalDate stockDate = industryDto.getStockDate();
            LocalDateTime localDateTime = stockDate.atStartOfDay();
            Instant instant = localDateTime.toInstant(ZoneOffset.UTC);
            long epochSecond = instant.getEpochSecond();
            IndustryEpochSumDto industryEpochSumDto = IndustryEpochSumDto.builder()
                    .stockDate(industryDto.getStockDate())
                    .marketCap(industryDto.getMarketCap())
                    .epochTime(epochSecond)
                    .build();
            result.add(industryEpochSumDto);
        }
        return industryDtoMapper.toGetMarketCapResponse(result);
    }

    public List<GetStockTodayResponse> getStockListPrice(Long id) {
        Industry industry = getIndustry(id);
        List<Stock> stockList = stockRepository.findByIndustry(industry);

        // 해당 주식의 현재가격 가져오기
        List<DailyStock> dailyStockList = stockList.stream()
                .map(o -> dailyStockRepository.findTodayDailyStock(o.getId()).get())
                .collect(Collectors.toList());
        //결과를 담을 result 리스트
        List<StockTodayDto> result = new ArrayList<>();
        for (DailyStock dailyStock : dailyStockList) {
            Long stock_id = dailyStock.getStock().getId();
            String name = dailyStock.getStock().getName();
            Integer close_price = dailyStock.getClosePrice();
            Float change_rate = dailyStock.getChangeRate() * 100;

            StockTodayDto stockTodayDto = StockTodayDto.builder()
                    .id(stock_id)
                    .name(name)
                    .price(close_price)
                    .rate(change_rate)
                    .build();
            result.add(stockTodayDto);
        }
        return stockDtoMapper.toGetStockTodayResponse(result);
    }

    // 유저가 동일한지 체크
    private static void checkUser(Member member, Favorite favorite) {
        if (favorite.getMember() != member) {
            throw new FavoriteException(FavoriteExceptionType.DIFFERENT_USER);
        }
    }

    // 산업 엔티티 반환
    private Industry getIndustry(Long id) {
        // 존재하지 않을 시 NOT FOUND 예외 발생
        return industryRepository.findById(id).orElseThrow(() -> new IndustryException(IndustryExceptionType.NOT_FOUND));
    }


}
