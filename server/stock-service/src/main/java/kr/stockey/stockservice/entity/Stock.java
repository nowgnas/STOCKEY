package kr.stockey.stockservice.entity;

import com.ssafy.backend.domain.industry.entity.Industry;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "stock")
public class Stock {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_id", nullable = false)
    private Long id;

    @Size(max = 45)
    @NotNull
    @Column(name = "name", nullable = false, length = 45)
    private String name;

    @Size(max = 45)
    @NotNull
    @Column(name = "code", nullable = false, length = 45)
    private String code;

    @Size(max = 500)
    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "market_cap")
    private Long marketCap;

    @NotNull
    @Column(name = "stock_count", nullable = false)
    private Long stockCount;

    @Size(max = 45)
    @Column(name = "company_size", length = 45)
    private String companySize;

    @Size(max = 100)
    @Column(name = "company_sales", length = 100)
    private String companySales;

    @Size(max = 45)
    @Column(name = "credit_rank", length = 45)
    private String creditRank;

    @Size(max = 200)
    @Column(name = "basic_info", length = 200)
    private String basicInfo;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "industry_id", nullable = false)
    private Industry industry;

    @BatchSize(size = 500)
    @OneToMany(mappedBy = "stock",fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Business> businesses = new ArrayList<>();

    public void setBusiness(Business business){
        this.businesses.add(business);
        if(business.getStock()!=this){
            business.setStock(this);
        }
    }
    @Builder
    public Stock(Long id, String name, String code, String description, Long marketCap, Long stockCount, String companySize, String companySales, String creditRank, String basicInfo, Industry industry) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.marketCap = marketCap;
        this.stockCount = stockCount;
        this.companySize = companySize;
        this.companySales = companySales;
        this.creditRank = creditRank;
        this.basicInfo = basicInfo;
        this.industry = industry;
    }
}