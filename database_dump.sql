show variables like 'char%';

Create database storage;

use storage;

ALTER DATABASE storage DEFAULT CHARACTER SET UTF8;

show tables;

drop table storage.user;

CREATE TABLE storage.user
(
	id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(10) NOT NULL,
    password varchar(10) NOT NULL,
    description varchar(10) NOT NULL,
 	authority int(10) NOT NULL,
    primary key(id)
)DEFAULT CHARACTER SET UTF8;

DESC user;

INSERT INTO storage.user (`name`,`password`, `description`, `authority`) VALUES('admin', 'password', 'SUPER', 1);
INSERT INTO storage.user (`name`,`password`, `description`, `authority`) VALUES('user1', 'user12345!', '사용자_1', 2);
INSERT INTO storage.user (`name`,`password`, `description`, `authority`) VALUES('user2', 'user12345!', '사용자_2', 2);
INSERT INTO storage.user (`name`,`password`, `description`, `authority`) VALUES('user3', 'user12345!', '사용자_3', 2);
INSERT INTO storage.user (`name`,`password`, `description`, `authority`) VALUES('user4', 'user12345!', '사용자_4', 2);

select * from user;


CREATE TABLE storage.data
(
	id int(10) NOT NULL AUTO_INCREMENT,
    title varchar(10) NOT NULL,
    box varchar(10) NOT NULL,
    block varchar(10) NOT NULL,
    number int(10) NOT NULL,
    wdt datetime,
    edt datetime,
    unique(box,block,number),
    primary key(id)
)DEFAULT CHARACTER SET UTF8;

INSERT INTO storage.data (`title`,`box`,`block`,`number`,`wdt`) VALUES ('Test1','W1','A1',1, NOW());
INSERT INTO storage.data (`title`,`box`,`block`,`number`,`wdt`) VALUES ('Test2','W1','A2',2, NOW());
INSERT INTO storage.data (`title`,`box`,`block`,`number`,`wdt`) VALUES ('Test3','W1','A3',3, NOW());
INSERT INTO storage.data (`title`,`box`,`block`,`number`,`wdt`) VALUES ('Test4','W1','A2',4, NOW());


select * from data;