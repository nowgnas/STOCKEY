package kr.stockey.industryservice.dto.core;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class StockDto {
    private Long id;
    private String name;
    private String code;
    private String description;
    private Long marketCap;
    private Long stockCount;
    private String companySize;
    private String companySales;
    private String creditRank;
    private String basicInfo;
    private Long  industryId;
    private List<BusinessDto> businesses;
}