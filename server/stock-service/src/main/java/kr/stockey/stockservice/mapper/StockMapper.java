package kr.stockey.stockservice.mapper;


import kr.stockey.stockservice.dto.*;
import kr.stockey.stockservice.entity.DailyStock;
import kr.stockey.stockservice.entity.Stock;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel= "spring")
public interface StockMapper {
    StockPreviewDto toPreviewDto(Stock s);
    List<StockBriefDto> toDto(List<Stock> stockList);
    List<StockDto> toStockDto(List<Stock> stockList);
    StockDto toStockDto(Stock stock);
    DailyStockDto toDailyStockDto(DailyStock dailyStock);
    List<DailyStockDto> toDailyStockDto(List<DailyStock> dailyStock);
    List<StockSearchDto> toSearchDto(List<Stock> stocks);
}
