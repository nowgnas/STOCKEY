package kr.stockey.industryservice.mapper;

import kr.stockey.industryservice.dto.core.IndustryDto;
import kr.stockey.industryservice.entity.Industry;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel= "spring")
public interface IndustryMapper {
    Industry toIndustry(IndustryDto industryDto);
    IndustryDto toDto(Industry industry);
    List<IndustryDto> toDto(List<Industry> industryList);

}
