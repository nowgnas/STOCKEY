# Create your views here.
import time
from datetime import datetime

import numpy as np
import pandas as pd
from keybert import KeyBERT
from kiwipiepy import Kiwi
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sklearn.cluster import DBSCAN
from sklearn.feature_extraction.text import TfidfVectorizer
from tqdm import tqdm
# from konlpy.tag import Okt

from .models import News, Industry, Stock

kiwi = Kiwi()
kw_model = KeyBERT("paraphrase-multilingual-MiniLM-L12-v2")
# kw_model = KeyBERT("skt/kobert-base-v1")
tfidf_vectorizer = TfidfVectorizer(min_df=5, ngram_range=(1, 5))


#
# okt = Okt()
@api_view()
def get_cluster_by_keyword(request, keywordId):
    id = request.GET["id"]
    type = request.GET['type']
    start_date = request.GET['start_date']
    start_date = datetime.strptime(start_date, '%y%m%d').date()
    end_date = request.GET['end_date']
    end_date = datetime.strptime(end_date, '%y%m%d').date()
    start = time.time()
    print(type, id, start_date, end_date, keywordId)

    if type == 'STOCK':
        qs = News.objects.filter(
            pressed_at__range=[start_date, end_date],
            newsrelation__keyword_id=keywordId,
            newsrelation__stock_id=id
        ).values(
            "title", "news_url", "pressed_at"
        )


        name = Stock.objects.get(stock_id = id).name

    elif type == 'INDUSTRY':
        industry_id = -1
        qs = News.objects.filter(
            pressed_at__range=[start_date, end_date],
            newsrelation__keyword_id=keywordId,
            newsrelation__industry_id=id,
        ).values(
            "title", "news_url", "pressed_at"
        )

        name  = Industry.objects.get(industry_id=id).name



        # select 쿼리
    else:
        qs = News.objects.filter(
            pressed_at__range=[start_date, end_date],
            newsrelation__keyword_id=keywordId,
            newsrelation__news_type='ECONOMY'
        ).values(
            "title", "news_url", "pressed_at"
        )
        name = ''

    df = pd.DataFrame.from_records(qs)
    # 데이터 프레임 전처리
    ## news url이 중복된 데이터 지우기
    print(rf'#1. 중복 제거 전 shape = {df.shape}')
    duplicates = df['news_url'].duplicated()
    print("중복 df start")
    print(duplicates)
    print("중복 df end")
    df = df[~duplicates]

    df = df.reset_index(drop=True)
    print(rf'#2. url 중복 제거 후 shape = {df.shape}')

    # print("#1")
    # whole_df['date'] = pd.to_datetime(whole_df['date'])

    ## news title이 중복된 데이터 지우기
    duplicates = df['title'].duplicated()
    print("중복 df start")
    print(duplicates)
    print("중복 df end")
    df = df[~duplicates]
    df = df.reset_index(drop=True)

    print(rf'#3. title 중복 제거 후 shape = {df.shape}')

    duplicates = df['title'].duplicated()
    if duplicates.all():
        print("news url 중복 존재")

    result = clustering(df,name)
    end = time.time()
    print('걸린시간 : ', end - start)
    return Response({"messages": result}, status=200)


@api_view()
def get_cluster_by_domain(request):
    id = request.GET["id"]
    type = request.GET['type']
    start_date = request.GET['start_date']
    start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
    end_date = request.GET['end_date']
    end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
    keyword_id = request.GET['keyword_id']
    start = time.time()
    print(type, id, start_date, end_date, keyword_id)

    if type == 'STOCK':
        qs = News.objects.filter(
            pressed_at__range=[start_date, end_date],
            newsrelation__stock_id=id
        ).values(
            "title", "news_url", "pressed_at"
        )

    elif type == 'INDUSTRY':
        qs = News.objects.filter(
            pressed_at__range=[start_date, end_date],
            newsrelation__industry_id=id
        ).values(
            "title", "news_url", "pressed_at"
        )
    else:
        qs = News.objects.filter(
            pressed_at__range=[start_date, end_date],
            newsrelation__news_type='ECONOMY'
        ).values(
            "title", "news_url", "pressed_at"
        )
    df = pd.DataFrame.from_records(qs)
    df.drop_duplicates(['news_url'], inplace=True)
    print(qs.count())
    result = clustering(df)
    end = time.time()
    print('걸린시간 : ', end - start)
    return Response({"messages": result}, status=200)


