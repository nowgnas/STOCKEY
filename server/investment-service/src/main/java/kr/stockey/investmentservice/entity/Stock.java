package kr.stockey.investmentservice.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "stock")
@ToString
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "industry_id", nullable = false)
    private Long industryId;

    @Size(max = 30)
    @NotNull
    @Column(name = "name", nullable = false, length = 30)
    private String name;

    @Size(max = 20)
    @NotNull
    @Column(name = "code", nullable = false, length = 20)
    private String code;

    @Size(max = 500)
    @Column(name = "description", length = 500)
    private String description;

    @NotNull
    @Column(name = "market_cap", nullable = false)
    private Long marketCap;

    @NotNull
    @Column(name = "stock_count", nullable = false)
    private Long stockCount;

    @Size(max = 40)
    @Column(name = "company_size", length = 40)
    private String companySize;

    @Size(max = 100)
    @Column(name = "company_sales", length = 100)
    private String companySales;

    @Size(max = 40)
    @Column(name = "credit_rank", length = 40)
    private String creditRank;

    @Size(max = 200)
    @Column(name = "basic_info", length = 200)
    private String basicInfo;



}