package kr.stockey.keywordservice.repository;

import kr.stockey.keywordservice.dto.KeywordStatisticDto;
import kr.stockey.keywordservice.entity.KeywordStatistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface KeywordStatisticRepository extends JpaRepository<KeywordStatistic, Long> {
    @Query("SELECT ks.statisticDate as statisticDate, ks.count as count " +
            "FROM KeywordStatistic ks " +
            "WHERE ks.category = 'FREQ' AND ks.keyword.id = :keywordId")
    List<KeywordStatisticDto> findFreqStatisticsByKeywordId(@Param("keywordId") Long keywordId);



    @Query("SELECT ks.statisticDate as statisticDate, ks.count as count " +
            " FROM KeywordStatistic ks " +
            " WHERE ks.category = 'FREQ' AND ks.keyword.id = :keywordId " +
            " AND ks.statisticDate between :startDate and :endDate")
    List<KeywordStatisticDto> getCountDate(@Param("keywordId") Long keywordId,
                                           @Param("startDate") LocalDate startDate,
                                           @Param("endDate") LocalDate endDate);



}
