package com.aloha.cafe_map.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.cafe_map.domain.CafeDto;

@Mapper
public interface CafeMapper {
  List<CafeDto> findNearby(Map<String,Object> params);
  List<Long> findTagIdsByNames(List<String> names);
  List<String> findTagsByCafeId(Long cafeId);
}
