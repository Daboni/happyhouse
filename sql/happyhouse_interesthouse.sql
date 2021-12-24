create table interesthouse
(
    code     varchar(100) not null,
    dong     varchar(100) not null,
    AptName  varchar(100) not null,
    user_seq int          not null,
    primary key (user_seq, code, dong, AptName),
    constraint interesthouse_ibfk_1
        foreign key (user_seq) references user (seq)
);

INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11500', '마곡동', '마곡금호어울림', 1);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11500', '마곡동', '마곡엠밸리2단지', 1);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11500', '마곡동', '마곡엠밸리3단지', 1);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11500', '마곡동', '마곡엠밸리4단지', 1);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11500', '마곡동', '마곡엠밸리5단지', 1);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11500', '마곡동', '마곡엠밸리6단지', 1);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11500', '마곡동', '마곡엠밸리7단지', 1);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11500', '마곡동', '마곡엠벨리(14단지)', 1);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11500', '마곡동', '벽산', 1);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11500', '마곡동', '신안', 1);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '대우파크빌', 8);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '대우파크힐(쌍문동이안)', 8);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '북한산월드메르디앙', 8);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '북한산코오롱하늘채', 8);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '쌍문동삼성래미안', 8);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '청구', 8);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '파라다이스빌', 8);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11350', '공릉동', '두산힐스빌아파트', 10);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11350', '공릉동', '청솔아파트8', 10);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '방학동', '거성학마을아파트', 14);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '방학동', '금광포란재아파트', 14);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '방학동', '신동아아파트2', 14);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '방학동', '퍼스티안', 14);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '동익미라벨', 14);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '북한산코오롱하늘채', 14);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '대우파크힐(쌍문동이안)', 15);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '북한산월드메르디앙', 15);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '엘지트윈빌Ⅰ·Ⅱ', 15);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', 'e편한세상', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '대우파크빌', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '대우파크힐(쌍문동이안)', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '도봉금강아미움파크타운', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '북한산월드메르디앙', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '북한산코오롱하늘채', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '브라운스톤쌍문', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '신원에벤에셀', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '엘지트윈빌Ⅰ·Ⅱ', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '파라다이스빌', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '한양1', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '한양6', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '한양7', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '현대2', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '현대3', 17);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '대우파크힐(쌍문동이안)', 18);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '북한산월드메르디앙', 18);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '북한산코오롱하늘채', 18);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '브라운스톤쌍문', 18);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '쌍문동삼성래미안', 18);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '방학동', '대상타운현대아파트', 19);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '방학동', '방학동삼성래미안2', 19);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '북한산월드메르디앙', 19);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '북한산코오롱하늘채', 19);
INSERT INTO happyhouse.interesthouse (code, dong, AptName, user_seq) VALUES ('11320', '쌍문동', '쌍문동삼성래미안', 19);