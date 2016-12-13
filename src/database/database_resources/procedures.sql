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

-- *************************************************************
--  createStickyNote      create a new stickyNote
-- *************************************************************
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

-- *************************************************************
--   createGroupWB      create a new whiteBoard group
-- *************************************************************
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
--   whiteBoardContent    get all the content od a whiteBoard
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

-- *************************************************************
--   whiteBoardByUser    get all whiteBoards from a user
-- *************************************************************
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

-- *************************************************************
--    getColors     get all the colors available 
-- *************************************************************
DROP procedure IF EXISTS `getColors`;
DELIMITER $$
USE `collaboard`$$
create procedure getColors()
begin
    select * from color;
end$$
DELIMITER ;

-- *************************************************************
--   editColorSticky        changes the color of a stickyNote
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

-- *************************************************************
--    editStickyNote         edit an existing StickyNote
-- *************************************************************
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

-- *************************************************************
--  changeWBState       Lock ou unlock the WhiteBoard
-- *************************************************************
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
--   deleteStickyNote       deletes a stickyNote
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

-- *************************************************************
--    deleleWhiteBoard          deletes an whiteBoard
-- *************************************************************
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
    'whiteboardLayoutID', wb.idLayoutFK,
    'whiteboardName', wb.boardName,
    'whiteboardState', wb.locked,
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
																	'stickyId', st.idSticky, 'stickyColor', color,'groupLines', 
																	(select
																		cast(
																			concat('[',
																				group_concat(
																					JSON_OBJECT(
																						'lineId', lo.idLine,'stickyContent', stline.lineContent,'lineIndex', lo.IndexLine
																						)
																					),
																				']')AS JSON
																			)
																		from stickyNoteLine as stline
																		join `line` as lo on lo.idLine=stline.idLineFK
																		where stline.idStickyNoteFK=st.idSticky)
																)
															),
														']') AS JSON
													)
												from stickyNote as st 
												join color as c on c.idColor = st.idColorFK 
												where st.idGroupFK = gp.idGroup )
										)
									),
								']') AS JSON
							) 
						from groupo as gp
                        where gp.idWhiteBoardFK = wb.idWhiteBoard )
					) as result
			from whiteBoard as wb where wb.idWhiteBoard = idWhiteboard;
end$$
DELIMITER ;

-- ************************************************************
--   addStickyNoteToGroup   Changes the group of the stickyNote 
-- ************************************************************    
DROP procedure IF EXISTS `addStickyNoteToGroup`;
DELIMITER $$
USE `collaboard`$$
create procedure addStickyNoteToGroup(in inputIdSticky int,in inputIdGroup int)
begin
    UPDATE stickyNote SET idGroupFK=inputIdGroup where idSticky=inputIdSticky;
end$$
DELIMITER ;

-- *****************************************************************
--   changeGroupName   change existing name to a new name on a goup
-- ********************************************************* *******   
DROP procedure IF EXISTS `changeGroupName`;
DELIMITER $$
USE `collaboard`$$
create procedure changeGroupName(in inputIdGroup int,in inputGroupName varchar(100))
begin
    UPDATE groupo SET groupName=inputGroupName where idGroup=inputIdGroup;
end$$
DELIMITER ;

-- *****************************************************************
--   changeWhiteBoardName    changes the the name of a white Board
-- *****************************************************************   
DROP procedure IF EXISTS `changeWhiteBoardName`;
DELIMITER $$
USE `collaboard`$$
create procedure changeWhiteBoardName(in inputIdWB int,in inputWbName varchar(100))
begin
	UPDATE whiteboard SET boardName=inputWbName  where idWhiteBoard=inputIdWB;
end$$
DELIMITER ;

