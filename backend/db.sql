create database if not exists maps_test;

use maps_test;

set foreign_key_checks = 0;

create table track (
  id int not null auto_increment,
  lat double not null,
  lon double not null,
  user_id int not null,
  primary key (id),
  foreign key (user_id) references user(id)
    on update cascade
    on delete cascade
);

insert into track(id, lat, lon, user_id) values
  (1,-17.779712, -63.188661,1),
  (2,-17.778818, -63.188361,1),
  (3,-17.778363, -63.187626,1),
  (4,-17.778087, -63.186043,1),
  (5,-17.777862, -63.184697,1),
  (6,-17.777801, -63.183147,1),
  (7,-17.778792, -63.183093,1),
  (8,-17.779824, -63.182996,1),
  (9,-17.777804, -63.172981,2),
  (10,-17.777042, -63.173284,2),
  (11,-17.776546, -63.173536,2),
  (12,-17.775775, -63.173600,2),
  (13,-17.775126, -63.173804,2),
  (14,-17.774155, -63.174013,2);

create table user (
  id int not null auto_increment,
  name varchar (255),
  primary key (id)
);

insert into user(id, name) values
  (1, 'A'),
  (2, 'B');

set foreign_key_checks = 1;