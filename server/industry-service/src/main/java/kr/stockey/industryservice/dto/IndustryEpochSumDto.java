package kr.stockey.industryservice.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class IndustryEpochSumDto {
    LocalDate stockDate;
    Long marketCap;
    Long epochTime;

}
