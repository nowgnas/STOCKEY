package kr.stockey.investmentservice.service;

import kr.stockey.investmentservice.dto.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface InvestmentService {
    void takeStockOrder(OrderProducerDto orderProducerDto) throws Exception;

    void orderExecuteScheduler() throws Exception;


    Boolean checkOrderSubmit(Long memberId);

    List<OrderHistoryDto> getOrderHistory(Long memberId);

    AccountDto getMyAccount(Long memberId);

    List<MyStockInfoDto> getMyStockInfo(Long memberId) throws Exception;

    List<TraderRankDto> getTraderRank(Long num);

    List<AccountFlowDto> getWeeklyAssetInfo(Long memberId);

    OrderStatusDto getOrderStatus(Long stockId);
}
