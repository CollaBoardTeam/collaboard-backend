-- *************************************************************
--                      CREATION PROCEDURES 
-- *************************************************************

USE `collaboard`;
DROP procedure IF EXISTS `createWhiteBoard`;
DELIMITER $$
USE `collaboard`$$
create procedure createWhiteBoard(in inputIdLayout int,in inputBoardName varchar(100),in inputIdUser int)
begin
	declare varLayout, varUser ,varLastId INT;
	select min(idLayout) into varlayout from layout where idLayout=inputIdLayout;
    select min(idUser) into varUser from user where idUser=inputIdUser;
    if (varLayout is not null) then
		insert into whiteBoard values(null,inputIdLayout,inputBoardName,curdate(),false);
        select last_insert_id() INTO varLastId;
    else 
        insert into layout(idLayout,layoutName) values(inputIdLayout,'Layout test');
        insert into whiteBoard values(null,inputIdLayout,inputBoardName,curdate(),false);
        select last_insert_id() INTO varLastId;
	end if;
	if (varUser is not null) then
		insert into userWhiteBoard values(varLastId,inputIdUser,2);
    else 
        insert into user values(inputIdUser,'testname','testemail','testpass');
        insert into userWhiteBoard  values(varLastId,inputIdUser,2);
	end if;
        insert into groupo values(null,varLastId,'Groupo Default',1);
		select idWhiteBoard,boardName,idLayoutFK,boardDate,description,locked from whiteBoard 
        join userWhiteBoard  on whiteBoard.idWhiteBoard=userWhiteBoard .idWhiteBoardFK join
        user on userWhiteBoard .idUserFK=user.IdUser join role on userWhiteBoard .idRollFK=role.idRole
        where whiteBoard.idWhiteBoard=varLastId;
end$$
DELIMITER ;

DROP procedure IF EXISTS `createStickyNote`;
DELIMITER $$
USE `collaboard`$$
create procedure createStickyNote(in inputIdUser int,in inputContent varchar(255),in inputPosition int,in inputIdWhiteBoard int,in inputIdColor int)
begin
    declare varKey,varGroup INT;
select min(idGroup) into varGroup from groupo where groupo.idWhiteBoardFK=inputIdWhiteBoard;
insert into stickyNote values(null,inputPosition,CURDATE(),varGroup,inputIdUser,inputIdColor);
select last_insert_id() into varKey;
insert into stickyNoteLine values(1,varKey,inputContent);
select stickyNote.idSticky,stickyNote.stickyIndex,stickyNote.stickyDate,
stickyNoteLine.lineContent,line.indexLine from stickyNote join stickyNoteLine on
stickyNote.idSticky=stickyNoteLine.idStickyNoteFK join 
line on stickyNoteLine.idLineFK=line.idLine where stickyNote.idSticky=varKey;
end$$
DELIMITER ;

DROP procedure IF EXISTS `createGroupWB`;
DELIMITER $$
USE `collaboard`$$
create procedure createGroupWB(in inputIdWhiteBoard int,in inputGroupName varchar(100))
begin
    DECLARE varIndex,varLastId INT;
    select max(indexGroup)+1 into varIndex from groupo where idWhiteBoardFK=inputIdWhiteBoard;
	insert into groupo values(null,inputIdWhiteBoard,inputGroupName,varIndex);
    select last_insert_id() into varLastId;
    select * from groupo where idGroup=varLastId;
end$$
DELIMITER ;

-- *************************************************************
--                      GET PROCEDURES 
-- *************************************************************

DROP procedure IF EXISTS `whiteBoardContent`;
DELIMITER $$
USE `collaboard`$$
create procedure whiteBoardContent(in inputIdWhiteBoard int)
begin
declare vartmp int;
select min(idWhiteBoard) into vartmp from whiteBoard join groupo on whiteBoard.idWhiteBoard=groupo.idWhiteBoardFK
    join stickyNote on groupo.idGroup=stickyNote.idGroupFK where idWhiteBoard=inputIdWhiteBoard;
    if(vartmp is null) THEN
    select * from whiteBoard join groupo 
    on groupo.idWhiteBoardFK=whiteBoard.idWhiteBoard where idWhiteBoard=inputIdWhiteBoard;
    else
    select idSticky,stickyIndex,stickyDate,indexLine,lineContent,color,boardName,idWhiteBoard,IdGroup,groupName,indexGroup
    from whiteBoard join groupo on
    whiteBoard.idWhiteBoard=groupo.idWhiteBoardFK
    join stickyNote on groupo.IdGroup=stickyNote.idGroupFK
    join StickyNoteLine on 
    stickyNoteLine.idStickyNoteFK=stickyNote.idSticky
    join line on line.IdLine=stickyNoteLine.idLineFK join color
    on stickyNote.idColorFK=color.idColor
    where idWhiteBoardFK=inputIdWhiteBoard;
    end if;
end$$
DELIMITER ;

