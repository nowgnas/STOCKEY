package kr.stockey.industryservice.mapper;

import kr.stockey.industryservice.api.response.GetIndustryMarketCapResponse;
import kr.stockey.industryservice.api.response.GetIndustryResponse;
import kr.stockey.industryservice.api.response.IndustryCapitalDto;
import kr.stockey.industryservice.dto.core.IndustryDto;
import kr.stockey.industryservice.dto.IndustryEpochSumDto;
import kr.stockey.industryservice.entity.Industry;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel= "spring")
public interface IndustryDtoMapper {
    IndustryCapitalDto toDto(Industry industry,Long sum);

    List<GetIndustryResponse> toGetResponse(List<IndustryDto> industryDto);
    List<GetIndustryMarketCapResponse> toGetMarketCapResponse(List<IndustryEpochSumDto> industryDto);

}
