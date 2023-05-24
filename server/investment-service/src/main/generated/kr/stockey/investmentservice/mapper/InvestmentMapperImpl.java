package kr.stockey.investmentservice.mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import kr.stockey.investmentservice.dto.ContractDto;
import kr.stockey.investmentservice.dto.OrderDto;
import kr.stockey.investmentservice.dto.OrderHistoryDto;
import kr.stockey.investmentservice.dto.OrderHistoryDto.OrderHistoryDtoBuilder;
import kr.stockey.investmentservice.entity.Contract;
import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-17T22:15:58+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.5 (Homebrew)"
)
@Component
public class InvestmentMapperImpl implements InvestmentMapper {

    @Override
    public OrderHistoryDto toOrderHistoryDto(Contract orderHistory) {
        if ( orderHistory == null ) {
            return null;
        }

        OrderHistoryDtoBuilder orderHistoryDto = OrderHistoryDto.builder();

        orderHistoryDto.stockId( orderHistory.getStockId() );
        orderHistoryDto.contractPrice( orderHistory.getContractPrice() );
        orderHistoryDto.profit( orderHistory.getProfit() );
        orderHistoryDto.contractType( orderHistory.getContractType() );
        orderHistoryDto.createdAt( orderHistory.getCreatedAt() );

        return orderHistoryDto.build();
    }

    @Override
    public List<OrderHistoryDto> toOrderHistoryDtoList(List<Contract> orderHistory) {
        if ( orderHistory == null ) {
            return null;
        }

        List<OrderHistoryDto> list = new ArrayList<OrderHistoryDto>( orderHistory.size() );
        for ( Contract contract : orderHistory ) {
            list.add( toOrderHistoryDto( contract ) );
        }

        return list;
    }

    @Override
    public OrderDto toOrderDto(Contract contract) {
        if ( contract == null ) {
            return null;
        }

        Long id = null;
        Long memberId = null;
        Long stockId = null;
        int count = 0;
        String contractType = null;
        LocalDateTime createdAt = null;
        InvCategory category = null;
        Long matchOrderId = null;

        id = contract.getId();
        memberId = contract.getMemberId();
        stockId = contract.getStockId();
        if ( contract.getCount() != null ) {
            count = contract.getCount().intValue();
        }
        if ( contract.getContractType() != null ) {
            contractType = contract.getContractType().name();
        }
        createdAt = contract.getCreatedAt();
        category = contract.getCategory();
        matchOrderId = contract.getMatchOrderId();

        OrderDto orderDto = new OrderDto( id, memberId, stockId, count, contractType, createdAt, category, matchOrderId );

        return orderDto;
    }

    @Override
    public List<OrderDto> toOrderDtoList(List<Contract> contracts) {
        if ( contracts == null ) {
            return null;
        }

        List<OrderDto> list = new ArrayList<OrderDto>( contracts.size() );
        for ( Contract contract : contracts ) {
            list.add( toOrderDto( contract ) );
        }

        return list;
    }

    @Override
    public ContractDto toContractDto(Contract contract) {
        if ( contract == null ) {
            return null;
        }

        Long id = null;
        Long memberId = null;
        Long stockId = null;
        Long count = null;
        Long contractPrice = null;
        ContractType contractType = null;
        LocalDateTime createdAt = null;
        InvCategory category = null;
        Long matchOrderId = null;
        Double profit = null;

        id = contract.getId();
        memberId = contract.getMemberId();
        stockId = contract.getStockId();
        count = contract.getCount();
        contractPrice = contract.getContractPrice();
        contractType = contract.getContractType();
        createdAt = contract.getCreatedAt();
        category = contract.getCategory();
        matchOrderId = contract.getMatchOrderId();
        profit = contract.getProfit();

        ContractDto contractDto = new ContractDto( id, memberId, stockId, count, contractPrice, contractType, createdAt, category, matchOrderId, profit );

        return contractDto;
    }

    @Override
    public List<ContractDto> toContractDtoList(List<Contract> contracts) {
        if ( contracts == null ) {
            return null;
        }

        List<ContractDto> list = new ArrayList<ContractDto>( contracts.size() );
        for ( Contract contract : contracts ) {
            list.add( toContractDto( contract ) );
        }

        return list;
    }
}
