package kr.stockey.laboratoryservice.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import kr.stockey.laboratoryservice.dto.StockListItemDto;
import kr.stockey.laboratoryservice.dto.StockListItemDto.StockListItemDtoBuilder;
import kr.stockey.laboratoryservice.entity.Stock;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-10T14:02:33+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class LaboratoryMapperImpl implements LaboratoryMapper {

    @Override
    public StockListItemDto toStockItem(Stock stock) {
        if ( stock == null ) {
            return null;
        }

        StockListItemDtoBuilder stockListItemDto = StockListItemDto.builder();

        stockListItemDto.id( stock.getStock_id() );
        stockListItemDto.name( stock.getName() );

        return stockListItemDto.build();
    }

    @Override
    public List<StockListItemDto> toStockItemList(List<Stock> stockList) {
        if ( stockList == null ) {
            return null;
        }

        List<StockListItemDto> list = new ArrayList<StockListItemDto>( stockList.size() );
        for ( Stock stock : stockList ) {
            list.add( toStockItem( stock ) );
        }

        return list;
    }
}