-- *****************************************************************
--   deleteGroup   deletes a group and by cascade all sticky Notes
-- *****************************************************************
DROP procedure IF EXISTS `deleteGroup`;
DELIMITER $$
USE `collaboard`$$
create procedure deleteGroup(in inputIdGroup int)
begin
DECLARE varQty,varWB int;
Select idWhiteBoardFK into varWB from groupo where idGroup=inputIdGroup;
SELECT COUNT(*) into varQty FROM groupo where idWhiteBoardFK=varWB;
if(varQty>1) then
	DELETE FROM groupo where idGroup=inputIdGroup;
    end if;
end$$
DELIMITER ;

-- *****************************************************************
--   addLineToSticky     add new content lines to a sticky note.
-- *****************************************************************
DROP procedure IF EXISTS `addLineToSticky`;
DELIMITER $$
USE `collaboard`$$
create procedure addLineToSticky(in inputIdSticky int,in inputContent varchar(255),in inputLineIndex int)
begin
    declare varLayout,varLine INT;
            
	select w.idLayoutFK into varLayout from stickyNote sn
		join groupo g on g.idGroup = sn.idGroupFK
		join whiteboard w on w.idWhiteboard = g.idWhiteBoardFK
	where sn.idSticky = inputIdSticky;
	
    select idLine into varLine from line where idLayoutFK = varLayout and indexline = inputLineIndex;
    
	insert into stickyNoteLine values(varLine, inputIdSticky, inputContent);
end$$
DELIMITER ;

-- *****************************************************************
--   getLayouts    get all the IdLayouts and number of lines
-- *****************************************************************
DROP procedure IF EXISTS `getLayouts`;
DELIMITER $$
USE `collaboard`$$
create procedure getLayouts()
begin
    select count(idLayout) as linhas,layout.idLayout,layout.layoutName     from layout join line on layout.idLayout=line.idLayoutFK group by layout.idLayout;
end$$
DELIMITER ;

-- *****************************************************************
--   setLayoutWB   set the layout for the whiteboard
-- *****************************************************************
DROP procedure IF EXISTS `setLayoutWB`;
DELIMITER $$
USE `collaboard`$$
create procedure setLayoutWB(in inputIdLayout INT, in inputIdWB int)
begin
 UPDATE whiteboard SET whiteBoard.idLayoutFK=inputIdLayout where whiteBoard.idWhiteBoard=inputIdWB;
end$$
DELIMITER ;

-- *****************************************************************
--   createLayoutWB  
-- *****************************************************************
DROP procedure IF EXISTS `createLayoutWB`;
DELIMITER $$
USE `collaboard`$$
create procedure createLayoutWB(in inputIdWB INT,in inputlayoutName varchar(100))
begin
DECLARE varLayout INT;
 insert into layout values(null,inputlayoutName);
 select last_insert_id() into varLayout;
 UPDATE whiteboard SET whiteBoard.idLayoutFK=varLayout where whiteBoard.idWhiteBoard=inputIdWB;
 select idLayout from layout where layout.idLayout=varLayout;
end$$
DELIMITER ;

-- *****************************************************************
--   invite user  
-- *****************************************************************
DROP procedure IF EXISTS `inviteUsers`;
DELIMITER $$
USE `collaboard`$$
create procedure inviteUsers(in inputIdOwner INT,in inputEmail varchar(100),in inputIdWhiteBoard INT)
begin
    DECLARE varUser,varOwner,varLast,varExistInvitation INT;
    select idUser into varUser from user where email=inputEmail;
    select idUserFK into varOwner from whiteboard join userwhiteboard 
    on whiteboard.idWhiteBoard=userwhiteboard.idWhiteBoardFK join role 
    on userwhiteboard.idRollFK=role.idRole 
    where role.description='owner' and whiteBoard.idWhiteBoard=inputIdWhiteBoard;
    select count(idinvite) into varExistInvitation  from invites where idWhiteBoard=inputIdWhiteBoard and idUserInvited=varUser;
    if(varExistInvitation =0) then
		if (varOwner=inputIdOwner and varUser is not null) then
		insert into invites values(null,inputIdWhiteBoard,varOwner,varUser,null);
		end if;
	end if;
end$$
DELIMITER ;

