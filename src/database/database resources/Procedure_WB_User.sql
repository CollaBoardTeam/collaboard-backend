USE `collaboard`;
DROP procedure IF EXISTS `whiteBoardByUser`;

DELIMITER $$
USE `collaboard`$$
create procedure whiteBoardByUser(in inputIdUser int)
begin
	select idWhiteBoard,boardName,idLayoutFK,boardDate,description from whiteboard join userwhiteboard on
    whiteboard.idWhiteBoard=userwhiteboard.idWhiteBoardFK join
    user on userwhiteboard.idUserFK=user.IdUser join role on
    userwhiteboard.idRollFK=role.idRole
    where user.IdUser=inputIdUser;
    
end$$

DELIMITER ;
