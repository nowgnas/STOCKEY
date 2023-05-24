package kr.stockey.industryservice.api.response;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
@Schema(description = "산업의 날짜별 시가총액리스트")
public class GetIndustryMarketCapResponse {
    LocalDate stockDate;
    Long marketCap;
    Long epochTime;
}
