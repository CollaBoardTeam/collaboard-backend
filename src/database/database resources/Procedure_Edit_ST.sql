DROP procedure IF EXISTS `editStickyNote`;

DELIMITER $$
USE `collaboard`$$
create procedure editStickyNote(in inputIdSticky int,in inputLineContent varchar(255), in inputIdLine int)
begin


UPDATE stickynoteline
SET lineContent=inputLineContent
WHERE (idLineFK,idStickyNoteFK)=(inputIdLine,inputIdSticky);

select stickynote.idSticky,stickynote.stickyIndex,stickynote.stickyDate,
stickynoteline.lineContent,line.indexLine from stickynote join stickynoteline on
stickynote.idSticky=stickynoteline.idStickyNoteFK join 
line on stickynoteline.idLineFK=line.idLine where stickynote.idSticky=inputIdSticky
and line.idLine=inputIdLine ;

end$$

DELIMITER ;


