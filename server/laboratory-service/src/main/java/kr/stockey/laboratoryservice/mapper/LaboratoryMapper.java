package kr.stockey.laboratoryservice.mapper;

import kr.stockey.laboratoryservice.dto.StockListItemDto;
import kr.stockey.laboratoryservice.entity.Stock;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper
public interface LaboratoryMapper {
    @Named("STOCKLST")
    @Mapping(source = "stock_id", target = "id")
    @Mapping(source = "name", target = "name")
    StockListItemDto toStockItem(Stock stock);

    @IterableMapping(qualifiedByName = "STOCKLST")
    List<StockListItemDto> toStockItemList(List<Stock> stockList);
}
