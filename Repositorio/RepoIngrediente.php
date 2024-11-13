<?php

class RepoIngrediente implements RepoCrud
{

    public static function nuevo($ingrediente) {
        // Obtener la conexión
        $con = Conexion::getConection();
        
        // Crear la consulta de inserción para la tabla INGREDIENTE
        $sql = "INSERT INTO INGREDIENTE (nombre, imagen, precio, descripcion) VALUES (:nombre, :imagen, :precio, :descripcion)";
        
        // Preparar la consulta para INGREDIENTE
        $consulta = $con->prepare($sql);
        
        // Crear un array con los parámetros necesarios para la consulta
        $parametros = [
            ':nombre' => $ingrediente->nombre,
            ':imagen' => $ingrediente->imagen,
            ':precio' => $ingrediente->precio,
            ':descripcion' => $ingrediente->descripcion
        ];
    
        // Ejecutar la consulta para INGREDIENTE
        if ($consulta->execute($parametros)) {
            // Si el INSERT fue exitoso, obtener el ID del ingrediente recién insertado
            $ingrediente->id = $con->lastInsertId();
            
            // Guardar los alérgenos asociados en INGREDIENTE_ALERGENOS
            $sql2 = "INSERT INTO INGREDIENTE_ALERGENOS (ingrediente_id, alergenos_id) VALUES (:ingrediente_id, :alergenos_id)";
            $subConsulta = $con->prepare($sql2);
    
            // Recorrer el array de alérgenos y asociarlos al ingrediente
            foreach ($ingrediente->alergenos as $alergeno) {
                $parametros2 = [
                    ':ingrediente_id' => $ingrediente->id,
                    ':alergenos_id' => $alergeno->id
                ];
                $subConsulta->execute($parametros2);
            }
    
            // Asignar los alérgenos al ingrediente desde el repositorio
            $ingrediente->alergenos = RepoAlergenos::alergenosIngrediente($ingrediente->id);
            
        } else {
            // Si la inserción falla, retornar null o lanzar una excepción
            $ingrediente = null;
        }
        return $ingrediente;
    }
    
    

    public static function findByID($id) {
        $ingrediente = null; // Inicializamos en null en caso de que no se encuentre el registro
        
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Crear la consulta para buscar el ingrediente por ID
        $sql = "SELECT * FROM INGREDIENTE WHERE id = :id";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Asignar el parámetro del ID
        $parametros = [':id' => $id];
        
        // Ejecutar la consulta
        $consulta->execute($parametros);
        
        // Obtener el resultado
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        
        // Si se encuentra el registro, asignamos el objeto a $ingrediente
        if ($fila) {
            $ingrediente = new Ingrediente(
                $fila["id"] ?? null,
                $fila["nombre"],
                $fila["imagen"] ?? null,
                $fila["precio"] ?? 0,
                $fila["descripcion"] ?? ""
            );
    
            // Obtener los alérgenos asociados al ingrediente
            $ingrediente->alergenos = RepoAlergenos::alergenosIngrediente($ingrediente->id);
        }
        
        // Devolver el objeto o null
        return $ingrediente;
    }
    
    public static function findByObj($ingrediente) {
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Crear la consulta para buscar el ingrediente por nombre
        $sql = "SELECT * FROM INGREDIENTE WHERE nombre = :nombre";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Asignar el parámetro del nombre
        $parametros = [':nombre' => $ingrediente->nombre];
        
        // Ejecutar la consulta
        $consulta->execute($parametros);
        
        // Obtener el resultado
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        
        // Si se encuentra el registro, creamos el objeto Ingrediente
        if ($fila) {
            $ingrediente = new Ingrediente(
                $fila["id"] ?? null,
                $fila["nombre"],
                $fila["imagen"] ?? null,
                $fila["precio"] ?? 0,
                $fila["descripcion"] ?? ""
            );
    
            // Obtener los alérgenos asociados
            $ingrediente->alergenos = RepoAlergenos::alergenosIngrediente($ingrediente->id);
        } else {
            $ingrediente = null;
        }
        
        return $ingrediente;
    }
    
