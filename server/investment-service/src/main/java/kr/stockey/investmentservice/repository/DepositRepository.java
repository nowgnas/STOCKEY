package kr.stockey.investmentservice.repository;

import kr.stockey.investmentservice.entity.Deposit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DepositRepository extends JpaRepository<Deposit, Long> {
    List<Deposit> findByMemberId(Long memberId);
    @Query("SELECT d FROM Deposit d WHERE d.memberId = :memberId " +
            "AND d.createdAt = (SELECT MAX(d2.createdAt) FROM Deposit d2 WHERE d2.memberId = :memberId)")
    Optional<Deposit> findLatestDepositByMemberId(@Param("memberId") Long memberId);

//    List<Deposit> saveAll(List<Deposit> deposits);

}
