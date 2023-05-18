package kr.stockey.investmentservice.service;

import kr.stockey.investmentservice.api.response.GetPopularStocksResponse;
import kr.stockey.investmentservice.api.response.WholeStockInfoResponse;
import kr.stockey.investmentservice.dto.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface InvestmentService {
    void takeStockOrder(OrderProducerDto orderProducerDto);

    void orderExecuteScheduler();


    Boolean checkOrderSubmit(Long memberId);

    List<OrderHistoryDto> getOrderHistory(Long memberId);

    AccountDto getMyAccount(Long memberId);

    List<MyStockInfoDto> getMyStockInfo(Long memberId);

    List<TraderRankDto> getTraderRank(Long num);

    List<AccountFlowDto> getWeeklyAssetInfo(Long memberId);

    OrderStatusDto getOrderStatus(Long stockId);

    Long getMyRank(String nickname);

    List<WholeStockInfoResponse> getWholeStockInfo();

    List<GetPopularStocksResponse> getPopularStocks(Long topN);
}
