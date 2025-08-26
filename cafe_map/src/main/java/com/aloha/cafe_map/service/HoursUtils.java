package com.aloha.cafe_map.service;

import java.time.Duration;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Map;

public class HoursUtils {
  public static boolean isOpenNow(Map<String,Object> hi) {
    if (hi == null) return false;
    LocalTime now = LocalTime.now(ZoneId.of("Asia/Seoul"));
    LocalTime open = toTime(hi.get("open"));
    LocalTime close = toTime(hi.get("close"));
    LocalTime bs = toTime(hi.get("break_start"));
    LocalTime be = toTime(hi.get("break_end"));
    boolean inOpen = within(now, open, close);
    boolean inBreak = (bs != null && be != null) && within(now, bs, be);
    return inOpen && !inBreak;
  }
  public static Integer minutesToClose(Map<String,Object> hi) {
    if (hi == null) return null;
    LocalTime now = LocalTime.now(ZoneId.of("Asia/Seoul"));
    LocalTime close = toTime(hi.get("close"));
    if (close == null) return null;
    return (int) Duration.between(now, close).toMinutes();
  }
  private static boolean within(LocalTime t, LocalTime s, LocalTime e) {
    if (s.isBefore(e)) return !t.isBefore(s) && t.isBefore(e);
    return !t.isBefore(s) || t.isBefore(e); // 심야 영업
  }
  private static LocalTime toTime(Object o){ return (o==null)?null: LocalTime.parse(o.toString()); }
}
