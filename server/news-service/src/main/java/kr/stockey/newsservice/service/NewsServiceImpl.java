package kr.stockey.newsservice.service;


import kr.stockey.newsservice.api.request.NewsCountRequest;
import kr.stockey.newsservice.dto.GetTopNKeywordRequest;
import kr.stockey.newsservice.dto.TopKeywordCountDto;
import kr.stockey.newsservice.repository.NewsRelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {
    private final NewsRelationRepository newsRelationRepository;


    @Override
    public List<TopKeywordCountDto> getTopNKeywordsForEconomy(GetTopNKeywordRequest request) {
        Pageable topN = PageRequest.of(0, request.getTopN());
        String newsType = request.getNewsType();
        Long domainId = request.getId();
        LocalDate startDate = request.getStartDate();
        LocalDate endDate = request.getEndDate();

        List<TopKeywordCountDto> topKeywordCount = new ArrayList<>();

        switch (newsType) {
            case "ECONOMY":
                topKeywordCount = newsRelationRepository.getTopNKeywordsForEconomy(startDate, endDate, topN);
                break;
            case "INDUSTRY":
                topKeywordCount = newsRelationRepository.getTopNKeywordsForIndustry(startDate, endDate, topN, domainId);
                break;
            case "STOCK":
                topKeywordCount = newsRelationRepository.getTopNKeywordsForStock(startDate, endDate, topN, domainId);
                break;
            default:
                break;
        }
        return topKeywordCount;
    }

    public Long getTotalNewsCount(NewsCountRequest request) {
        String newsType = request.getNewsType();
        Long domainId = request.getId();
        LocalDate startDate = request.getStartDate();
        LocalDate endDate = request.getEndDate();

        Long totalNewsCount = 0L;
        switch (newsType) {
            case "ECONOMY":
                totalNewsCount = newsRelationRepository.getTotalNewsCountForEconomy(startDate, endDate);
                break;
            case "INDUSTRY":
                totalNewsCount = newsRelationRepository.getTotalNewsCountForIndustry(startDate, endDate, domainId);
                break;
            case "STOCK":
                totalNewsCount = newsRelationRepository.getTotalNewsCountForStock(startDate, endDate, domainId);
                break;
            default:
                break;
        }

        return totalNewsCount;
    }
}
