package kr.stockey.newsservice.service;

import kr.stockey.newsservice.api.request.NewsCountRequest;

public interface NewsService {
    Long getTotalNewsCount(NewsCountRequest request);


}
