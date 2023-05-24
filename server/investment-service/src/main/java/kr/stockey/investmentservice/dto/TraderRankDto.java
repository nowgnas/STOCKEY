package kr.stockey.investmentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TraderRankDto {
    private String nickName;
    private Long totalAsset;
    private Long ranking;
}
