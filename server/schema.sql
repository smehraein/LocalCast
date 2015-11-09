CREATE DATABASE localCast;

USE localCast;

CREATE TABLE leagues (

  id int NOT NULL AUTO_INCREMENT,
  leaguename varchar(200)  NOT NULL,
  sport varchar(50),
  PRIMARY KEY (ID)
);

CREATE TABLE teams (

  id int NOT NULL AUTO_INCREMENT,
  teamname varchar(200)  NOT NULL,
  rank int NOT NULL,
  league int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE users (
  id        int    NOT NULL AUTO_INCREMENT,
  username  varchar(40)   NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE usersToTeam (
  id        int    NOT NULL AUTO_INCREMENT,
  userId  int   NOT NULL,
  teamId  int   NOT NULL,
  PRIMARY KEY (ID)
);