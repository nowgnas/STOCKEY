package kr.stockey.investmentservice.mapper;

import kr.stockey.investmentservice.api.request.OrderRequest;
import kr.stockey.investmentservice.dto.OrderListDto;
import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.redis.Order;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface InvestmentDtoMapper {
    OrderListDto toOrderListDto(OrderRequest orderRequest);
    List<OrderListDto> toOrderListDto(List<OrderRequest> dtoList);
    Order toRedisOrderDto(OrderProducerDto dto);
}
