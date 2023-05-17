package kr.stockey.investmentservice.repository;

import kr.stockey.investmentservice.entity.DailyStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DailyStockRepository extends JpaRepository<DailyStock, Long> {
    List<DailyStock> findByStockDate(LocalDate stockDate);
}
