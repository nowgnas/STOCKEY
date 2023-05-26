package kr.stockey.keywordservice.kafka.consumer;

import kr.stockey.keywordservice.api.request.GetKeyphraseRequest;
import kr.stockey.keywordservice.dto.GetKeyPhraseResponse;
import kr.stockey.keywordservice.dto.KeyphraseRequestDto;
import kr.stockey.keywordservice.dto.KeyphraseResponseMessageDto;
import kr.stockey.keywordservice.exception.keyword.KeywordException;
import kr.stockey.keywordservice.exception.keyword.KeywordExceptionType;
import kr.stockey.keywordservice.mapper.KeywordDtoMapper;
import kr.stockey.keywordservice.redis.KeyphraseResult;
import kr.stockey.keywordservice.redis.KeyphraseResultRepository;
import kr.stockey.keywordservice.utils.RoundRobinUrlGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.KafkaException;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.security.KeyException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Component
@RequiredArgsConstructor
@Slf4j
public class KeyphraseRequestListener {
    private final RoundRobinUrlGenerator roundRobinUrlGenerator;
    private final KeywordDtoMapper keywordDtoMapper;
    private final KeyphraseResultRepository keyphraseResultRepository;

    @KafkaListener(topics = "keyphrase-request", groupId = "keyphrase-consumer", containerFactory = "kafkaListenerContainerFactory1")
    public void receive1(KeyphraseRequestDto keyphraseRequestDto) {
        Long memberId = keyphraseRequestDto.getMemberId();
        Long keywordId = keyphraseRequestDto.getKeywordsId();
        GetKeyphraseRequest getKeyphraseRequest = keyphraseRequestDto.getGetKeyphraseRequest();

        String nextUrl = roundRobinUrlGenerator.getNextUrl();
        log.info("Running consumer ... ");
        log.info("url: " + nextUrl);

        LocalDate startDate = getKeyphraseRequest.getStartDate();
        LocalDate endDate = getKeyphraseRequest.getEndDate();
        Long id = getKeyphraseRequest.getId();
        String newsType = getKeyphraseRequest.getNewsType();
        // LocalDate => String 형식으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
        String startDateString = startDate.format(formatter);
        String endDateString = endDate.format(formatter);

        // SpringBoot -> DjangoServer 데이터 요청
        RestTemplate restTemplate = new RestTemplate();
        String url = nextUrl + "/keywords/{keywordId}/keyphrase?";
        String queryUrl = UriComponentsBuilder.fromUriString(url)
                .queryParam("type", newsType)
                .queryParam("id", id)
                .queryParam("start_date", startDateString)
                .queryParam("end_date", endDateString)
                .buildAndExpand(keywordId)
                .toUriString();
        ResponseEntity<GetKeyPhraseResponse> response = restTemplate.exchange(queryUrl, HttpMethod.GET, null, new ParameterizedTypeReference<GetKeyPhraseResponse>() {
        });

        GetKeyPhraseResponse responseBody = response.getBody();
        if (responseBody.getMessages() != null) {
            List<KeyphraseResponseMessageDto> messageDtoList
                    = keywordDtoMapper.toKeyphraseResponseMessageDtoList(responseBody.getMessages());
            KeyphraseResult keyphraseResult = new KeyphraseResult(memberId, messageDtoList);
            keyphraseResultRepository.save(keyphraseResult);
        } else {
            KeyphraseResult keyphraseResult = new KeyphraseResult(memberId, null);
            keyphraseResultRepository.save(keyphraseResult);
        }
    }
}
