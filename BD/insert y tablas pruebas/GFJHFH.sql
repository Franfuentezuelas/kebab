select * from localidad where nombreloc like upper("prioro");
select * from usuario;
select * from direccion;

select * from alergenos;

ALTER TABLE direccion
CHANGE COLUMN usuario_id1 usuario_id int;

select * from direccion where usuario_id=101;

DELETE FROM direccion
WHERE iddireccion <> 9 and usuario_id = 1;
