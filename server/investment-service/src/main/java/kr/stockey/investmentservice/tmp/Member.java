package kr.stockey.investmentservice.tmp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "member")
public class Member {
    @Id
    @Column(name = "member_id", nullable = false)
    private Long id;

    @Size(max = 50)
    @NotNull
    @Column(name = "nickname", nullable = false, length = 50)
    private String nickname;

    @Size(max = 2083)
    @Column(name = "image_url", length = 2083)
    private String imageUrl;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @NotNull
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @Size(max = 50)
    @NotNull
    @Column(name = "oauth_type", nullable = false, length = 50)
    private String oauthType;

    @NotNull
    @Column(name = "oauth_id", nullable = false)
    private Long oauthId;

}