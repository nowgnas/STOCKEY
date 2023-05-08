package kr.stockey.keywordservice.repository;

import kr.stockey.keywordservice.dto.StockKeywordDto;
import kr.stockey.keywordservice.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {

    @Query(value = "SELECT\n" +
            "        k.keyword_id id,\n" +
            "        k.name name,\n" +
            "        b.count count,\n" +
            "        (SELECT count(*) FROM news_relation WHERE stock_id = :stockId GROUP BY news_id) AS total\n" +
            "    FROM\n" +
            "        keyword k \n" +
            "    JOIN\n" +
            "        (\n" +
            "            SELECT\n" +
            "                keyword_id,\n" +
            "                count(*) as count\n" +
            "            FROM\n" +
            "                news_relation \n" +
            "            WHERE\n" +
            "                stock_id = :stockId \n" +
            "            GROUP BY\n" +
            "                keyword_id \n" +
            "            ORDER BY\n" +
            "                count DESC LIMIT 6\n" +
            "        ) as b \n" +
            "            ON k.keyword_id = b.keyword_id \n" +
            "    ORDER BY\n" +
            "        count DESC;",nativeQuery = true)
    List<StockKeywordDto> findStockKeywords(Long stockId);

    List<Keyword> findTop10ByNameStartingWith(String name);
}