-- *****************************************************************
--   check invitation  
-- *****************************************************************
DROP procedure IF EXISTS `checkInvitation`;
DELIMITER $$
USE `collaboard`$$
create procedure checkInvitation(in inputIdUser INT)
begin
    select idinvite,invites.idWhiteBoard,idOwnerWB,idUserInvited,sendDate,boardName from invites join whiteBoard on
    invites.idWhiteBoard=whiteboard.idWhiteBoard where idUserInvited=inputIdUser;
end$$
DELIMITER ;

-- *****************************************************************
--   accept invitation
-- *****************************************************************
DROP procedure IF EXISTS `acceptInvitation`;
DELIMITER $$
USE `collaboard`$$
create procedure acceptInvitation(in inputIdInvit INT,in inputIdWhiteBoard INT,in inputIdUser INT)
begin
declare varCount INT;
select count(idUserFK) into varCount  from userwhiteboard where userwhiteboard.idUserFK=inputIdUser 
and userwhiteboard.idWhiteBoardFK=inputIdWhiteBoard ;
    DELETE FROM invites where idinvite=inputIdInvit;
    if(varCount=0)then
    INSERT INTO userWhiteBoard values(inputIdWhiteBoard,inputIdUser,1);
    end if;
end$$
DELIMITER ;

-- *****************************************************************
--   delete invitation
-- *****************************************************************
DROP procedure IF EXISTS `deleteInvitation`;
DELIMITER $$
USE `collaboard`$$
create procedure deleteInvitation(in inputIdInvit INT)
begin
    DELETE FROM invites where idinvite=inputIdInvit;
end$$
DELIMITER ;

-- *****************************************************************
--   removeUser from WhiteBoard
-- *****************************************************************
DROP procedure IF EXISTS `removeUserWB`;
DELIMITER $$
USE `collaboard`$$
create procedure removeUserWB(in inputIdWB INT,in inputIdUser INT)
begin
    DELETE FROM userWhiteBoard where idWhiteBoardFK=inputIdWB and idUserFK=inputIdUser;
end$$
DELIMITER ;

-- *****************************************************************
--   get all user from a white board
-- *****************************************************************
DROP procedure IF EXISTS `getUsersWB`;
DELIMITER $$
USE `collaboard`$$
create procedure getUsersWB(in inputIdWB INT)
begin
    select idWhiteBoard,boardName,idUser,email,idRollFK from whiteboard 
    join userwhiteboard on whiteboard.idWhiteBoard=userwhiteboard.idWhiteBoardFK 
    join user on userwhiteboard.idUserFK=user.IdUser
    where idWhiteBoardFK=inputIdWB;
end$$
DELIMITER ;

-- *****************************************************************
--   register a new user
-- *****************************************************************
DROP procedure IF EXISTS `registerUser`;
DELIMITER $$
USE `collaboard`$$
create procedure registerUser(in inputFullName varchar(255),in inputEmail varchar(100),in inputPassword varchar(25))
begin
    DECLARE varEmail,varLast INT;
    set varLast=null;
    select idUser into varEmail from user where email=inputEmail;
    if(varEmail is null) then
    insert into user values(null,inputFullName,inputEmail,inputPassword);
    select max(last_insert_id()) into varLast;
    select * from user where idUser=varLast;
    end if;
end$$
DELIMITER ;

# ******************************************************************
#   Get layout by id
# ******************************************************************

DROP procedure IF EXISTS `getLayoutById`;
DELIMITER $$
USE `collaboard`$$
create procedure getLayoutById(in inputId int)
begin
    select * from layout where idLayout = inputId;
end$$
DELIMITER ;

# ******************************************************************
#   Authenticate User
# ******************************************************************
DROP procedure IF EXISTS `authenticateUser`;
DELIMITER $$
USE `collaboard`$$
create procedure authenticateUser(in inputEmail text, in inputPassword text)
begin
    select idUser, fullName from user where email = inputEmail and password = inputPassword;
end$$
DELIMITER ;