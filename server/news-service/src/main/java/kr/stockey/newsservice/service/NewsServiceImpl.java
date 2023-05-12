package kr.stockey.newsservice.service;


import kr.stockey.newsservice.api.request.NewsCountRequest;
import kr.stockey.newsservice.repository.NewsRelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {
    private final NewsRelationRepository newsRelationRepository;


    // TODO JOIN 구현

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
