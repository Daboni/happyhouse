create table comtnncrd
(
    ncrd_id           int unsigned auto_increment,
    ncrd_trgter_id    varchar(20)   null,
    nm                varchar(50)   not null,
    telno             varchar(20)   null,
    nation_no         varchar(10)   null,
    area_no           varchar(4)    null,
    middle_telno      varchar(4)    null,
    end_telno         varchar(4)    null,
    mbtlnum           varchar(20)   null,
    idntfc_no         varchar(10)   null,
    middle_mbtlnum    varchar(4)    null,
    end_mbtlnum       varchar(4)    null,
    email_adres       varchar(50)   null,
    cmpny_nm          varchar(60)   null,
    dept_nm           varchar(60)   null,
    adres             varchar(100)  null,
    detail_adres      varchar(100)  null,
    ofcps_nm          varchar(60)   null,
    clsf_nm           varchar(60)   null,
    extrl_user_at     char          null,
    othbc_at          char          not null,
    rm                varchar(2500) null,
    frst_regist_pnttm datetime      not null,
    frst_register_id  varchar(20)   null,
    last_updt_pnttm   datetime      null,
    last_updusr_id    varchar(20)   null,
    constraint ncrd_id
        unique (ncrd_id)
);

alter table comtnncrd
    add primary key (ncrd_id);

