package kr.stockey.industryservice.mapper;

import com.ssafy.backend.domain.industry.dto.IndustryDto;
import com.ssafy.backend.domain.industry.entity.Industry;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel= "spring")
public interface IndustryMapper {
    Industry toIndustry(IndustryDto industryDto);
    IndustryDto toDto(Industry industry);
    List<IndustryDto> toDto(List<Industry> industryList);

}