def clustering(df,name):
    # okt = Okt()  # 형태소 분석기 객체 생성
    noun_list = []
    contents = df['title']
    for content in tqdm(contents):
        # nouns = okt.nouns(content)  # 명사만 추출하기, 결과값은 명사 리스트
        nouns = noun_extractor(content)
        noun_list.append(nouns)
    # print("명사 추출 완료")
    df['nouns'] = noun_list
    text = [" ".join(noun) for noun in df['nouns']]
    # 1 tf-idf 임베딩(+Normalize)

    tfidf_vectorizer.fit(text)
    vector = tfidf_vectorizer.transform(text).toarray()
    vector = np.array(vector)

    # print("tf-idf 완료" )
    # 2 DBSCAN Clustering

    # eps이 낮을수록, min_samples 값이 높을수록 군집으로 판단하는 기준이 까다로움.
    vector = np.array(vector)  # Normalizer를 이용해 변환된 벡터
    model = DBSCAN(eps=0.3, min_samples=1, metric="cosine")
    # 거리 계산 식으로는 Cosine distance를 이용
    result = model.fit_predict(vector)
    df['result'] = result

    print("DBSCAN 완료")
    print('Row count is:', df.shape[0])
    print('군집개수 :', result.max())
    # train_extract

    clustered_list = []
    print("시작")
    for cluster_num in set(result):
        # -1,0은 노이즈 판별이 났거나 클러스터링이 안된 경우
        if (cluster_num == -1 or cluster_num == 0):
            continue
        else:
            temp_df = df[df['result'] == cluster_num]  # cluster num 별로 조회
            clustered_list.append(temp_df[['title', 'news_url', 'pressed_at']])

    clustered_list = sorted(clustered_list, key=lambda x: len(x), reverse=True)
    keyphrase_target_list = clustered_list[:4]

    result = []
    for key_phrase_target in keyphrase_target_list:
        dict = {}
        title_list = key_phrase_target['title'].tolist()
        phrase = get_phraze(title_list,name)
        dict['key_phrase'] = phrase
        news_list = []
        for title, url, date in zip(key_phrase_target['title'], key_phrase_target['news_url'],
                                    key_phrase_target['pressed_at']):
            news_dict = {}
            news_dict['title'] = title
            news_dict['url'] = url
            news_dict['date'] = date
            news_list.append(news_dict)
        dict['news'] = news_list
        result.append(dict)
    return result


def noun_extractor(text):
    results = []
    result = kiwi.analyze(text)
    for token, pos, _, _ in result[0][0]:
        if len(token) != 1 and pos.startswith('N') or pos.startswith('SL'):
            results.append(token)
    return results


