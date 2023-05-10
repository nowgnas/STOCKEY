package kr.stockey.investmentservice.repository;

import kr.stockey.investmentservice.entity.Contract;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ContractRepository extends CrudRepository<Contract, Long> {
    List<Contract> findByMemberId(Long memberId);
}
