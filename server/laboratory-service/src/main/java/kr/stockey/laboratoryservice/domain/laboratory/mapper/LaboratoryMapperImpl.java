//package kr.stockey.laboratoryservice.domain.laboratory.mapper;
//
//import kr.stockey.laboratoryservice.domain.keyword.dto.KeywordSearchDto;
//
//import java.util.Map;
//
//public class LaboratoryMapperImpl implements LaboratoryMapper {
//    @Override
//    public KeywordSearchDto mapToDto(Object obj) {
//        if (obj == null)
//            return null;
//
//        Map<String, String> map = (Map<String, String>) obj;
//
//        return KeywordSearchDto.builder()
//                .id(Long.valueOf(map.get("id")))
//                .name(map.get("name"))
//                .build();
//    }
//}
