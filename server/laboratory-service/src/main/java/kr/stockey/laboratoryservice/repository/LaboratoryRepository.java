package kr.stockey.laboratoryservice.repository;

import kr.stockey.laboratoryservice.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LaboratoryRepository extends JpaRepository<Stock, Long> {
    /**
     * 이름으로 시작하는 주식 종목 검색
     *
     * @param name 입력된 종목
     * @return 입력된 이름으로 시작되는 모든 주식 종목 리스트
     */
    @Query("select s from Stock s where s.name like :name%")
    List<Stock> searchByName(String name);
}
