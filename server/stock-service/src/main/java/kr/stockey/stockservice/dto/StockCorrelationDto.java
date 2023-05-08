package kr.stockey.stockservice.dto;

import kr.stockey.stockservice.entity.Stock;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StockCorrelationDto implements  Comparable<StockCorrelationDto>{
    Stock stock;
    Double correlation;

    @Override
    public int compareTo(StockCorrelationDto o) {
        Double me = Math.abs(this.correlation);
        Double other = Math.abs(o.correlation);
        return -1*me.compareTo(other);
    }
}
