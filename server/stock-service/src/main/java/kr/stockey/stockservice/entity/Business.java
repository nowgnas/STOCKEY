package kr.stockey.stockservice.entity;

import com.ssafy.backend.domain.stock.entity.Stock;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Entity
@Setter
@Table(name = "business")
public class Business {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "business_id", nullable = false)
    private Long id;

    @Size(max = 45)
    @Column(name = "name", length = 45)
    private String name;

    @Size(max = 500)
    @Column(name = "description", length = 500)
    private String description;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="stock_id", nullable = false)
    private Stock stock;

    public void setStock(Stock stock){
        this.stock = stock;
        stock.getBusinesses().add(this);
    }
}
