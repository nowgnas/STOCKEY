package kr.stockey.investmentservice.service;

import kr.stockey.investmentservice.dto.OrderProducerDto;

import java.util.concurrent.CompletableFuture;

public interface InvestmentService {
    void takeStockOrder(OrderProducerDto orderProducerDto) throws Exception;

    void orderExecuteScheduler() throws Exception;
}
