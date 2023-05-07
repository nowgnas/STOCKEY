package kr.stockey.stockservice.mapper;

import com.ssafy.backend.domain.stock.api.response.GetStockResponse;
import com.ssafy.backend.domain.stock.api.response.GetStockTodayResponse;
import com.ssafy.backend.domain.stock.dto.StockDto;
import com.ssafy.backend.domain.stock.dto.StockTodayDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StockDtoMapper {
    GetStockResponse toGetStockResponse(StockDto stockDto);

    List<GetStockTodayResponse> toGetStockTodayResponse(List<StockTodayDto> stockTodayDto);


}
