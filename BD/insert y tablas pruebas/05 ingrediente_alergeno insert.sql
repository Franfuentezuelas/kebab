-- Alergenos para los ingredientes de kebabs
INSERT INTO ingrediente_alergenos (ingrediente_idingrediente, alergenos_idalergenos) VALUES
-- Pan de Pita contiene Gluten
((SELECT idingrediente FROM ingrediente WHERE nombre = 'Pan de Pita'), 
 (SELECT idalergenos FROM alergenos WHERE nombre = 'Gluten')),

-- Tortilla de Trigo contiene Gluten
((SELECT idingrediente FROM ingrediente WHERE nombre = 'Tortilla de Trigo'), 
 (SELECT idalergenos FROM alergenos WHERE nombre = 'Gluten')),

-- Pan Libanés contiene Gluten
((SELECT idingrediente FROM ingrediente WHERE nombre = 'Pan Libanés'), 
 (SELECT idalergenos FROM alergenos WHERE nombre = 'Gluten')),

-- Lechuga (sin alérgenos)
-- ((SELECT idingrediente FROM ingrediente WHERE nombre = 'Lechuga'), NULL),

-- Tomate (sin alérgenos)
-- ((SELECT idingrediente FROM ingrediente WHERE nombre = 'Tomate'), NULL),

-- Cebolla (sin alérgenos)
-- ((SELECT idingrediente FROM ingrediente WHERE nombre = 'Cebolla'), NULL),

-- Pepino (sin alérgenos)
-- ((SELECT idingrediente FROM ingrediente WHERE nombre = 'Pepino'), NULL),

-- Pimiento (sin alérgenos)
-- ((SELECT idingrediente FROM ingrediente WHERE nombre = 'Pimiento'), NULL),

-- Queso contiene Lácteos
((SELECT idingrediente FROM ingrediente WHERE nombre = 'Queso'), 
 (SELECT idalergenos FROM alergenos WHERE nombre = 'Lácteos')),

-- Salsa Yogur contiene Lácteos
((SELECT idingrediente FROM ingrediente WHERE nombre = 'Salsa Yogur'), 
 (SELECT idalergenos FROM alergenos WHERE nombre = 'Lácteos')),

-- Salsa Picante (sin alérgenos)
((SELECT idingrediente FROM ingrediente WHERE nombre = 'Salsa Picante'), 
(SELECT idalergenos FROM alergenos WHERE nombre = 'Soja')),

-- Pollo (sin alérgenos)
-- ((SELECT idingrediente FROM ingrediente WHERE nombre = 'Pollo'), NULL),

-- Ternera (sin alérgenos)
-- ((SELECT idingrediente FROM ingrediente WHERE nombre = 'Ternera'), NULL),

-- Cordero (sin alérgenos)
-- ((SELECT idingrediente FROM ingrediente WHERE nombre = 'Cordero'), NULL),

-- Falafel contiene Gluten y Frutos de Cáscara (sésamo)
((SELECT idingrediente FROM ingrediente WHERE nombre = 'Falafel'), 
 (SELECT idalergenos FROM alergenos WHERE nombre = 'Gluten')),
((SELECT idingrediente FROM ingrediente WHERE nombre = 'Falafel'), 
 (SELECT idalergenos FROM alergenos WHERE nombre = 'Frutos de Cáscara')),

-- Queso de Cabra contiene Lácteos
((SELECT idingrediente FROM ingrediente WHERE nombre = 'Queso de Cabra'), 
 (SELECT idalergenos FROM alergenos WHERE nombre = 'Lácteos')),

-- Huevo contiene Huevos
((SELECT idingrediente FROM ingrediente WHERE nombre = 'Huevo'), 
 (SELECT idalergenos FROM alergenos WHERE nombre = 'Huevos')),

-- Zanahoria (sin alérgenos)
-- ((SELECT idingrediente FROM ingrediente WHERE nombre = 'Zanahoria'), NULL),

-- Salsa Mahonesa contiene Huevos
((SELECT idingrediente FROM ingrediente WHERE nombre = 'Salsa Mahonesa'), 
 (SELECT idalergenos FROM alergenos WHERE nombre = 'Huevos'));
