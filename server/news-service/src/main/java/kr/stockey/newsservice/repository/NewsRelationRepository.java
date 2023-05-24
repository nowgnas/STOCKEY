package kr.stockey.newsservice.repository;

import kr.stockey.newsservice.dto.TopKeywordCountDto;
import kr.stockey.newsservice.entity.NewsRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;

public interface NewsRelationRepository extends JpaRepository<NewsRelation, Long> {


    @Query("SELECT nr.keywordId as keywordId, COUNT(nr.keywordId) as keywordCount " +
            "FROM NewsRelation nr " +
            "JOIN nr.news n " +
            "WHERE nr.newsType = 'ECONOMY' " +
            "AND n.pressedAt BETWEEN :startDate AND :endDate " +
            "GROUP BY nr.keywordId " +
            "ORDER BY COUNT(DISTINCT nr.news.id) DESC, nr.keywordId ASC")
    List<TopKeywordCountDto> getTopNKeywordsForEconomy(LocalDate startDate, LocalDate endDate, Pageable topN);

    @Query("SELECT nr.keywordId as keywordId, COUNT(nr.keywordId) as keywordCount " +
            "FROM NewsRelation nr " +
            "JOIN nr.news n " +
            "WHERE nr.newsType = 'INDUSTRY' " +
            "AND nr.industryId = :domainId " +
            "AND n.pressedAt BETWEEN :startDate AND :endDate " +
            "GROUP BY nr.keywordId " +
            "ORDER BY COUNT(DISTINCT nr.news.id) DESC, nr.keywordId ASC")
    List<TopKeywordCountDto> getTopNKeywordsForIndustry(LocalDate startDate, LocalDate endDate, Pageable topN, Long domainId);

    @Query("SELECT nr.keywordId as keywordId, COUNT(nr.keywordId) as keywordCount " +
            "FROM NewsRelation nr " +
            "JOIN nr.news n " +
            "WHERE nr.newsType = 'STOCK' " +
            "AND nr.stockId = :domainId " +
            "AND n.pressedAt BETWEEN :startDate AND :endDate " +
            "GROUP BY nr.keywordId " +
            "ORDER BY COUNT(DISTINCT nr.news.id) DESC, nr.keywordId ASC")
    List<TopKeywordCountDto> getTopNKeywordsForStock(LocalDate startDate, LocalDate endDate, Pageable topN, Long domainId);

    @Query("SELECT COUNT(n.id) " +
            "FROM NewsRelation nr " +
            "JOIN nr.news n " +
            "WHERE nr.newsType = 'ECONOMY' " +
            "AND n.pressedAt BETWEEN :startDate AND :endDate ")
    Long getTotalNewsCountForEconomy(LocalDate startDate, LocalDate endDate);

    @Query("SELECT COUNT(n.id) " +
            "FROM NewsRelation nr " +
            "JOIN nr.news n " +
            "WHERE nr.newsType = 'INDUSTRY' " +
            "AND nr.industryId = :domainId " +
            "AND n.pressedAt BETWEEN :startDate AND :endDate ")
    Long getTotalNewsCountForIndustry(LocalDate startDate, LocalDate endDate, Long domainId);

    @Query("SELECT COUNT(n.id) " +
            "FROM NewsRelation nr " +
            "JOIN nr.news n " +
            "WHERE nr.newsType = 'STOCK' " +
            "AND nr.stockId = :domainId " +
            "AND n.pressedAt BETWEEN :startDate AND :endDate ")
    Long getTotalNewsCountForStock(LocalDate startDate, LocalDate endDate, Long domainId);
}
