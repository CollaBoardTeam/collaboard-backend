use collaboard;
insert into user values(null,'usetest','usertest@fe.up.pt', '123');
insert into role values (null, 'guest');
insert into role values (null, 'owner');
insert into layout values(null, 'noLayout');
insert into line values (null, 1, 1);
insert into line values (null, 1, 2);
insert into line values (null, 1, 3);
insert into whiteBoard values(null,1,'WhiteBoard sample','2016-11-16',true);
insert into groupo values(null, 1, 'grupoTeste', 1);
insert into userWhiteBoard values(1,1,2);

insert into color values(null,'FFEB3B');
insert into color values(null,'4FC3F7');
insert into color values(null,'CDDC39');
insert into color values(null,'9E9E9E');
insert into color values (null,'FFFFFF');
insert into color values(null,'FFA726');

insert into stickyNote values(null,1,'2016-11-16',1,1,2);
insert into stickyNoteLine values(1,1,'Sample inside StickyNote');

alter table line add lineLegend varchar(50) after indexLine;