package com.aloha.cafe_map.domain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CafeDto {
  private Long id;
  private String name;
  private String address;
  private Double lat;
  private Double lng;
  private Float rating;
  private Integer reviewCount;
  private Integer priceLevel;

  // 계산 필드
  private Double distanceM;
  private Boolean openNow;
  private Integer minutesToClose;
  private String[] tags;
  private String coverPhoto;
}
