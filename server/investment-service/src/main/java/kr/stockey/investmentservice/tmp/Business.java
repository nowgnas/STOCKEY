package kr.stockey.investmentservice.tmp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "business")
public class Business {
    @Id
    @Column(name = "main_sales_id", nullable = false)
    private Long id;

    @Size(max = 40)
    @Column(name = "name", length = 40)
    private String name;

    @Size(max = 255)
    @Column(name = "description")
    private String description;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "stock_id", nullable = false)
    private Stock stock;

}