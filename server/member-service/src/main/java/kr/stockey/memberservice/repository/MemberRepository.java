package kr.stockey.memberservice.repository;

import kr.stockey.memberservice.entity.Member;
import kr.stockey.memberservice.enums.OauthType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByOauthIdAndOauthType(Long oauthId, OauthType oauthType);
    Optional<Member> findByNickname(String nickName);

}
