package kr.stockey.newsservice.repository;

import kr.stockey.newsservice.entity.NewsRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface NewsRelationRepository extends JpaRepository<NewsRelation, Long> {

//    @Query("SELECT nr.keyword.id as keywordId, COUNT(nr.keyword.id) as keywordCount, nr.keyword.name as keywordName " +
//            "FROM NewsRelation nr " +
//            "JOIN nr.news n " +
//            "JOIN nr.keyword k " +
//            "WHERE nr.newsType = 'ECONOMY' " +
//            "AND n.pressedAt BETWEEN :startDate AND :endDate " +
//            "GROUP BY nr.keyword.id " +
//            "ORDER BY COUNT(DISTINCT nr.news.id) DESC, nr.keyword.id ASC")
//    List<TopKeywordDto> getTopNKeywordsForEconomy(LocalDate startDate, LocalDate endDate, Pageable topN);
//
//    @Query("SELECT nr.keyword.id as keywordId, COUNT(nr.keyword.id) as keywordCount, nr.keyword.name as keywordName " +
//            "FROM NewsRelation nr " +
//            "JOIN nr.news n " +
//            "JOIN nr.keyword k " +
//            "WHERE nr.newsType = 'INDUSTRY' " +
//            "AND nr.industry.id = :domainId " +
//            "AND n.pressedAt BETWEEN :startDate AND :endDate " +
//            "GROUP BY nr.keyword.id " +
//            "ORDER BY COUNT(DISTINCT nr.news.id) DESC, nr.keyword.id ASC")
//    List<TopKeywordDto> getTopNKeywordsForIndustry(LocalDate startDate, LocalDate endDate, Pageable topN, Long domainId);
//
//    @Query("SELECT nr.keyword.id as keywordId, COUNT(nr.keyword.id) as keywordCount, nr.keyword.name as keywordName " +
//            "FROM NewsRelation nr " +
//            "JOIN nr.news n " +
//            "JOIN nr.keyword k " +
//            "WHERE nr.newsType = 'STOCK' " +
//            "AND nr.stock.id = :domainId " +
//            "AND n.pressedAt BETWEEN :startDate AND :endDate " +
//            "GROUP BY nr.keyword.id " +
//            "ORDER BY COUNT(DISTINCT nr.news.id) DESC, nr.keyword.id ASC")
//    List<TopKeywordDto> getTopNKeywordsForStock(LocalDate startDate, LocalDate endDate, Pageable topN, Long domainId);

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
