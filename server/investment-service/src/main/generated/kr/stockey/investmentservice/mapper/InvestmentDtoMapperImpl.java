package kr.stockey.investmentservice.mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import kr.stockey.investmentservice.api.request.OrderRequest;
import kr.stockey.investmentservice.dto.OrderListDto;
import kr.stockey.investmentservice.dto.OrderListDto.OrderListDtoBuilder;
import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.redis.Order;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-17T22:15:58+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.5 (Homebrew)"
)
@Component
public class InvestmentDtoMapperImpl implements InvestmentDtoMapper {

    @Override
    public OrderListDto toOrderListDto(OrderRequest orderRequest) {
        if ( orderRequest == null ) {
            return null;
        }

        OrderListDtoBuilder orderListDto = OrderListDto.builder();

        orderListDto.stockId( orderRequest.getStockId() );
        orderListDto.count( orderRequest.getCount() );
        orderListDto.orderType( orderRequest.getOrderType() );

        return orderListDto.build();
    }

    @Override
    public List<OrderListDto> toOrderListDto(List<OrderRequest> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<OrderListDto> list = new ArrayList<OrderListDto>( dtoList.size() );
        for ( OrderRequest orderRequest : dtoList ) {
            list.add( toOrderListDto( orderRequest ) );
        }

        return list;
    }

    @Override
    public Order toRedisOrderDto(OrderProducerDto dto) {
        if ( dto == null ) {
            return null;
        }

        List<OrderListDto> orders = null;
        Long memberId = null;
        LocalDateTime orderTime = null;

        List<OrderListDto> list = dto.getOrders();
        if ( list != null ) {
            orders = new ArrayList<OrderListDto>( list );
        }
        memberId = dto.getMemberId();
        orderTime = dto.getOrderTime();

        Order order = new Order( memberId, orders, orderTime );

        return order;
    }
}
