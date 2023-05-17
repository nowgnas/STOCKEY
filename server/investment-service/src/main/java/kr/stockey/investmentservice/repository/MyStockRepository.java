package kr.stockey.investmentservice.repository;

import kr.stockey.investmentservice.entity.MyStock;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MyStockRepository extends CrudRepository<MyStock, Long> {
    List<MyStock> findByMemberId(Long memberId);
}
