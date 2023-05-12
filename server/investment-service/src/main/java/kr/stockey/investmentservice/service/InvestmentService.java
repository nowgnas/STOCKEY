package kr.stockey.investmentservice.service;

import kr.stockey.investmentservice.dto.AccountDto;
import kr.stockey.investmentservice.dto.ContractDto;
import kr.stockey.investmentservice.dto.OrderHistoryDto;
import kr.stockey.investmentservice.dto.OrderProducerDto;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface InvestmentService {
    void takeStockOrder(OrderProducerDto orderProducerDto) throws Exception;

    void orderExecuteScheduler() throws Exception;


    Boolean checkOrderSubmit(Long memberId);

    List<OrderHistoryDto> getOrderHistory(Long memberId);

    AccountDto getMyAccount(Long memberId);


}
