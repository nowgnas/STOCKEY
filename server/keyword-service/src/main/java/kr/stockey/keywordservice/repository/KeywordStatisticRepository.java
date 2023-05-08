package kr.stockey.keywordservice.repository;

import kr.stockey.keywordservice.dto.KeywordStatisticDto;
import kr.stockey.keywordservice.entity.KeywordStatistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KeywordStatisticRepository extends JpaRepository<KeywordStatistic, Long> {
    @Query("SELECT ks.statisticDate as statisticDate, ks.count as count " +
            "FROM KeywordStatistic ks " +
            "WHERE ks.category = 'FREQ' AND ks.keyword.id = :keywordId")
    List<KeywordStatisticDto> findFreqStatisticsByKeywordId(@Param("keywordId") Long keywordId);


}
