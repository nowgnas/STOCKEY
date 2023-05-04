package kr.stockey.investmentservice.service;

import kr.stockey.investmentservice.dto.OrderProducerDto;

public interface InvestmentService {
    void takeStockOrder(OrderProducerDto orderProducerDto);
}