USE `collaboard`;
DROP procedure IF EXISTS `whiteBoardByUser`;
DELIMITER $$
USE `collaboard`$$
create procedure whiteBoardByUser(in inputIdUser int)
begin
	select P.idWhiteBoard,P.boardName,P.idLayoutFK,P.boardDate,P.description,Q.fullName,P.locked from 
    (select idWhiteBoard,boardName,idLayoutFK,boardDate,description,locked from whiteBoard join userWhiteBoard on
    whiteBoard.idWhiteBoard=userWhiteBoard.idWhiteBoardFK join
    user on userWhiteBoard.idUserFK=user.IdUser join role on
    userWhiteBoard.idRollFK=role.idRole where user.IdUser=inputIdUser) as P  join
    (select idWhiteBoard,fullName from whiteBoard join userWhiteBoard on
    whiteBoard.idWhiteBoard=userWhiteBoard.idWhiteBoardFK join
    user on userWhiteBoard.idUserFK=user.IdUser join role on
    userWhiteBoard.idRollFK=role.idRole
    where role.description='owner') as Q on P.idWhiteBoard=Q.idWhiteBoard;
end$$
DELIMITER ;

DROP procedure IF EXISTS `getColors`;
DELIMITER $$
USE `collaboard`$$
create procedure getColors()
begin
    select * from color;
end$$
DELIMITER ;

-- *************************************************************
--                      UPDATE PROCEDURES 
-- *************************************************************

DROP procedure IF EXISTS `editColorSticky`;
DELIMITER $$
USE `collaboard`$$
create procedure editColorSticky(in inputIdSticky int,in inputIdColor int)
begin
    UPDATE stickyNote
    SET idColorFK=inputIdColor
    WHERE stickyNote.idSticky=inputIdSticky;
end$$
DELIMITER ;

DROP procedure IF EXISTS `editStickyNote`;
DELIMITER $$
USE `collaboard`$$
create procedure editStickyNote(in inputIdSticky int,in inputLineContent varchar(255), in inputIdLine int)
begin
    UPDATE stickyNoteLine
    SET lineContent=inputLineContent
    WHERE (idLineFK,idStickyNoteFK)=(inputIdLine,inputIdSticky);
    SELECT stickynote.idSticky,stickyNote.stickyIndex,stickyNote.stickyDate,
    stickyNoteLine.lineContent,line.indexLine from stickyNote join stickyNoteLine on
    stickyNote.idSticky=stickyNoteLine.idStickyNoteFK join 
    line on stickyNoteLine.idLineFK=line.idLine where stickyNote.idSticky=inputIdSticky
    and line.idLine=inputIdLine ;
end$$
DELIMITER ;

USE `collaboard`;
DROP procedure IF EXISTS `changeStateWB`;
DELIMITER $$
USE `collaboard`$$
create procedure changeStateWB(in inputIdWhiteBoard INT)
BEGIN
    DECLARE varLocked INT;
    select locked into varLocked from whiteboard where idWhiteBoard=inputIdWhiteBoard;
    if(varLocked IS false) then
        UPDATE whiteBoard set locked=true where idWhiteBoard=inputIdWhiteBoard;
    else 
        UPDATE whiteBoard set locked=false where idWhiteBoard=inputIdWhiteBoard;
end if;
select * from whiteBoard where idWhiteBoard=inputIdWhiteBoard;
end$$
DELIMITER ;

-- *************************************************************
--                      DELETE PROCEDURES 
-- *************************************************************

DROP procedure IF EXISTS `deleteStickyNote`;
DELIMITER $$
USE `collaboard`$$
create procedure deleteStickyNote(in inputIdSticky int)
begin
    delete from stickyNoteLine where stickyNoteLine.idStickyNoteFK=inputIdSticky;
    delete from stickyNote where stickyNote.idSticky=inputIdSticky;
end$$
DELIMITER ;

DROP procedure IF EXISTS `deleteWhiteBoard`;
DELIMITER $$
USE `collaboard`$$
create procedure deleteWhiteBoard(in inputIdWhiteBoard int,in inputIdUser int)
begin
    DECLARE varUser INT;
    select idRole into varUser from user join userwhiteboard on
    user.IdUser=userWhiteBoard.idUserFK join
    role on userWhiteBoard.idRollFK=role.idRole
    where idWhiteBoardFK=inputIdWhiteBoard and idUserFK=inputIdUser and role.description='owner';
    if (varUser IS NOT NULL) THEN
    DELETE FROM whiteBoard where idWhiteBoard=inputIdWhiteBoard;
    end if;
end$$
DELIMITER ;

#*********************************************************************#
# Query XPTO para o Marco babar-se todo! getWhiteboardContent         #
#                                                                     #
#*********************************************************************#
USE `collaboard`;
DROP procedure IF EXISTS `getWhiteboardContent`;
DELIMITER $$
USE `collaboard`$$
create procedure getWhiteboardContent(in idWhiteboard int)
begin
	select json_object(
	'whiteboardID', wb.idWhiteBoard,
    'whiteboardName', wb.boardName,
    'whiteboardGroups', ( select
							cast(
								concat('[',
									group_concat(
										JSON_OBJECT(
											'groupID', gp.idGroup, 'groupName', gp.groupName, 'groupIndex', gp.indexGroup, 'groupStickies',
												(select
													cast(
														concat('[',
															group_concat(
																JSON_OBJECT(
																	'stickyId', st.idSticky, 'stickyColor', color, 'stickyContent', stline.lineContent
																)
															),
														']') AS JSON
													)
												from stickyNote as st 
												join color as c on c.idColor = st.idColorFK
												left join stickyNoteLine as stline on stline.idStickyNoteFK = st.idSticky
												where st.idGroupFK = gp.idGroup )
										)
									),
								']') AS JSON
							) 
						from groupo as gp
                        where gp.idWhiteBoardFK = wb.idWhiteBoard )
					)  as result
			from whiteBoard as wb where wb.idWhiteBoard = idWhiteboard;
end$$
DELIMITER ;



