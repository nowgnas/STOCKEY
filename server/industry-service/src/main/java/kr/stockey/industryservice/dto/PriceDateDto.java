package kr.stockey.stockservice.dto;

import java.time.LocalDate;

public interface PriceDateDto {
    LocalDate getStockDate();

    Integer getClosePrice();

}