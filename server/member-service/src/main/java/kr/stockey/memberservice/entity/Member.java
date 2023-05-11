package kr.stockey.memberservice.entity;

import kr.stockey.memberservice.enums.OauthType;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.util.Assert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
@EntityListeners(value = { AuditingEntityListener.class })
public class Member {
    @ToString.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long id;

    @ToString.Include
    @Size(max = 50)
    @NotNull
    @Column(name = "nickname", nullable = false, length = 50)
    private String nickname;

    @ToString.Include
    @Size(max = 2083)
    @Column(name = "image_url", length = 2083)
    private String imageUrl;

    @ToString.Include
    @NotNull
    @Column(name = "oauth_type", nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private OauthType oauthType;

    @ToString.Include
    @NotNull
    @Column(name = "oauth_id", nullable = false)
    private Long oauthId;


    @ToString.Include
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @ToString.Include
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    @Builder(builderClassName = "oAuthBuilder", builderMethodName = "oAuthBuilder")
    public Member(String nickname, Long oAuthId, OauthType oAuthType) {
        Assert.notNull(nickname, "nickname must not be null");
        Assert.notNull(oAuthId, "oAuthId must not be null");
        Assert.notNull(oAuthType, "oAuthType must not be null");

        this.nickname = nickname;
        this.oauthId = oAuthId;
        this.oauthType = oAuthType;
    }


    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}