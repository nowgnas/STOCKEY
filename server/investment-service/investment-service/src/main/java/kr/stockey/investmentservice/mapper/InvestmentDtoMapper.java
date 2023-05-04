package kr.stockey.investmentservice.mapper;

import kr.stockey.investmentservice.api.request.OrderRequest;
import kr.stockey.investmentservice.dto.OrderProducerDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InvestmentDtoMapper {
    OrderProducerDto toOrderProducerDto(OrderRequest dto);
}
