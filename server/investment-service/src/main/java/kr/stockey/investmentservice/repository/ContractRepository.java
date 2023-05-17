package kr.stockey.investmentservice.repository;

import kr.stockey.investmentservice.entity.Contract;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ContractRepository extends CrudRepository<Contract, Long> {
    List<Contract> findByMemberId(Long memberId);

    @Query("SELECT c " +
            "FROM Contract c " +
            "WHERE c.createdAt >= :startTime AND c.createdAt < :endTime " +
            "AND c.category = kr.stockey.investmentservice.enums.InvCategory.ORDER")
    List<Contract> getJustOrders(LocalDateTime startTime, LocalDateTime endTime);

    @Query("SELECT c FROM Contract c " +
            "WHERE c.matchOrderId IN :matchOrderIds " +
            "AND c.createdAt >= :startDate " +
            "AND c.createdAt <= :endDate")
    List<Contract> getContractsByMatchOrderIdsAndDateRange(List<Long> matchOrderIds,
                                                           LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT c FROM Contract c WHERE c.memberId = :memberId AND c.createdAt BETWEEN :startDate AND :endDate")
    List<Contract> findByMemberIdAndCreatedAtBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate);
}
