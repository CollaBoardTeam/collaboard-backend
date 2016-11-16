DROP procedure IF EXISTS `whiteBoardContent`;

DELIMITER $$
USE `collaboard`$$
create procedure whiteBoardContent(in inputIdWhiteBoard int)
begin

select idSticky,stickyIndex,stickyDate,indexLine,lineContent
from whiteBoard join groupo on
whiteBoard.idWhiteBoard=groupo.idWhiteBoardFK
join stickyNote on groupo.IdGroup=stickyNote.idGroupFK
join StickyNoteLine on 
stickyNoteLine.idStickyNoteFK=stickyNote.idSticky
join line on line.IdLine=stickyNoteLine.idLineFK
where idWhiteBoardFK=inputIdWhiteBoard;

end$$

DELIMITER ;

