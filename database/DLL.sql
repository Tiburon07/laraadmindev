create table if not exists failed_jobs
(
    id         bigint unsigned auto_increment
    primary key,
    uuid       varchar(255)              not null,
    connection text                      not null,
    queue      text                      not null,
    payload    longtext                  not null,
    exception  longtext                  not null,
    failed_at  timestamp default (now()) not null,
    constraint failed_jobs_uuid_unique
    unique (uuid)
    )
    collate = utf8mb4_unicode_ci;

create table if not exists migrations
(
    id        int unsigned auto_increment
    primary key,
    migration varchar(255) not null,
    batch     int          not null
    )
    collate = utf8mb4_unicode_ci;

create table if not exists password_resets
(
    id         bigint unsigned auto_increment
    primary key,
    email      varchar(255) not null,
    token      varchar(255) not null,
    created_at timestamp    null
    )
    collate = utf8mb4_unicode_ci;

create index password_resets_email_index
    on password_resets (email);

create table if not exists users
(
    id                bigint unsigned auto_increment
    primary key,
    name              varchar(255) not null,
    email             varchar(255) not null,
    email_verified_at timestamp    null,
    password          varchar(255) not null,
    remember_token    varchar(100) null,
    created_at        timestamp    null,
    updated_at        timestamp    null,
    deleted_at        timestamp    null,
    role              varchar(16) default 'user' not null,
    constraint users_email_unique
    unique (email)
    )
    collate = utf8mb4_unicode_ci;

create table if not exists `02_albums`
(
    id          bigint unsigned auto_increment
    primary key,
    album_name  varchar(128)    not null,
    description text            null,
    user_id     bigint unsigned not null,
    album_thumb varchar(255)    not null,
    deleted_at  timestamp       null,
    created_at  timestamp       null,
    updated_at  timestamp       null,
    constraint `02_albums_album_name_unique`
    unique (album_name),
    constraint `02_albums_user_id_foreign`
    foreign key (user_id) references users (id)
    on update cascade on delete cascade
    )
    collate = utf8mb4_unicode_ci;

create table if not exists `02_photos`
(
    id          bigint unsigned auto_increment
    primary key,
    created_at  timestamp       null,
    updated_at  timestamp       null,
    deleted_at  timestamp       null,
    name        varchar(128)    not null,
    description text            null,
    album_id    bigint unsigned not null,
    img_path    varchar(255)    not null,
    constraint `02_photos_album_id_foreign`
    foreign key (album_id) references `02_albums` (id)
    on update cascade on delete cascade
    )
    collate = utf8mb4_unicode_ci;

