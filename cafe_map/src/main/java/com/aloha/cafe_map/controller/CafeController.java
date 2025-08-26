package com.aloha.cafe_map.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.cafe_map.domain.CafeDto;
import com.aloha.cafe_map.service.CafeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // React 개발용, 필요 시 유지
public class CafeController {
  private final CafeService cafeService;

  @GetMapping("/cafes/nearby")
  public List<CafeDto> nearby(
      @RequestParam Double lat,
      @RequestParam Double lng,
      @RequestParam(required=false, defaultValue="1500") Integer radius,
      @RequestParam(required=false, defaultValue="distance") String sort,
      @RequestParam(required=false) String q,
      @RequestParam(required=false) String tags,
      @RequestParam(required=false, defaultValue="false") Boolean openNow,
      @RequestParam(required=false, defaultValue="80") Integer limit
  ){
    return cafeService.nearby(lat,lng,radius,sort,q,tags,openNow,limit);
  }
}
