package kr.stockey.newsservice.entity;

import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Entity
@Table(name = "news")
public class News {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id", nullable = false)
    private Long id;

    @Size(max = 100)
    @Column(name = "hdfs_id", length = 100)
    private String hdfsId;

    @Size(max = 2083)
    @Column(name = "news_url", length = 2083)
    private String newsUrl;

    @Column(name = "pressed_at")
    private LocalDate pressedAt;

    @Lob
    @Column(name = "title")
    private String title;

    @Size(max = 45)
    @Column(name = "category", length = 45)
    private String category;

}