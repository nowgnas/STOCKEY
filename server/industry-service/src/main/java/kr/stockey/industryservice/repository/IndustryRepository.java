package kr.stockey.industryservice.repository;

import com.ssafy.backend.domain.industry.entity.Industry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndustryRepository extends JpaRepository<Industry,Long> {

}
