package kr.stockey.industryservice.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Entity
@Table(name = "industry")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Industry {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "industry_id", nullable = false)
    private Long id;

    @Size(max = 45)
    @NotNull
    @Column(name = "name", nullable = false, length = 45)
    private String name;

    @Size(max = 500)
    @Column(name = "description", length = 500)
    private String description;

    @Size(max = 45)
    @Column(name = "category", length = 45)
    private String category;

    @Builder
    public Industry(String name, String description, String category) {
        this.name = name;
        this.description = description;
        this.category = category;
    }
}