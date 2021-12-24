create table user
(
    seq     int auto_increment
        primary key,
    id      varchar(100)                                      not null,
    pwd     varchar(100)                                      not null,
    name    varchar(100)                                      not null,
    address varchar(100)                                      null,
    tel     varchar(100)                                      null,
    email   varchar(200)                                      not null,
    role    varchar(100)                                      not null,
    salt_id int                                               not null,
    img     varchar(300) default 'img/theme/profile-user.png' null,
    constraint email
        unique (email),
    constraint id
        unique (id),
    constraint salt_id_user_salt_id
        foreign key (salt_id) references salt (id)
            on delete cascade
);

INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (1, 'jdbc', '$2a$10$qE2DjJvGIWZqpyI3TMtQje5KDf7RSGAMhRKK8A5AlSu.losHSspyy', '장다빈짱짱맨', '다빈특별시 다빈하우스', '01012345678', 'boringHouse@ssafy.com', 'ROLE_USER', 1, 'img/upload/2bf10523-2461-470f-b7ed-b13b14b22e21.png');
INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (2, 'jdb4497', '$2a$10$3n9yqy3vT8UMGC2WJC1VAeMkthbSJyHK9eBs5b0EbtNkbRmDWQKyy', '장다빈', '서울 특별시 강서구', '01024568753', 'jdb4497@nate.com', 'ROLE_USER', 1, 'img/theme/profile-user.png');
INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (8, 'admin', '$2a$10$3IkKFEALg.7Mc0IjTsSTPutSpU1R1ysXBS2fZtF2zFflN8X57R4Ui', ' admin ', '광주광역시 광산구 삼성 멀티캠퍼스', '01062129037', 'admin@gmail.com', 'ROLE_ADMIN', 9, 'img/upload/05f3d30c-0937-4026-846e-d9071614dcfa.png');
INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (10, 'ssafymonster', '$2a$10$ZWYgQ9uZM.9T5.wT6R8KueovKvlmS4I4BHZMcUUOA.FZFS3Vwnwje', '김일환', '서울 테헤란로', '01012345678', 'test@naver.com', 'ROLE_USER', 11, 'img/theme/profile-user.png');
INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (11, '발패티쉬다빈', '$2a$10$6Yx3Gc0RaStOYk4jLJCExuUVL.6pOAI1JQgru9nUS9xdYU21dRTUS', '다비농', '123', '123', 'abc@abc.com', 'ROLE_USER', 12, 'img/theme/profile-user.png');
INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (12, '야동쟁이융즁', '$2a$10$MWqCVIarKSySXadGepu0g.ZvOmCJWGslx5ijZWN0h2DAHdTvCOMuO', '잉융즁', '123', '123', 'aaa@aaa.com', 'ROLE_USER', 13, 'img/theme/profile-user.png');
INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (13, '다비농', '$2a$10$k7bAkemMnRIi5XM/eZ49Q.6RaIT8jsmDCJSDTAegHFrVizWYu8NLS', '장소명', '광주', '01000000000', '다비농@naver.com', 'ROLE_USER', 14, 'img/theme/profile-user.png');
INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (14, 'ssafy', '$2a$10$Ojned0IsftnMoqJ4eRj0negYqHWLH.cqstGTcCtw919wNGwqTboQa', 'Test', '서울 강남구 역삼동 701 서울상록빌딩', '01012345678', 'test@ssafy.com', 'ROLE_USER', 15, 'img/theme/profile-user.png');
INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (15, 'wkdekqls02', '$2a$10$JkVnbtTYTzEANuTjPSIhaeiD84u2wcSvd9xiehehanOY82TIVxcUK', '장다빈2', '서울시 마곡동 마곡서1로', '01012345678', 'jdb4497@naver.com', 'ROLE_USER', 16, 'img/upload/265007bd-2385-4400-81a1-98e1fc95a218.png');
INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (17, 'wkdekqls12345', '$2a$10$nf0mDpQ9.Fa7LP2P3iUj1ul4wYk9AFFCXQ5DZfwbbfRKPvWbpNZc6', '장다빈2', '마곡동 마곡서1로 100', '01012345678', 'jdb449730@nate.com', 'ROLE_USER', 18, 'img/upload/726837a3-78ea-430e-a5d6-2e588b167b60.png');
INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (18, 'wkdekqls987', '$2a$10$Yyz4ixVZU/M2g3bby773ieGkqHVBl3gASXvz9eY9CYPHaxqD3kNFG', '장다빈짱짱맨', '마곡동 마곡서1로 100', '01024944497', 'jdb1234@nate.com', 'ROLE_USER', 19, 'img/upload/668242f6-1592-495f-903d-92b8a2d610e3.png');
INSERT INTO happyhouse.user (seq, id, pwd, name, address, tel, email, role, salt_id, img) VALUES (19, 'wkdekqls555', '$2a$10$/IfCg1vadQ.CWjk75JlJWuhOtGUqxCL86uga7TI.mu9xSZDMswr56', '장다빈123', '마곡동 마곡서1로', '01012345678', 'jdb5555@ssafy.com', 'ROLE_USER', 20, 'img/upload/eb42848b-db72-447d-bd4c-3b7cad689a9f.png');