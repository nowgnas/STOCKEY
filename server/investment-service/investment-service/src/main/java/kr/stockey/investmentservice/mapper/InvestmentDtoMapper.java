package kr.stockey.investmentservice.mapper;

import kr.stockey.investmentservice.api.request.OrderRequest;
import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.redis.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InvestmentDtoMapper {
    OrderProducerDto toOrderProducerDto(OrderRequest dto);

    Order toRedisOrderDto(OrderProducerDto dto);
}
