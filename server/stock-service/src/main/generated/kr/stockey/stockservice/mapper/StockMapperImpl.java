package kr.stockey.stockservice.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import kr.stockey.stockservice.dto.StockBriefDto;
import kr.stockey.stockservice.dto.StockBriefDto.StockBriefDtoBuilder;
import kr.stockey.stockservice.dto.StockPreviewDto;
import kr.stockey.stockservice.dto.StockPreviewDto.StockPreviewDtoBuilder;
import kr.stockey.stockservice.dto.StockSearchDto;
import kr.stockey.stockservice.dto.StockSummaryDto;
import kr.stockey.stockservice.dto.StockSummaryDto.StockSummaryDtoBuilder;
import kr.stockey.stockservice.dto.core.BusinessDto;
import kr.stockey.stockservice.dto.core.BusinessDto.BusinessDtoBuilder;
import kr.stockey.stockservice.dto.core.DailyStockDto;
import kr.stockey.stockservice.dto.core.StockDto;
import kr.stockey.stockservice.dto.core.StockDto.StockDtoBuilder;
import kr.stockey.stockservice.entity.Business;
import kr.stockey.stockservice.entity.DailyStock;
import kr.stockey.stockservice.entity.Stock;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-15T14:07:00+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Amazon.com Inc.)"
)
@Component
public class StockMapperImpl implements StockMapper {

    @Override
    public StockPreviewDto toPreviewDto(Stock s) {
        if ( s == null ) {
            return null;
        }

        StockPreviewDtoBuilder stockPreviewDto = StockPreviewDto.builder();

        stockPreviewDto.id( s.getId() );
        stockPreviewDto.name( s.getName() );
        stockPreviewDto.code( s.getCode() );

        return stockPreviewDto.build();
    }

    @Override
    public List<StockBriefDto> toDto(List<Stock> stockList) {
        if ( stockList == null ) {
            return null;
        }

        List<StockBriefDto> list = new ArrayList<StockBriefDto>( stockList.size() );
        for ( Stock stock : stockList ) {
            list.add( stockToStockBriefDto( stock ) );
        }

        return list;
    }

    @Override
    public List<StockDto> toStockDto(List<Stock> stockList) {
        if ( stockList == null ) {
            return null;
        }

        List<StockDto> list = new ArrayList<StockDto>( stockList.size() );
        for ( Stock stock : stockList ) {
            list.add( stockToStockDto( stock ) );
        }

        return list;
    }

    @Override
    public StockSummaryDto toStockDto(Stock stock) {
        if ( stock == null ) {
            return null;
        }

        StockSummaryDtoBuilder stockSummaryDto = StockSummaryDto.builder();

        stockSummaryDto.id( stock.getId() );
        stockSummaryDto.name( stock.getName() );
        stockSummaryDto.code( stock.getCode() );
        stockSummaryDto.description( stock.getDescription() );
        stockSummaryDto.marketCap( stock.getMarketCap() );
        stockSummaryDto.stockCount( stock.getStockCount() );
        stockSummaryDto.companySize( stock.getCompanySize() );
        stockSummaryDto.companySales( stock.getCompanySales() );
        stockSummaryDto.creditRank( stock.getCreditRank() );
        stockSummaryDto.basicInfo( stock.getBasicInfo() );
        stockSummaryDto.businesses( businessListToBusinessDtoList( stock.getBusinesses() ) );

        return stockSummaryDto.build();
    }

    @Override
    public DailyStockDto toDailyStockDto(DailyStock dailyStock) {
        if ( dailyStock == null ) {
            return null;
        }

        DailyStockDto dailyStockDto = new DailyStockDto();

        dailyStockDto.setId( dailyStock.getId() );
        dailyStockDto.setStockDate( dailyStock.getStockDate() );
        dailyStockDto.setOpenPrice( dailyStock.getOpenPrice() );
        dailyStockDto.setClosePrice( dailyStock.getClosePrice() );
        dailyStockDto.setLowPrice( dailyStock.getLowPrice() );
        dailyStockDto.setHighPrice( dailyStock.getHighPrice() );
        dailyStockDto.setVolume( dailyStock.getVolume() );
        dailyStockDto.setChangeRate( dailyStock.getChangeRate() );

        return dailyStockDto;
    }

    @Override
    public List<DailyStockDto> toDailyStockDto(List<DailyStock> dailyStock) {
        if ( dailyStock == null ) {
            return null;
        }

        List<DailyStockDto> list = new ArrayList<DailyStockDto>( dailyStock.size() );
        for ( DailyStock dailyStock1 : dailyStock ) {
            list.add( toDailyStockDto( dailyStock1 ) );
        }

        return list;
    }

    @Override
    public List<StockSearchDto> toSearchDto(List<Stock> stocks) {
        if ( stocks == null ) {
            return null;
        }

        List<StockSearchDto> list = new ArrayList<StockSearchDto>( stocks.size() );
        for ( Stock stock : stocks ) {
            list.add( stockToStockSearchDto( stock ) );
        }

        return list;
    }

    protected StockBriefDto stockToStockBriefDto(Stock stock) {
        if ( stock == null ) {
            return null;
        }

        StockBriefDtoBuilder stockBriefDto = StockBriefDto.builder();

        stockBriefDto.id( stock.getId() );
        stockBriefDto.name( stock.getName() );
        stockBriefDto.marketCap( stock.getMarketCap() );

        return stockBriefDto.build();
    }

    protected BusinessDto businessToBusinessDto(Business business) {
        if ( business == null ) {
            return null;
        }

        BusinessDtoBuilder businessDto = BusinessDto.builder();

        businessDto.id( business.getId() );
        businessDto.name( business.getName() );
        businessDto.description( business.getDescription() );

        return businessDto.build();
    }

    protected List<BusinessDto> businessListToBusinessDtoList(List<Business> list) {
        if ( list == null ) {
            return null;
        }

        List<BusinessDto> list1 = new ArrayList<BusinessDto>( list.size() );
        for ( Business business : list ) {
            list1.add( businessToBusinessDto( business ) );
        }

        return list1;
    }

    protected StockDto stockToStockDto(Stock stock) {
        if ( stock == null ) {
            return null;
        }

        StockDtoBuilder stockDto = StockDto.builder();

        stockDto.id( stock.getId() );
        stockDto.name( stock.getName() );
        stockDto.code( stock.getCode() );
        stockDto.description( stock.getDescription() );
        stockDto.marketCap( stock.getMarketCap() );
        stockDto.stockCount( stock.getStockCount() );
        stockDto.companySize( stock.getCompanySize() );
        stockDto.companySales( stock.getCompanySales() );
        stockDto.creditRank( stock.getCreditRank() );
        stockDto.basicInfo( stock.getBasicInfo() );
        stockDto.industryId( stock.getIndustryId() );
        stockDto.businesses( businessListToBusinessDtoList( stock.getBusinesses() ) );

        return stockDto.build();
    }

    protected StockSearchDto stockToStockSearchDto(Stock stock) {
        if ( stock == null ) {
            return null;
        }

        StockSearchDto stockSearchDto = new StockSearchDto();

        stockSearchDto.setId( stock.getId() );
        stockSearchDto.setName( stock.getName() );
        stockSearchDto.setCode( stock.getCode() );

        return stockSearchDto;
    }
}
