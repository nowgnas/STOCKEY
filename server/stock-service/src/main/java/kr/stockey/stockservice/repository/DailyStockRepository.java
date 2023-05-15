package kr.stockey.stockservice.repository;

import kr.stockey.stockservice.dto.PriceDateDto;
import kr.stockey.stockservice.entity.DailyStock;
import kr.stockey.stockservice.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyStockRepository extends JpaRepository<DailyStock, Long> {

    @Query(value = "SELECT * FROM daily_stock WHERE stock_id = :stockId ORDER BY stock_date DESC LIMIT 1", nativeQuery = true)
    Optional<DailyStock> findTodayDailyStock(Long stockId);


    @Query("SELECT ds.stockDate as stockDate,ds.closePrice as closePrice" +
            " FROM DailyStock  ds" +
            " WHERE ds.stock = :stock" +
            " AND ds.stockDate BETWEEN :startDate and :endDate")
    List<PriceDateDto> getPriceDate(Stock stock,  LocalDate startDate, LocalDate endDate);

    List<DailyStock> findByStockId(Long stockId);

}
