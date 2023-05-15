package kr.stockey.stockservice.repository;

import kr.stockey.stockservice.entity.DailyStock;
import kr.stockey.stockservice.entity.StockClickStatistic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StockClickStatisticRepository extends JpaRepository<StockClickStatistic, Long> {

    Optional<DailyStock> findByStockIdAndStockDate(Long stockId, LocalDate stockDate);
}
