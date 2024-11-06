select * from alergenos;
select * from ingrediente;
select * from kebab;
SELECT 
    i.id,
    i.nombre AS nombre_ingrediente,
    a.id,
    a.nombre AS nombre_alergeno,
    a.imagen AS imagen_alergeno
FROM 
    ingrediente i
LEFT JOIN 
    ingrediente_alergenos ia ON i.id = ia.ingrediente_id
LEFT JOIN 
    alergenos a ON ia.alergenos_id = a.id
ORDER BY 
    i.nombre;
select  * from kebab;

select * from kebab_ingredientes
;

SELECT 
    k.idkebab,
    k.nombre AS kebab_nombre,
    k.foto AS kebab_foto,
    k.precio AS kebab_precio,
    k.descripcion AS kebab_descripcion,
    k.estado AS kebab_estado,
    i.idingrediente,
    i.nombre AS ingrediente_nombre,
    i.imagen AS ingrediente_imagen,
    i.precio AS ingrediente_precio,
    i.descripcion AS ingrediente_descripcion
FROM 
    mykebab.kebab k
JOIN 
    mykebab.kebab_ingredientes ki ON k.id = ki.kebab_id
JOIN 
    mykebab.ingrediente i ON ki.ingrediente_id = i.id;

TRUNCATE TABLE kebap_ingredientes; -- de esta forma borro la tabla y reinicio el autocontador

TRUNCATE TABLE kebap; -- de esta forma borro la tabla y reinicio el autocontador


SET FOREIGN_KEY_CHECKS = 1;


ALTER TABLE provincia
ADD COLUMN codprov int NOT NULL,
ADD UNIQUE (codprov);

SELECT 
    usuario.id AS usuario_id,
    usuario.nombre AS usuario_nombre,
    alergenos.nombre AS alergeno_nombre
FROM 
    usuario 
JOIN 
    usuario_alergenos ON usuario.id = usuario_alergenos.usuario_id
JOIN 
    alergenos ON usuario_alergenos.alergenos_id = alergenos.id;

