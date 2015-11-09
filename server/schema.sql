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
  wins int NOT NULL,
  losses int NOT NULL,
  ties int NOT NULL,
  league int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE users (
  id        int    NOT NULL AUTO_INCREMENT,
  username  varchar(40)   NOT NULL,
  PRIMARY KEY (ID)
);


CREATE TABLE games (
  id        int    NOT NULL AUTO_INCREMENT,
  team1  int   NOT NULL,
  team2  int   NOT NULL,
  team1score  int   NOT NULL,
  team2score  int   NOT NULL,
  date DATE NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE usersToTeam (
  id        int    NOT NULL AUTO_INCREMENT,
  userId  int   NOT NULL,
  teamId  int   NOT NULL,
  PRIMARY KEY (ID)
);