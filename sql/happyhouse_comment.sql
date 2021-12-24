create table comment
(
    no        int auto_increment
        primary key,
    couserid  varchar(100)                        null,
    postno    int                                 null,
    content   longtext                            null,
    coregtime timestamp default CURRENT_TIMESTAMP null,
    constraint post_no_comment
        foreign key (postno) references post (postno),
    constraint user_id_comment
        foreign key (couserid) references user (id)
);

create index post_no_comment_idx
    on comment (postno);

create index user_id_comment_idx
    on comment (couserid);

