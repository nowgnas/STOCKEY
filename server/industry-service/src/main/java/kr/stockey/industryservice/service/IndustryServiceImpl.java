package kr.stockey.industryservice.service;


import kr.stockey.industryservice.api.response.GetIndustryMarketCapResponse;
import kr.stockey.industryservice.api.response.IndustryCapitalDto;
import kr.stockey.industryservice.client.FavoriteClient;
import kr.stockey.industryservice.client.StockClient;
import kr.stockey.industryservice.dto.GetStockTodayResponse;
import kr.stockey.industryservice.dto.IndustryEpochSumDto;
import kr.stockey.industryservice.dto.IndustrySumDto;
import kr.stockey.industryservice.dto.StockBriefDto;
import kr.stockey.industryservice.dto.core.FavoriteDto;
import kr.stockey.industryservice.dto.core.IndustryDto;
import kr.stockey.industryservice.dto.core.MemberDto;
import kr.stockey.industryservice.dto.core.StockDto;
import kr.stockey.industryservice.entity.Industry;
import kr.stockey.industryservice.exception.favorite.FavoriteException;
import kr.stockey.industryservice.exception.favorite.FavoriteExceptionType;
import kr.stockey.industryservice.exception.industry.IndustryException;
import kr.stockey.industryservice.exception.industry.IndustryExceptionType;
import kr.stockey.industryservice.mapper.IndustryDtoMapper;
import kr.stockey.industryservice.mapper.IndustryMapper;
import kr.stockey.industryservice.repository.IndustryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class IndustryServiceImpl implements IndustryService {
    private final IndustryRepository industryRepository;
    private final IndustryMapper industryMapper;
    private final IndustryDtoMapper industryDtoMapper;

    private final StockClient stockClient;
    private final FavoriteClient favoriteClient;

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
            List<StockDto> stockDtoList = stockClient.getByIndustryId(industry.getId());
            for (StockDto stock : stockDtoList) {
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
        List<StockDto> nStock = stockClient.getNStock(0, 5);
        List<StockBriefDto> result = new ArrayList<>();
        nStock.forEach(o -> {
            result.add(new ModelMapper().map(o, StockBriefDto.class));
        });
        return result;

    }

    //해당 산업의 시가총액 상위 5개 종목
    public List<StockBriefDto> getStockList(Long id) {
        List<StockBriefDto> result = new ArrayList<>();
        List<StockDto> nStockByindustry = stockClient.getNStockByindustry(id, 0, 5);
        nStockByindustry.forEach(o -> result.add(new ModelMapper().map(o, StockBriefDto.class)));
        return result;
    }

    // 관심  산업 리스트 출력
    public List<IndustryDto> getMyIndustries(MemberDto memberDto) {
        List<FavoriteDto> myFavoriteIndustry = favoriteClient.getMyFavoriteIndustry(memberDto.getId());
        List<Industry> industryList = new ArrayList<>();
        myFavoriteIndustry.forEach(o -> industryList.add(getIndustry(o.getIndustryId())));
        return industryMapper.toDto(industryList);
    }

    // 관심 산업 등록
    @Transactional
    public void addFavorite(MemberDto memberDto,Long id) {
        getIndustry(id);
        boolean isFavorite = checkFavorite(memberDto.getId(),id);
        //이미 관심등록했다면
        if (isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.ALREADY_EXIST);
        }
        favoriteClient.createFavoriteIndustry(memberDto.getId(),id);

    }

    @Transactional
    public void deleteFavorite(MemberDto memberDto,Long id) {
        getIndustry(id);
        boolean isFavorite = checkFavorite(memberDto.getId(),id);
        // 관심 등록하지 않았다면
        if (!isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.NOT_FOUND);
        }
        favoriteClient.deleteFavoriteIndustry(memberDto.getId(),id);
    }

    public List<GetIndustryMarketCapResponse> getMarketCapList(Long id) {
        getIndustry(id);
        List<IndustrySumDto> marketList = stockClient.getMarketList(id);
        List<IndustryEpochSumDto> result = new ArrayList<>();

        // LocalDate -> epochTime
        for (IndustrySumDto industryDto : marketList) {
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
        getIndustry(id);
        return stockClient.findTodayDailyStock(id);
    }


    // 산업 엔티티 반환
    private Industry getIndustry(Long id) {
        // 존재하지 않을 시 NOT FOUND 예외 발생
        return industryRepository.findById(id).orElseThrow(() -> new IndustryException(IndustryExceptionType.NOT_FOUND));
    }

    // 관심 산업 여부 체크
    public boolean checkFavorite(Long memberId,Long industryId) {
        return favoriteClient.checkFavoriteIndustry(memberId,industryId);
    }


}
