DROP KEYSPACE IF EXISTS resturants;
CREATE KEYSPACE resturants
  WITH REPLICATION = {
    'class': 'SimpleStrategy', 'replication_factor': '1'
  };
USE sigsa_reservations2;


CREATE TABLE resturants.images (
    id int,
    imageurl text,
    unrealated int,
    nsfw int,
    dislikes int,
    isdiner boolean,
    caption text,
    date text,
    createdat bigint,
    PRIMARY KEY (id, isdiner, createdat)
) WITH CLUSTERING ORDER BY (isdiner ASC, createdat ASC)


CREATE TABLE resturantImages (
    id int,
    imageurl text,
    unrealated int,
    nsfw int,
    dislikes int,
    isdiner boolean,
    caption text,
    date text,
    createdat bigint
) 