def get_phraze(title_list,name):
    # 명사 추출 함수
    # 모델 설정

    # 불용어 설정
    stop_words = ['kbs', '뉴스', '기자', '속보', '뉴스1', 'mbc', 'sbs', '뉴스데스크', '일보', '올해', '오늘', '내일', '어제', '내년', '하루', '이틀',
                  '사흘', '모레', '작년', '당시', '개월', '코스피', '기업', '한국', '정부', '사업', '경제', '증시', '서울', '코스닥', '가격', '기술',
                  '증권', '개발', '회장', '아파트', '공장', '판매', '안전', '장관', '업계', '최대', '뉴욕', '전년', '고객', '분기', '마켓', '도시', '영업',
                  '코리아', '그룹', '회의', '점검', '상반기', '대표', '세대', '주간', '세계', '센터', '선정', 'etf', '속도', '증권사', '주가', '추석',
                  '기관', '직원', '외인', '스텝', '평균', '주년', '목표', '거래일', '이유', '캠페인', '시작', '자산', '국제', '마감', '문화', '시간',
                  '천억', '신청', '추가', '출발', '주요', '종목', '절반', '특징', 'vs', '계획', '발언', '지난해', '비용', '인증', '연말', '예산', '회사',
                  '모집', '인터뷰', '오전', '신문', '우리', '시대', '행진', '예측', '기록', '충전', '전국', '나스닥', '혜택', '모델', '정보', '결제',
                  '장비', '지급', '취업', '개인', '가치', '진단', '이전', '솔루션', '소통', '오후', '상품', '세상', '사진', '초반', '시설', '예약',
                  '스토어', '기차', '이달', '어디', '누구', '위원회', '다음', '제한', '3사', '관리', '첫날', '일정', '계열사', '협력사', '내달', '김주현',
                  '선택', '예상', '대응', '지주', '이후', '등록', '홀딩스', '주말', '헤드라인', '후퇴', 'spc', '창원', '체계', '보고서', '역사', '인천공항',
                  '패키지', '박스', '정상', '강남', 'bnk', '표준', '진행', '은행장', '경험', '필요', '타이어', '마이', '컴퍼니', '초청', '충남', '화성',
                  '하늘', '레드', '김대호', '날개', '주민', '도로', '스튜디오', '컨퍼런스', '서울대', '파크', '믹스', 'ftx', '대화', '분석', '블루', '바다',
                  '목소리', '실시', '새벽', '연속', '본격', '시험', '지난달', '리포트', '사전', '후보자', '시티', '활용', '이상', '농식품부', '카톡', '월급',
                  '메뉴', '재송', '정원', '순위', '참석', '생명', 'dd', '조직', '국민', '접종', '사용', '재계', '타운', '지분', '공원', 'kg', '중심',
                  '인사말', '사설', '체크', '케어', '라이브', '플러스', 'fn', '직장인', '비율', '리더십', '바람', '컨설팅', '변경', '본부', '닷컴', '출연',
                  '클래스', '근무', '업무', '전면', '전통', '연내', '최종', '용품', '리더', '의무', '비즈니스', '균형', '개시', '자동', '향후', '데이',
                  '대비', '집단', '이제', '대신', '수준', '단지', '계속', '구역', '사실', '저장', '테스트', '김동관', '이번', '처음', '예고', '확인',
                  '기간', '이하', '여부', '선언', '흐름', '나흘', '이것', '이어', '나라', '아래', '여기', '제외', '지금', '월요일', '기기', '칼럼', '대체',
                  '언제', '이동', '언제쯤'
                  ]

    word = ''
    for c in name:
        word += c
        stop_words.append(word)

    # 키워드 추출 함수
    def keyword_extractor(content):
        content_nouns = ' '.join(noun_extractor(content))
        keywords = kw_model.extract_keywords(content_nouns, keyphrase_ngram_range=(1, 2), top_n=3, use_mmr=True,
                                             stop_words=stop_words)
        return keywords

    import re
    def text_cleaner(text):
        pattern = r"\[.*?\]"
        new_str = re.sub(pattern, "", text)

        pattern_punctuation = re.compile(r'[^\w\s]')
        return pattern_punctuation.sub('', new_str).replace('\n', ' ')

    # =============================================================================================#
    # article 읽어오기
    start = time.time()
    save = []

    # 모든 기사마다
    print(title_list)
    content_nouns = ' '.join(title_list)

    text = text_cleaner(content_nouns)  # 공백 및 특수문자 제거
    keywords = keyword_extractor(text)  # 키워드 추출
    print(keywords)
    if len(keywords) >= 3:
        rst = [keywords[0][0], keywords[0][1], keywords[1][0], keywords[1][1], keywords[2][0], keywords[2][1]]
        save.append(rst)
        print(f"{time.time() - start:.4f} sec")
        return keywords[0][0]
