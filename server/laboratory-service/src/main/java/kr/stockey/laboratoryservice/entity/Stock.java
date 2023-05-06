package kr.stockey.laboratoryservice.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(name = "Stock")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stock_id;
    private Long industry_id;
    private String name;
    private String code;
    private String description;
    private Long market_cap;
    private Long stock_count;
    private String company_size;
    private String sales;
    private String credit_rank;
    private String basic_info;

    @Builder
    public Stock(Long stock_id, Long industry_id, String name, String code, String description, Long market_cap, Long stock_count, String company_size, String sales, String credit_rank, String basic_info) {
        this.stock_id = stock_id;
        this.industry_id = industry_id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.market_cap = market_cap;
        this.stock_count = stock_count;
        this.company_size = company_size;
        this.sales = sales;
        this.credit_rank = credit_rank;
        this.basic_info = basic_info;
    }
}
