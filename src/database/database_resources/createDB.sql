CCREATE DATABASE collaboard;

USE collaboard;

CREATE TABLE IF NOT EXISTS user(IdUser INT NOT NULL AUTO_INCREMENT,
    	PRIMARY KEY(idUser),
    	fullName VARCHAR(255),
    	email VARCHAR(100) NOT NULL ,
    	password VARCHAR(25) NOT NULL,
        UNIQUE KEY(email));

CREATE TABLE IF NOT EXISTS color(idColor INT NOT NULL AUTO_INCREMENT,
    	PRIMARY KEY(idColor),
    	color VARCHAR(6) NOT NULL);

CREATE TABLE IF NOT EXISTS role(idRole INT NOT NULL AUTO_INCREMENT,
    	PRIMARY KEY(idRole),
    	description VARCHAR(50)  NOT NULL);

CREATE TABLE IF NOT EXISTS layout(idLayout INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY(idLayout),
        layoutName VARCHAR(100)NOT NULL);
        
CREATE TABLE IF NOT EXISTS whiteBoard(idWhiteBoard INT NOT NULL AUTO_INCREMENT,
    	idLayoutFK INT NOT NULL,
    	boardName VARCHAR(100) NOT NULL,
    	boardDate DATE,
		locked bool,
    	PRIMARY KEY(idWhiteBoard),
    	FOREIGN KEY(idLayoutFK) REFERENCES layout(idLayout));

CREATE TABLE IF NOT EXISTS userWhiteBoard(idWhiteBoardFK INT NOT NULL,
    	idUserFK INT NOT NULL,
    	idRollFK INT NOT NULL,
    	PRIMARY KEY(idWhiteBoardFK,idUserFK),
    	FOREIGN KEY (idRollFK) REFERENCES role(idRole),
    	FOREIGN KEY (idWhiteBoardFK) REFERENCES whiteBoard(idWhiteBoard)
			ON DELETE CASCADE,
    	FOREIGN KEY (idUserFK) REFERENCES user(idUser) 
			ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS line(idLine INT NOT NULL AUTO_INCREMENT,
    	PRIMARY KEY(idLine),
    	idLayoutFK INT NOT NULL,
    	indexLine INT NOT NULL,
    	FOREIGN KEY (idLayoutFK) REFERENCES layout(idLayout)
			ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS groupo(idGroup INT NOT NULL AUTO_INCREMENT,
 		PRIMARY KEY(idGroup),
 		idWhiteBoardFK INT NOT NULL, 
        groupName VARCHAR(100),
        indexGroup INT,
		FOREIGN KEY (idWhiteBoardFK) REFERENCES whiteBoard(idWhiteBoard)
			ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS stickyNote(idSticky INT NOT NULL AUTO_INCREMENT, 
        PRIMARY KEY(idSticky), 
        stickyIndex INT NOT NULL, 
        stickyDate DATE, 
        idGroupFK INT NOT NULL, 
        idUserFK INT NOT NULL, 
        idColorFK INT NOT NULL, 
        FOREIGN KEY (idGroupFK) REFERENCES groupo(idGroup)
			ON DELETE CASCADE,
		FOREIGN KEY (idUserFK) REFERENCES user(idUser)
			ON DELETE CASCADE, 
        FOREIGN KEY (idColorFK) REFERENCES color(idColor));

CREATE TABLE IF NOT EXISTS stickyNoteLine(idLineFK INT NOT NULL, 
        idStickyNoteFK INT NOT NULL, 
        lineContent VARCHAR(255), 
        PRIMARY KEY(idLineFK,idStickyNoteFK), 
        FOREIGN KEY (idLineFK) REFERENCES line(idLine)
			ON DELETE CASCADE, 
        FOREIGN KEY (idStickyNoteFK) REFERENCES stickyNote(idSticky)
			ON DELETE CASCADE);