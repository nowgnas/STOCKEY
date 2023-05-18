package kr.stockey.investmentservice.repository;

import kr.stockey.investmentservice.entity.Contract;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ContractRepository extends CrudRepository<Contract, Long> {
    List<Contract> findByMemberId(Long memberId);

    @Query("SELECT c FROM Contract c WHERE c.memberId = :memberId AND c.createdAt BETWEEN :startDate AND :endDate")
    List<Contract> findByMemberIdAndCreatedAtBetween(@Param("memberId") Long memberId,
                                                     @Param("startDate") LocalDateTime startDate,
                                                     @Param("endDate") LocalDateTime endDate);
}
