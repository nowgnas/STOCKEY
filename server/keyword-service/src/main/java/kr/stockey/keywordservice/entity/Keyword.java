package kr.stockey.keywordservice.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Entity
@Table(name = "keyword_v2")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Keyword {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keyword_id", nullable = false)
    private Long id;

    @Size(max = 200)
    @NotNull
    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Lob
    @Column(name = "description")
    private String description;

    @Builder
    public Keyword(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}