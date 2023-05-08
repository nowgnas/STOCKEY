package kr.stockey.stockservice.mapper;

import kr.stockey.stockservice.api.response.GetStockResponse;
import kr.stockey.stockservice.api.response.GetStockTodayResponse;
import kr.stockey.stockservice.dto.StockDto;
import kr.stockey.stockservice.dto.StockTodayDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StockDtoMapper {
    GetStockResponse toGetStockResponse(StockDto stockDto);

    List<GetStockTodayResponse> toGetStockTodayResponse(List<StockTodayDto> stockTodayDto);


}
