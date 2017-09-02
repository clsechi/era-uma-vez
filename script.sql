CREATE TABLE Players (
	PlayerID INT NOT NULL AUTO_INCREMENT,
	Name varchar(30) NOT NULL,
	RA varchar(15),
	Avatar varchar(20),
	School varchar(30),
	Progress TINYINT DEFAULT '0',
	Points INT DEFAULT '0',
	RoomId TINYINT DEFAULT '0',
	TotalElapsedTime FLOAT(10,2) DEFAULT '0.00',
	PRIMARY KEY (PlayerID)
);

CREATE TABLE ChallengesLOG (
	LogID INT NOT NULL AUTO_INCREMENT,
	FK_PlayerID INT NOT NULL,
	EarnedPoints TINYINT,
	GBProgress TINYINT,
	ElapsedTime FLOAT,
	WrongAnswers TINYINT,
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

UPDATE Players SET Progress = 10, Points = 100 WHERE PlayerID = 1;
