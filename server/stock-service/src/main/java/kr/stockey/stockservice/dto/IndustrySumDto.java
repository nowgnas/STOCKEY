package kr.stockey.stockservice.dto;


import java.time.LocalDate;

public interface IndustrySumDto {
    LocalDate getStockDate();
    Long getMarketCap();
}
