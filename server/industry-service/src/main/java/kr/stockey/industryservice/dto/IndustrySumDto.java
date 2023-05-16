package kr.stockey.industryservice.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class IndustrySumDto {
    LocalDate stockDate;
    Long marketCap;
}
