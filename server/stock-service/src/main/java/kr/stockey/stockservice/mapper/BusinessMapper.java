package kr.stockey.stockservice.mapper;

import com.ssafy.backend.domain.stock.dto.BusinessDto;
import com.ssafy.backend.domain.stock.entity.Business;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel= "spring")
public interface BusinessMapper {
    List<BusinessDto> toDto(List<Business> businesses);
}
