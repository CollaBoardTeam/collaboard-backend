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
		insert into whiteBoard values(null,inputIdLayout,inputBoardName,curdate());
        select last_insert_id() INTO varLastId;
        else 
        insert into layout(idLayout,layoutName) values(inputIdLayout,'Layout test');
        insert into whiteBoard values(null,inputIdLayout,inputBoardName,curdate());
        select last_insert_id() INTO varLastId;
	end if;
	if (varUser is not null) then
		insert into userwhiteboard values(varLastId,inputIdUser,2);
        else 
        insert into user values(inputIdUser,'testname','testemail','testpass');
        insert into userwhiteboard values(varLastId,inputIdUser,2);
	end if;
	
	select idWhiteBoard,boardName,idLayoutFK,boardDate,description from whiteboard join userwhiteboard on
    whiteboard.idWhiteBoard=userwhiteboard.idWhiteBoardFK join
    user on userwhiteboard.idUserFK=user.IdUser join role on
    userwhiteboard.idRollFK=role.idRole
    where whiteboard.idWhiteBoard=varLastId;
    
end$$

DELIMITER ;


