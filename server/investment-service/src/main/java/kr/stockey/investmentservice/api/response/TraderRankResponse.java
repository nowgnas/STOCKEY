package kr.stockey.investmentservice.api.response;

import kr.stockey.investmentservice.dto.TraderRankDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class TraderRankResponse {
    private List<TraderRankDto> traderRankList;
    private Long myRank;
}
