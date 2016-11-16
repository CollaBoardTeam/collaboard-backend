
DROP procedure IF EXISTS `createStickyNote`;

DELIMITER $$
USE `collaboard`$$
create procedure createStickyNote(in inputIdUser int,in inputContent varchar(255),in inputPosition int,in inputIdGroup int)
begin
declare varColor,varKey INT;
select min(idColor) into varColor from color;
IF(varColor is null)then
insert into color values (null,'FFFFFF');
select min(idColor) into varColor from color;
end if;

INSERT INTO stickynote VALUES(null,inputPosition,CURDATE(),inputIdGroup,inputIdUser,varColor);
select last_insert_id() into varKey;
INSERT INTO stickyNoteLine values(1,varKey,inputContent);

select stickynote.idSticky,stickynote.stickyIndex,stickynote.stickyDate,
stickynoteline.lineContent,line.indexLine from stickynote join stickynoteline on
stickynote.idSticky=stickynoteline.idStickyNoteFK join 
line on stickynoteline.idLineFK=line.idLine where stickynote.idSticky=varKey;


end$$


DELIMITER ;
