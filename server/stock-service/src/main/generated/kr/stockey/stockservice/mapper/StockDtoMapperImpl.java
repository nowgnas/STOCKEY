package kr.stockey.stockservice.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import kr.stockey.stockservice.api.response.GetStockResponse;
import kr.stockey.stockservice.api.response.GetStockResponse.GetStockResponseBuilder;
import kr.stockey.stockservice.api.response.GetStockTodayResponse;
import kr.stockey.stockservice.api.response.GetStockTodayResponse.GetStockTodayResponseBuilder;
import kr.stockey.stockservice.dto.StockSummaryDto;
import kr.stockey.stockservice.dto.StockTodayDto;
import kr.stockey.stockservice.dto.core.BusinessDto;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-15T14:07:00+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Amazon.com Inc.)"
)
@Component
public class StockDtoMapperImpl implements StockDtoMapper {

    @Override
    public GetStockResponse toGetStockResponse(StockSummaryDto stockDto) {
        if ( stockDto == null ) {
            return null;
        }

        GetStockResponseBuilder getStockResponse = GetStockResponse.builder();

        getStockResponse.id( stockDto.getId() );
        getStockResponse.name( stockDto.getName() );
        getStockResponse.code( stockDto.getCode() );
        getStockResponse.description( stockDto.getDescription() );
        getStockResponse.marketCap( stockDto.getMarketCap() );
        getStockResponse.stockCount( stockDto.getStockCount() );
        getStockResponse.companySize( stockDto.getCompanySize() );
        getStockResponse.companySales( stockDto.getCompanySales() );
        getStockResponse.creditRank( stockDto.getCreditRank() );
        getStockResponse.basicInfo( stockDto.getBasicInfo() );
        getStockResponse.industry( stockDto.getIndustry() );
        List<BusinessDto> list = stockDto.getBusinesses();
        if ( list != null ) {
            getStockResponse.businesses( new ArrayList<BusinessDto>( list ) );
        }
        getStockResponse.todayDailyStock( stockDto.getTodayDailyStock() );
        getStockResponse.industryTotalCount( stockDto.getIndustryTotalCount() );
        getStockResponse.industryCapRank( stockDto.getIndustryCapRank() );
        getStockResponse.industryFavRank( stockDto.getIndustryFavRank() );
        getStockResponse.industryAvgChangeRate( stockDto.getIndustryAvgChangeRate() );

        return getStockResponse.build();
    }

    @Override
    public List<GetStockTodayResponse> toGetStockTodayResponse(List<StockTodayDto> stockTodayDto) {
        if ( stockTodayDto == null ) {
            return null;
        }

        List<GetStockTodayResponse> list = new ArrayList<GetStockTodayResponse>( stockTodayDto.size() );
        for ( StockTodayDto stockTodayDto1 : stockTodayDto ) {
            list.add( stockTodayDtoToGetStockTodayResponse( stockTodayDto1 ) );
        }

        return list;
    }

    protected GetStockTodayResponse stockTodayDtoToGetStockTodayResponse(StockTodayDto stockTodayDto) {
        if ( stockTodayDto == null ) {
            return null;
        }

        GetStockTodayResponseBuilder getStockTodayResponse = GetStockTodayResponse.builder();

        getStockTodayResponse.id( stockTodayDto.getId() );
        getStockTodayResponse.name( stockTodayDto.getName() );
        getStockTodayResponse.price( stockTodayDto.getPrice() );
        getStockTodayResponse.rate( stockTodayDto.getRate() );

        return getStockTodayResponse.build();
    }
}
