package kr.stockey.stockservice.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import kr.stockey.stockservice.dto.core.BusinessDto;
import kr.stockey.stockservice.dto.core.BusinessDto.BusinessDtoBuilder;
import kr.stockey.stockservice.entity.Business;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-15T14:07:00+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Amazon.com Inc.)"
)
@Component
public class BusinessMapperImpl implements BusinessMapper {

    @Override
    public List<BusinessDto> toDto(List<Business> businesses) {
        if ( businesses == null ) {
            return null;
        }

        List<BusinessDto> list = new ArrayList<BusinessDto>( businesses.size() );
        for ( Business business : businesses ) {
            list.add( businessToBusinessDto( business ) );
        }

        return list;
    }

    protected BusinessDto businessToBusinessDto(Business business) {
        if ( business == null ) {
            return null;
        }

        BusinessDtoBuilder businessDto = BusinessDto.builder();

        businessDto.id( business.getId() );
        businessDto.name( business.getName() );
        businessDto.description( business.getDescription() );

        return businessDto.build();
    }
}
