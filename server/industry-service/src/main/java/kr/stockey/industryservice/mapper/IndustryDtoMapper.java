package kr.stockey.industryservice.mapper;

import com.ssafy.backend.domain.industry.api.response.GetIndustryMarketCapResponse;
import com.ssafy.backend.domain.industry.api.response.GetIndustryResponse;
import com.ssafy.backend.domain.industry.api.response.IndustryCapitalDto;
import com.ssafy.backend.domain.industry.dto.IndustryDto;
import com.ssafy.backend.domain.industry.dto.IndustryEpochSumDto;
import com.ssafy.backend.domain.industry.entity.Industry;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel= "spring")
public interface IndustryDtoMapper {
    IndustryCapitalDto toDto(Industry industry,Long sum);

    List<GetIndustryResponse> toGetResponse(List<IndustryDto> industryDto);
    List<GetIndustryMarketCapResponse> toGetMarketCapResponse(List<IndustryEpochSumDto> industryDto);

}
