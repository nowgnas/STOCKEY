package kr.stockey.keywordservice.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import kr.stockey.keywordservice.dto.core.KeywordDto;
import kr.stockey.keywordservice.dto.core.KeywordDto.KeywordDtoBuilder;
import kr.stockey.keywordservice.entity.Keyword;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-25T16:58:15+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.7 (Azul Systems, Inc.)"
)
@Component
public class KeywordMapperImpl implements KeywordMapper {

    @Override
    public KeywordDto toDto(Keyword keyword) {
        if ( keyword == null ) {
            return null;
        }

        KeywordDtoBuilder keywordDto = KeywordDto.builder();

        if ( keyword.getId() != null ) {
            keywordDto.id( keyword.getId() );
        }
        keywordDto.name( keyword.getName() );
        keywordDto.description( keyword.getDescription() );

        return keywordDto.build();
    }

    @Override
    public List<KeywordDto> toDto(List<Keyword> keywordList) {
        if ( keywordList == null ) {
            return null;
        }

        List<KeywordDto> list = new ArrayList<KeywordDto>( keywordList.size() );
        for ( Keyword keyword : keywordList ) {
            list.add( toDto( keyword ) );
        }

        return list;
    }
}
