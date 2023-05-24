package kr.stockey.investmentservice.api;

import kr.stockey.investmentservice.api.request.OrderRequest;
import kr.stockey.investmentservice.api.response.GetPopularStocksResponse;
import kr.stockey.investmentservice.api.response.TraderRankResponse;
import kr.stockey.investmentservice.api.response.WholeStockInfoResponse;
import kr.stockey.investmentservice.dto.*;
import kr.stockey.investmentservice.mapper.InvestmentDtoMapper;
import kr.stockey.investmentservice.service.InvestmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/investment")
@RequiredArgsConstructor
@Slf4j
public class InvestmentController {

    private final InvestmentService investmentService;
    private final InvestmentDtoMapper investmentDtoMapper;

    /*
        주문 제출
     */
    @PostMapping("/order")
    public ResponseEntity<ResponseDto> takeStockOrder(@RequestBody List<OrderRequest> orderRequests) {
        List<OrderListDto> orderListDto = investmentDtoMapper.toOrderListDto(orderRequests);
        OrderProducerDto orderProducerDto = new OrderProducerDto(getMemberId(), orderListDto, LocalDateTime.now().minusHours(1));
        investmentService.takeStockOrder(orderProducerDto);
        return new ResponseEntity<>(new ResponseDto("주문 제출 완료!", null), HttpStatus.OK);
    }

    /*
        주문 제출 여부 확인
     */
    @GetMapping("/order/check")
    public ResponseEntity<ResponseDto> checkOrderSubmit() {
        Boolean checked = investmentService.checkOrderSubmit(getMemberId());
        return new ResponseEntity<>(new ResponseDto("주문 여부 확인 완료!", checked), HttpStatus.OK);
    }

    /*
        내가 주문한 history 제공 -> 이번주 정보
     */
    @GetMapping("/my/orders")
    public ResponseEntity<ResponseDto> getOrderHistory() {
        List<OrderHistoryDto> ordersHistory = investmentService.getOrderHistory(getMemberId());
        return new ResponseEntity<>(new ResponseDto("주문 내역 제공 완료!", ordersHistory), HttpStatus.OK);
    }

    /*
        내 계좌 정보 가져오기 (총자산, 주식, 예수금)
     */
    @GetMapping("/my/asset")
    public ResponseEntity<ResponseDto> getMyAccount() {
        AccountDto accountDto = investmentService.getMyAccount(getMemberId());
        return new ResponseEntity<>(new ResponseDto("내 계좌 정보 제공 완료!", accountDto), HttpStatus.OK);
    }

    /*
        내 보유 주식 정보 (목록, 평가액 비중, 수익률)
     */
    @GetMapping("/my/stock")
    public ResponseEntity<ResponseDto> getMyStockInfo() {
        List<MyStockInfoDto> myStockInfoDtoList = investmentService.getMyStockInfo(getMemberId());
        return new ResponseEntity<>(new ResponseDto("내 보유 주식 정보 제공 완료!", myStockInfoDtoList), HttpStatus.OK);
    }

    /*
        전체 랭킹 정보와 내 랭킹 정보 제공
     */
    @GetMapping("/rank")
    public ResponseEntity<ResponseDto> getTraderRank(@RequestParam Long num, @RequestParam String nickname) {
        List<TraderRankDto> traderRankDtoList = investmentService.getTraderRank(num);
        Long myRank = investmentService.getMyRank(nickname);
        TraderRankResponse traderRankResponse = new TraderRankResponse(traderRankDtoList, myRank);
        return new ResponseEntity<>(new ResponseDto("유저 랭킹 정보 제공 완료!", traderRankResponse), HttpStatus.OK);
    }

    /*
        이번주 내 보유 주식 정보
     */
    @GetMapping("/my/weeklyasset")
    public ResponseEntity<ResponseDto> getWeeklyAssetInfo() {
        List<AccountFlowDto> accountFlowDtoList = investmentService.getWeeklyAssetInfo(getMemberId());
        return new ResponseEntity<>(new ResponseDto("이번주 내 보유 주식 정보 제공 완료!", accountFlowDtoList), HttpStatus.OK);
    }

    /*
        현 시점 특정 종목의 주문 현황 가져오기
     */
    @GetMapping("/orderstatus/{stockId}")
    public ResponseEntity<ResponseDto> getOrderStatus(@PathVariable("stockId") Long stockId) {
        OrderStatusDto orderStatusDto = investmentService.getOrderStatus(stockId);
        return new ResponseEntity<>(new ResponseDto("현 시점 특정 종목의 주문 현황 가져오기!", orderStatusDto), HttpStatus.OK);
    }

    /*
        내 랭킹 순위 제공 api
     */
    @GetMapping("/my/rank")
    public ResponseEntity<ResponseDto> getMyRank(@RequestParam String nickname) {
        Long myRank = investmentService.getMyRank(nickname);
        return new ResponseEntity<>(new ResponseDto("내 랭킹 제공 완료!", myRank), HttpStatus.OK);
    }

    /*
        전체 주식 정보 제공 (주식 id, 주식명, 현재가)
     */
    @GetMapping("/wholestockinfo")
    public ResponseEntity<ResponseDto> getWholeStockInfo() {
        List<WholeStockInfoResponse> wholeStockInfo = investmentService.getWholeStockInfo();
        return new ResponseEntity<>(new ResponseDto("전체 주식 정보 제공 완료!", wholeStockInfo), HttpStatus.OK);
    }

    /*
        현재 주문 시간대에 Top N 인기종목
     */
    @GetMapping("/popular/{topN}")
    public ResponseEntity<ResponseDto> getPopularStocks(@PathVariable("topN") Long topN) {
        List<GetPopularStocksResponse> getPopularStocksResponse = investmentService.getPopularStocks(topN);
        return new ResponseEntity<>(new ResponseDto("현 시점 인기 종목 가져오기!", getPopularStocksResponse), HttpStatus.OK);
    }

    /*
        http 헤더에서 member id 가져오는 메소드
     */
    private Long getMemberId() {
        // http 헤더에서 "X-UserId" 내용 가져와서 리턴하는 로직으로 채우기
        HttpServletRequest request
                = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String userId = request.getHeader("X-UserId");
        log.debug(userId);
        return Long.valueOf(userId);
    }


}
