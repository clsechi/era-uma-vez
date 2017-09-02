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
	GameBoardArea TINYINT,
	ElapsedTime FLOAT,
	WrongAnswers TINYINT,
	PRIMARY KEY (LogID),
	FOREIGN KEY (FK_PlayerID) REFERENCES Players(PlayerID)
);

INSERT INTO Players (Name, RA, Avatar, School) VALUES ('Esdras', '20478859', 'dog', 'Anhembi');

UPDATE Players SET Progress = 10, Points = 100 WHERE PlayerID = 1;
