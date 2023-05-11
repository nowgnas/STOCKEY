package kr.stockey.investmentservice.tmp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "keywords")
public class Keyword {
    @Id
    @Column(name = "keywords_id", nullable = false)
    private Long id;

    @Size(max = 200)
    @Column(name = "name", length = 200)
    private String name;

    @Lob
    @Column(name = "description")
    private String description;

}