package kr.stockey.stockservice.mapper;

import kr.stockey.stockservice.dto.core.BusinessDto;
import kr.stockey.stockservice.entity.Business;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel= "spring")
public interface BusinessMapper {
    List<BusinessDto> toDto(List<Business> businesses);
}
