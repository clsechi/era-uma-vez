CREATE TABLE Players (
	PlayerID INT NOT NULL AUTO_INCREMENT,
	Name varchar(30) NOT NULL,
	RA varchar(15),
	Avatar varchar(20),
	School varchar(30),
	Progress TINYINT DEFAULT '1',
	Points INT DEFAULT '0',
	RoomID varchar(5),
	TotalElapsedTime FLOAT(10,2) DEFAULT '0',
	PRIMARY KEY (PlayerID)
);

CREATE TABLE ChallengesLOG (
	LogID INT NOT NULL AUTO_INCREMENT,
	FK_PlayerID INT NOT NULL,
	EarnedPoints TINYINT,
	GBProgress TINYINT,
	ElapsedTime FLOAT,
	WrongAnswers TINYINT,
	Code TEXT,
	PRIMARY KEY (LogID),
	FOREIGN KEY (FK_PlayerID) REFERENCES Players(PlayerID)
);

INSERT INTO Players (Name, RA, School) VALUES ('Carlos', '20422328', 'Anhembi');

INSERT INTO Players (Name, RA, School) VALUES ('Esdras', '20478859', 'Anhembi');

INSERT INTO Players (Name, RA, School) VALUES ('João', '20478159', 'Uninove');

INSERT INTO Players (Name, RA, School) VALUES ('Fabio Lara', '20479959', 'Anhembi');

INSERT INTO Players (Name, RA, School) VALUES ('Maria Zica', '20885859', 'FMU');

INSERT INTO Players (Name, RA, School) VALUES ('Bruno', '27858859', 'USP');

INSERT INTO Players (Name, RA, School) VALUES ('Romario Viana', '20478859', 'ITA');

INSERT INTO Players (Name, RA, School) VALUES ('Ana', '20778859', 'Anhembi');

**********************************************************************************************************

UPDATE Players SET Progress = 10, Points = 100 WHERE PlayerID = 1;

INSERT INTO ChallengesLOG (FK_PlayerID, EarnedPoints, GBProgress, ElapsedTime, WrongAnswers) VALUES ();

select ChallengesLOG.ElapsedTime, Players.Name, ChallengesLOG.WrongAnswers, ChallengesLOG.GBProgress  from ChallengesLOG inner join Players on ChallengesLOG.FK_PlayerID = Players.PlayerID;

mysql -h us-cdbr-iron-east-05.cleardb.net -u b5d774246163bc -p

Truncate table XXX

ALTER TABLE ChallengesLOG ADD COLUMN Code TEXT;