package kr.stockey.keywordservice.repository;

import kr.stockey.keywordservice.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {


    List<Keyword> findTop10ByNameStartingWith(String name);


}
