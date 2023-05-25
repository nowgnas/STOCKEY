package kr.stockey.investmentservice.repository;

import kr.stockey.investmentservice.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
}
