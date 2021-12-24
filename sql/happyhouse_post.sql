create table post
(
    postno        int auto_increment
        primary key,
    userid        varchar(100)                        not null,
    subject       varchar(45)                         not null,
    searchcontent longtext                            not null,
    viewcontent   longtext                            not null,
    regtime       timestamp default CURRENT_TIMESTAMP null,
    constraint user_id_post_userid
        foreign key (userid) references user (id)
);

INSERT INTO happyhouse.post (postno, userid, subject, searchcontent, viewcontent, regtime) VALUES (6, 'jdbc', '부동산 정보입니다.', '# 마크다운 테스트
수정 Test', '# 마크다운 테스트
수정 Test', '2021-11-19 17:57:33');
INSERT INTO happyhouse.post (postno, userid, subject, searchcontent, viewcontent, regtime) VALUES (7, 'jdbc', '안녕하세요', '# Test2
글 작성 Test', '# Test2
글 작성 Test', '2021-11-19 18:08:02');
INSERT INTO happyhouse.post (postno, userid, subject, searchcontent, viewcontent, regtime) VALUES (38, 'admin', '오늘 날씨 매우 춥네요', '# 날씨가 추워요
*~~감기조심하세요!~~*', '# 날씨가 추워요
*~~감기조심하세요!~~*', '2021-11-26 04:30:59');