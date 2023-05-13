package kr.stockey.stockservice.dto;

import kr.stockey.stockservice.dto.core.BusinessDto;
import kr.stockey.stockservice.dto.core.DailyStockDto;
import kr.stockey.stockservice.dto.core.IndustryDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class StockSummaryDto {

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
    private IndustryDto industry;
    private List<BusinessDto> businesses;
    private DailyStockDto todayDailyStock;
    private Integer industryTotalCount;

    private Integer industryCapRank;
    private Integer industryFavRank;

    private Float industryAvgChangeRate;

}