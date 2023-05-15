package kr.stockey.stockservice.dto;

import java.time.LocalDate;

public interface CorrelationDto {
    LocalDate getStockDate();
    Integer getClosePrice();
    Integer getCount();

}
