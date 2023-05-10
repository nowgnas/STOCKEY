package kr.stockey.investmentservice.api;

import kr.stockey.investmentservice.api.request.OrderRequest;
import kr.stockey.investmentservice.dto.OrderListDto;
import kr.stockey.investmentservice.dto.OrderProducerDto;
import kr.stockey.investmentservice.dto.ResponseDto;
import kr.stockey.investmentservice.kafka.producer.StockOrderProducer;
import kr.stockey.investmentservice.mapper.InvestmentDtoMapper;
import kr.stockey.investmentservice.service.InvestmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/investment")
@RequiredArgsConstructor
public class InvestmentController {

    private final InvestmentService investmentService;
    private final InvestmentDtoMapper investmentDtoMapper;

    @PostMapping("/order")
    public ResponseEntity<ResponseDto> takeStockOrder(@RequestBody List<OrderRequest> orderRequests) throws Exception {
        List<OrderListDto> orderListDto = investmentDtoMapper.toOrderListDto(orderRequests);
        OrderProducerDto orderProducerDto = new OrderProducerDto(getMemberId(), orderListDto, LocalDateTime.now());
        investmentService.takeStockOrder(orderProducerDto);
        return new ResponseEntity<>(new ResponseDto("주문 제출 완료!", null), HttpStatus.OK);
    }


    private Long getMemberId() {
        // http 헤더에서 "X-UserId" 내용 가져와서 리턴하는 로직으로 채우기
        return 5L;
    }
}
