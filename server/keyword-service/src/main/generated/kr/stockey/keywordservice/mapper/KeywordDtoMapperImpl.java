package kr.stockey.keywordservice.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import kr.stockey.keywordservice.api.response.KeywordDetailResponse;
import kr.stockey.keywordservice.api.response.KeywordResponse;
import kr.stockey.keywordservice.api.response.KeywordSearchResponse;
import kr.stockey.keywordservice.dto.GetKeyPhraseResponse.Message;
import kr.stockey.keywordservice.dto.GetKeyPhraseResponse.News;
import kr.stockey.keywordservice.dto.KeyphraseResponseMessageDto;
import kr.stockey.keywordservice.dto.core.KeywordDto;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-25T16:58:15+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.7 (Azul Systems, Inc.)"
)
@Component
public class KeywordDtoMapperImpl implements KeywordDtoMapper {

    @Override
    public KeywordDetailResponse toKeywordDetailResponse(KeywordDto keywordDto) {
        if ( keywordDto == null ) {
            return null;
        }

        String name = null;
        String description = null;

        name = keywordDto.getName();
        description = keywordDto.getDescription();

        KeywordDetailResponse keywordDetailResponse = new KeywordDetailResponse( name, description );

        return keywordDetailResponse;
    }

    @Override
    public List<KeywordResponse> toKeywordResponse(List<KeywordDto> keywordDto) {
        if ( keywordDto == null ) {
            return null;
        }

        List<KeywordResponse> list = new ArrayList<KeywordResponse>( keywordDto.size() );
        for ( KeywordDto keywordDto1 : keywordDto ) {
            list.add( keywordDtoToKeywordResponse( keywordDto1 ) );
        }

        return list;
    }

    @Override
    public List<KeywordSearchResponse> toKeywordSearchResponse(List<KeywordDto> keywordDto) {
        if ( keywordDto == null ) {
            return null;
        }

        List<KeywordSearchResponse> list = new ArrayList<KeywordSearchResponse>( keywordDto.size() );
        for ( KeywordDto keywordDto1 : keywordDto ) {
            list.add( keywordDtoToKeywordSearchResponse( keywordDto1 ) );
        }

        return list;
    }

    @Override
    public List<KeyphraseResponseMessageDto> toKeyphraseResponseMessageDtoList(List<Message> dto) {
        if ( dto == null ) {
            return null;
        }

        List<KeyphraseResponseMessageDto> list = new ArrayList<KeyphraseResponseMessageDto>( dto.size() );
        for ( Message message : dto ) {
            list.add( messageToKeyphraseResponseMessageDto( message ) );
        }

        return list;
    }

    protected KeywordResponse keywordDtoToKeywordResponse(KeywordDto keywordDto) {
        if ( keywordDto == null ) {
            return null;
        }

        long id = 0L;
        String name = null;
        String description = null;

        id = keywordDto.getId();
        name = keywordDto.getName();
        description = keywordDto.getDescription();

        KeywordResponse keywordResponse = new KeywordResponse( id, name, description );

        return keywordResponse;
    }

    protected KeywordSearchResponse keywordDtoToKeywordSearchResponse(KeywordDto keywordDto) {
        if ( keywordDto == null ) {
            return null;
        }

        Long id = null;
        String name = null;

        id = keywordDto.getId();
        name = keywordDto.getName();

        KeywordSearchResponse keywordSearchResponse = new KeywordSearchResponse( id, name );

        return keywordSearchResponse;
    }

    protected kr.stockey.keywordservice.dto.KeyphraseResponseMessageDto.Message messageToMessage(Message message) {
        if ( message == null ) {
            return null;
        }

        kr.stockey.keywordservice.dto.KeyphraseResponseMessageDto.Message message1 = new kr.stockey.keywordservice.dto.KeyphraseResponseMessageDto.Message();

        message1.setKeyPhrase( message.getKeyPhrase() );
        List<News> list = message.getNews();
        if ( list != null ) {
            message1.setNews( new ArrayList<News>( list ) );
        }

        return message1;
    }

    protected KeyphraseResponseMessageDto messageToKeyphraseResponseMessageDto(Message message) {
        if ( message == null ) {
            return null;
        }

        KeyphraseResponseMessageDto keyphraseResponseMessageDto = new KeyphraseResponseMessageDto();

        keyphraseResponseMessageDto.setMessage( messageToMessage( message ) );

        return keyphraseResponseMessageDto;
    }
}
