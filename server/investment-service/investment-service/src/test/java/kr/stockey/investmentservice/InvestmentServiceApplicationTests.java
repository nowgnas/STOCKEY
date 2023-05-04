package kr.stockey.investmentservice;

import kr.stockey.investmentservice.service.InvestmentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class InvestmentServiceApplicationTests {

    @Autowired
    InvestmentService investmentService;

    @Test
    void takeStockOrder_producer_적재_test() {
    }

}