    public static function update($ingrediente) {
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Crear la consulta de actualización
        $sql = "UPDATE INGREDIENTE SET nombre = :nombre, imagen = :imagen, precio = :precio, descripcion = :descripcion WHERE id = :id";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Asignar los parámetros usando las propiedades del objeto ingrediente
        $parametros = [
            ':id' => $ingrediente->id,
            ':nombre' => $ingrediente->nombre,
            ':imagen' => $ingrediente->imagen,
            ':precio' => $ingrediente->precio,
            ':descripcion' => $ingrediente->descripcion
        ];
        
        // Ejecutar la consulta
        if ($consulta->execute($parametros)) {
            // Actualizar los alérgenos en INGREDIENTE_ALERGENOS
            $sql2 = "DELETE FROM INGREDIENTE_ALERGENOS WHERE ingrediente_id = :ingrediente_id";
            $deleteConsulta = $con->prepare($sql2);
            $deleteConsulta->execute([':ingrediente_id' => $ingrediente->id]);
    
            $sql3 = "INSERT INTO INGREDIENTE_ALERGENOS (ingrediente_id, alergenos_id) VALUES (:ingrediente_id, :alergenos_id)";
            $subConsulta = $con->prepare($sql3);
    
            foreach ($ingrediente->alergenos as $alergeno) {
                $parametros2 = [
                    ':ingrediente_id' => $ingrediente->id,
                    ':alergenos_id' => $alergeno->id
                ];
                $subConsulta->execute($parametros2);
            }
        }else{
            $ingrediente=null;
        }
        return $ingrediente;
    }
    
    public static function delete($ingrediente) {
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Eliminar primero las relaciones con alérgenos
        $sql1 = "DELETE FROM INGREDIENTE_ALERGENOS WHERE ingrediente_id = :ingrediente_id";
        $consulta1 = $con->prepare($sql1);
        $consulta1->execute([':ingrediente_id' => $ingrediente->id]);
    
        // Crear la consulta de eliminación para el ingrediente
        $sql2 = "DELETE FROM INGREDIENTE WHERE id = :id";
        $consulta2 = $con->prepare($sql2);
    
        // Asignar el parámetro del ID del objeto ingrediente y ejecutar la consulta
        return $consulta2->execute([':id' => $ingrediente->id]);
    }
    
    public static function save($ingrediente) {
        // Buscar el ingrediente por nombre
        $ingredienteExistente = self::findByObj($ingrediente);
        
        if ($ingredienteExistente) {
            // Si existe, actualizarlo
            $ingrediente= self::update($ingrediente);
        } else {
            // Si no existe, crear uno nuevo
            $ingrediente= self::nuevo($ingrediente);
        }
        return $ingrediente;
    }
    
    public static function getAll() {
        // Obtener la conexión
        $con = Conexion::getConection();
        
        // Array para almacenar los objetos Ingrediente
        $ingredientes = [];
        
        // Crear la consulta SQL
        $sql = "SELECT * FROM INGREDIENTE";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Ejecutar la consulta
        if ($consulta->execute()) {
            // Recorremos los resultados utilizando un array asociativo
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                $ingrediente = new Ingrediente(
                    $fila["id"] ?? null,
                    $fila["nombre"],
                    $fila["imagen"] ?? null,
                    $fila["precio"] ?? 0,
                    $fila["descripcion"] ?? ""
                );
    
                // Obtener los alérgenos asociados al ingrediente
                $ingrediente->alergenos = RepoAlergenos::alergenosIngrediente($ingrediente->id);
    
                $ingredientes[] = $ingrediente;
            }
        }
        
        // Devolver el array de objetos Ingrediente
        return $ingredientes;
    }

    public static function ingredientesPorKebab($kebab_id) {
        // Obtener la conexión
        $con = Conexion::getConection();
        // Array para almacenar los ingredientes
        $ingredientes = [];
        
        // Crear la consulta SQL para obtener los ingredientes de un kebab específico
        $sql = "SELECT 
                    i.id AS ingrediente_id,
                    i.nombre AS ingrediente_nombre,
                    i.imagen AS ingrediente_imagen,
                    i.precio AS ingrediente_precio,
                    i.descripcion AS ingrediente_descripcion
                FROM 
                    ingrediente i
                JOIN 
                    kebab_ingredientes ki ON i.id = ki.ingrediente_id
                WHERE 
                    ki.kebab_id = :kebab_id";
        
        // Asignar el parámetro del ID del kebab
        $parametros = [':kebab_id' => $kebab_id];
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Ejecutar la consulta
        $resultado = $consulta->execute($parametros);
    
        // Verificar si la consulta se ejecutó correctamente
        if ($resultado) {
            // Recorremos los resultados
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                //echo "Obteniendo ingrediente: " . $fila["ingrediente_id"] . "<br>";
                // Crear el objeto Ingrediente
                $ingrediente = new Ingrediente(
                    $fila["ingrediente_id"] ?? null,
                    $fila["ingrediente_nombre"],
                    $fila["ingrediente_imagen"] ?? null,
                    $fila["ingrediente_precio"] ?? null,
                    $fila["ingrediente_descripcion"] ?? null
                );
                $ingrediente->alergenos = RepoAlergenos::alergenosIngrediente($fila["ingrediente_id"]);
                
                // Añadir el ingrediente al array
                $ingredientes[] = $ingrediente;
            }
        }
        
        // Devolver el array de ingredientes
        return $ingredientes;
    }
    
}