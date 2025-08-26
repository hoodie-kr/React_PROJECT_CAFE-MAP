package com.aloha.cafe_map.service;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository @RequiredArgsConstructor
public class HoursRepository {
  private final JdbcTemplate jdbc;
  public Map<String,Object> findToday(Long cafeId, int dow) {
    List<Map<String,Object>> list = jdbc.queryForList(
      "SELECT open, close, break_start, break_end FROM hours WHERE cafe_id=? AND day_of_week=?",
      cafeId, dow
    );
    return list.isEmpty() ? null : list.get(0);
  }
}
