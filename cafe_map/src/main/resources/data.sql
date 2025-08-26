INSERT INTO cafes(name,address,lat,lng,location,rating,review_count) VALUES
('장발장','부평구 ...',37.4840000,126.7210000,ST_SRID(POINT(126.7210000,37.4840000),4326),4.5,120),
('개화공간','부평구 ...',37.4852000,126.7235000,ST_SRID(POINT(126.7235000,37.4852000),4326),4.3,80);

INSERT IGNORE INTO tags(name) VALUES ('roastery'),('outlet'),('quiet'),('terrace');

INSERT IGNORE INTO cafe_tag(cafe_id, tag_id)
SELECT c.id, t.id FROM cafes c, tags t
WHERE c.name='장발장' AND t.name IN ('outlet','quiet');

INSERT INTO hours(cafe_id, day_of_week, open, close)
SELECT id, 1, '09:00:00', '22:00:00' FROM cafes;
