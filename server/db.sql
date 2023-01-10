
-- DB연결해서 사용하는 함수
-- const DatabaseConnector = require('./common/mysql');

-- module.exports = class MyDatabaseConnector extends DatabaseConnector {
--   constructor() {
--     super();
--   }
-- };


CREATE TABLE user (
    `user_id` varchar(255) PRIMARY KEY,
    `user_password` varchar(255) not NULL,
    `user_nickname` varchar(255) not NULL,
    `user_accountAddress` varchar(255),
    `user_profileImg` varchar(255),
    `user_keystore` varchar(10000),
    `user_loginTime` varchar(255) 
);

CREATE TABLE post (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `post_likes` int not NULL,
    `post_contents` varchar(255) not NULL,
    `post_ID` varchar(255) not NULL,
    `post_userImg` varchar(255),
    `post_createdAt` varchar(255)
);

CREATE TABLE likes (
    `user_id` varchar(255),
    `post_num` int
);

CREATE TABLE nft (
    `user_nfts` varchar(255) PRIMARY KEY,
    `metadata` varchar(255) not NULL,
    `nft_imgURL` varchar(255) not NULL,
);

CREATE TABLE token (
    `id` varchar(255) PRIMARY KEY,
    `sendToken_Address` varchar(255)
);

