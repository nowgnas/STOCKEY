package kr.stockey.stockservice.repository;

import kr.stockey.stockservice.entity.DailyStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DailyStockRepository extends JpaRepository<DailyStock, Long> {

    @Query(value = "SELECT * FROM daily_stock WHERE stock_id = :stockId ORDER BY stock_date DESC LIMIT 1", nativeQuery = true)
    Optional<DailyStock> findTodayDailyStock(Long stockId);

    List<DailyStock> findByStockId(Long stockId);


}
