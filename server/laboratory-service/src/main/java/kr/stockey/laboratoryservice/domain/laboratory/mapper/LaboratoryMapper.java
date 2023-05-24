package kr.stockey.laboratoryservice.domain.laboratory.mapper;

import kr.stockey.laboratoryservice.domain.stock.dto.StockPreviewDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LaboratoryMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Named("STOCK")
    StockSearchDto toStockDto(StockPreviewDto stockPreviewDto);

    @IterableMapping(qualifiedByName = "STOCK")
    List<StockSearchDto> toStockList(List<StockPreviewDto> previewDtos);

}
