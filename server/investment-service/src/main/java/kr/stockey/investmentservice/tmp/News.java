package kr.stockey.investmentservice.tmp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "news")
public class News {
    @Id
    @Column(name = "news_url_id", nullable = false)
    private Long id;

    @Size(max = 100)
    @Column(name = "hdfs_id", length = 100)
    private String hdfsId;

    @Size(max = 2083)
    @Column(name = "news_url", length = 2083)
    private String newsUrl;

    @Column(name = "pressed_at")
    private Instant pressedAt;

    @Lob
    @Column(name = "title")
    private String title;

}