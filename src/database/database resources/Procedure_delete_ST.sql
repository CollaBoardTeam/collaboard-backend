DROP procedure IF EXISTS `deleteStickyNote`;

DELIMITER $$
USE `collaboard`$$
create procedure deleteStickyNote(in inputIdSticky int)
begin

delete from stickynoteline where stickynoteline.idStickyNoteFK=inputIdSticky;
delete from stickynote where stickynote.idSticky=inputIdSticky;


end$$

DELIMITER ;
