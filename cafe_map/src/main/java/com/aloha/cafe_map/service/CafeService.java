package com.aloha.cafe_map.service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.aloha.cafe_map.domain.CafeDto;
import com.aloha.cafe_map.mapper.CafeMapper;

import lombok.RequiredArgsConstructor;

@Service @RequiredArgsConstructor
public class CafeService {
  private final CafeMapper cafeMapper;
  private final HoursRepository hoursRepo;

  public List<CafeDto> nearby(Double lat, Double lng, Integer radius, String sort,
                              String q, String tags, Boolean openNow, Integer limit) {
    List<Long> tagIds = null; int tagCount = 0;
    if (tags != null && !tags.isBlank()) {
      var names = Arrays.stream(tags.split(",")).map(String::trim).toList();
      tagIds = cafeMapper.findTagIdsByNames(names);
      tagCount = names.size();
    }
    Map<String,Object> p = new HashMap<>();
    p.put("lat", lat); p.put("lng", lng); p.put("radius", radius);
    p.put("sort", sort); p.put("q", q);
    p.put("tagIds", tagIds); p.put("tagCount", tagCount);
    p.put("limit", (limit==null||limit<=0)?80:limit);

    var list = cafeMapper.findNearby(p);

    int dow = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).getDayOfWeek().getValue() % 7; // Sun=0
    for (var c : list) {
      c.setTags(cafeMapper.findTagsByCafeId(c.getId()).toArray(String[]::new));
      if (Boolean.TRUE.equals(openNow)) {
        var hi = hoursRepo.findToday(c.getId(), dow);
        c.setOpenNow(HoursUtils.isOpenNow(hi));
        c.setMinutesToClose(HoursUtils.minutesToClose(hi));
      }
    }
    return list;
  }
}
