package kr.stockey.stockservice.repository;

import kr.stockey.stockservice.dto.PriceDateDto;
import kr.stockey.stockservice.entity.DailyStock;
import kr.stockey.stockservice.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyStockRepository extends JpaRepository<DailyStock, Long> {

    @Query(value = "SELECT * FROM daily_stock WHERE stock_id = :stockId ORDER BY stock_date DESC LIMIT 1", nativeQuery = true)
    Optional<DailyStock> findTodayDailyStock(@Param("stockId") Long stockId);


    @Query("SELECT ds.stockDate as stockDate,ds.closePrice as closePrice" +
            " FROM DailyStock  ds" +
            " WHERE ds.stock = :stock" +
            " AND ds.stockDate BETWEEN :startDate and :endDate")
    List<PriceDateDto> getPriceDate(@Param("stock") Stock stock,
                                   @Param("startDate") LocalDate startDate,
                                   @Param("endDate") LocalDate endDate);

    List<DailyStock> findByStockId(@Param("stockId") Long stockId);


}
