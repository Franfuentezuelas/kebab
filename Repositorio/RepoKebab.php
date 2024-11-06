<?php

class Repokebab implements RepoCrud
{
    public static function nuevo($kebab) {
        // Obtener la conexión
        $con = Conexion::getConection();
        
        // Crear la consulta de inserción para la tabla KEBAB
        $sql = "INSERT INTO KEBAB (nombre, foto, precio, descripcion, kebab_id) VALUES (:nombre, :foto, :precio, :descripcion, :kebab_id)";
        
        // Preparar la consulta para KEBAB
        $consulta = $con->prepare($sql);
        
        // Crear un array con los parámetros necesarios para la consulta
        $parametros = [
            ':nombre' => $kebab->nombre,
            ':foto' => $kebab->foto,
            ':precio' => $kebab->precio,
            ':descripcion' => $kebab->descripcion,
            ':kebab_id' => $kebab->kebab_id
        ];
    
        // Ejecutar la consulta para KEBAB
        if ($consulta->execute($parametros)) {
            // Si el INSERT fue exitoso, obtener el ID del kebab recién insertado
            $kebab->id = $con->lastInsertId();
            
            // Guardar los ingredientes asociados en KEBAB_INGREDIENTES
            $sql2 = "INSERT INTO KEBAB_INGREDIENTES (kebab_id, ingrediente_id) VALUES (:kebab_id, :ingrediente_id)";
            $subConsulta = $con->prepare($sql2);
    
            // Recorrer el array de ingredientes y asociarlos al kebab
            foreach ($kebab->ingredientes as $ingrediente) {
                $parametros2 = [
                    ':kebab_id' => $kebab->id,
                    ':ingrediente_id' => $ingrediente->id
                ];
                $subConsulta->execute($parametros2);
            }
    
            // Asignar los ingredientes al kebab desde el repositorio
            $kebab->ingredientes = RepoIngrediente::ingredientesPorKebab($kebab->id);
        } else {
            // Si la inserción falla, retornar null o lanzar una excepción
            $kebab = null;
        }
        return $kebab;
    }
    
    public static function findByID($id) {
        $kebab = null; // Inicializamos en null en caso de que no se encuentre el registro
        
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Crear la consulta para buscar el kebab por ID
        $sql = "SELECT * FROM KEBAB WHERE id = :id";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Asignar el parámetro del ID
        $parametros = [':id' => $id];
        
        // Ejecutar la consulta
        $consulta->execute($parametros);
        
        // Obtener el resultado
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        
        // Si se encuentra el registro, asignamos el objeto a $kebab
        if ($fila) {
            //echo "busco los ingredientes del kebab con id ".$fila["id"]."<br>";
            $ingredientes =RepoIngrediente::ingredientesPorKebab($fila["id"]); // Obtener los ingredientes del kebab con alérgenos incluidos
            //echo "se esta creando el kebab con id ".$fila["id"]."<br>";
            $kebab = new Kebab(
                $fila["id"] ?? null,
                $fila["nombre"],
                $fila["foto"] ?? null,
                $fila["precio"] ?? 0,
                $fila["descripcion"] ?? "",
                $ingredientes,
                $fila["kebab_id"] ?? null
            );

            
            //echo $kebab->getIngredientesIds();
            //echo $kebab->getIngredientes();
        }
        
        // Devolver el objeto o null
        return $kebab;
    }

    public static function findByObj($kebab) {
               
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Crear la consulta para buscar el kebab por ID
        $sql = "SELECT * FROM KEBAB WHERE nombre = :nombre";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Asignar el parámetro del ID
        $parametros = [':nombre' => $kebab->nombre];
        
        // Ejecutar la consulta
        $consulta->execute($parametros);
        
        // Obtener el resultado
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        
        // Si se encuentra el registro, asignamos el objeto a $kebab
        if ($fila) {
            $kebab = new Kebab(
                $fila["id"] ?? null,
                $fila["nombre"],
                $fila["foto"] ?? null,
                $fila["precio"] ?? 0,
                $fila["descripcion"] ?? "",
                RepoIngrediente::ingredientesPorKebab($fila["id"]), // Obtener los ingredientes del kebab con alérgenos incluidos
                $fila["kebab_id"] ?? null
            );
        }else{
            $kebab=null;
        }
        
        // Devolver el objeto o null
        return $kebab;
    }

    public static function findByIngredientes($kebab_id, $ingredientes, $kebab) {
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Construir la lista dinámica de parámetros para los ingredientes en el IN
        $ingredienteParams = [];
        $ingredientesStr = [];
    
        foreach ($ingredientes as $index => $ingrediente) {
            $param = ":ingrediente" . $index;
            $ingredientesStr[] = $param;
            $ingredienteParams[$param] = $ingrediente->id;
        }
        
        // Unir los parámetros de ingredientes en el IN
        $ingredientesStr = implode(',', $ingredientesStr);
    
        // Crear la consulta SQL para buscar kebabs que coincidan con el kebab_id y los ingredientes
        $sql = "SELECT k.*
                FROM kebab k
                JOIN kebab_ingredientes ki ON k.id = ki.kebab_id
                WHERE k.kebab_id = :kebab_id 
                GROUP BY k.id
                HAVING COUNT(DISTINCT ki.ingrediente_id) = :num_ingredientes  -- Debe tener 4 ingredientes
                AND SUM(CASE WHEN ki.ingrediente_id IN ($ingredientesStr) THEN 1 ELSE 0 END) = :num_ingredientes  -- Todos los ingredientes deben ser los deseados
                AND COUNT(*) = :num_ingredientes";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
    
        // Asignar los parámetros
        $parametros = array_merge(
            [':kebab_id' => $kebab_id, ':num_ingredientes' => count($ingredientes)],
            $ingredienteParams
        );
        // Ejecutar la consulta
        $consulta->execute($parametros);
    
        // Obtener el resultado
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        $kebabNueno = null;
    
        if ($fila) {
            $kebabNueno = new Kebab(
                $fila["id"] ?? null,
                $fila["nombre"],
                $fila["foto"] ?? null,
                $kebab->precio,
                $fila["descripcion"] ?? "",
                RepoIngrediente::ingredientesPorKebab($fila["id"]), // Obtener los ingredientes del kebab con alérgenos incluidos
                $fila["kebab_id"] ?? null
            );
        }
    
        // Si no encuentra ninguno personalizado, crear uno nuevo
        if (is_null($kebabNueno)) {
            $kebabNueno = RepoKebab::nuevo($kebab);
        }else{
            $kebabNueno = self::update($kebab);
        }
    
        // Devolver el kebab nuevo o encontrado
        return $kebabNueno;
    }

    public static function update($kebab) {
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Crear la consulta de actualización
        $sql = "UPDATE KEBAB SET nombre = :nombre, foto = :foto, precio = :precio, descripcion = :descripcion, kebab_id = :kebab_id WHERE id = :id";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Asignar los parámetros usando las propiedades del objeto kebab
        $parametros = [
            ':id' => $kebab->id,
            ':nombre' => $kebab->nombre,
            ':foto' => $kebab->foto,
            ':precio' => $kebab->precio,
            ':descripcion' => $kebab->descripcion,
            ':kebab_id' => $kebab->kebab_id
        ];
        
        // Ejecutar la consulta
        if ($consulta->execute($parametros)) {
            // Actualizar los ingredientes en KEBAB_INGREDIENTES
            $sql2 = "DELETE FROM KEBAB_INGREDIENTES WHERE kebab_id = :kebab_id";
            $deleteConsulta = $con->prepare($sql2);
            $deleteConsulta->execute([':kebab_id' => $kebab->id]);
    
            $sql3 = "INSERT INTO KEBAB_INGREDIENTES (kebab_id, ingrediente_id) VALUES (:kebab_id, :ingrediente_id)";
            $subConsulta = $con->prepare($sql3);
    
            foreach ($kebab->ingredientes as $ingrediente) {
                $parametros2 = [
                    ':kebab_id' => $kebab->id,
                    ':ingrediente_id' => $ingrediente->id
                ];
                $subConsulta->execute($parametros2);
            }
            
            // Actualizar los ingredientes del kebab desde el repositorio
            $kebab->ingredientes = RepoIngrediente::ingredientesPorKebab($kebab->id);
        }else{
            $kebab=null;
        }
        
        return $kebab;
    }

    public static function delete($kebab) {
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Eliminar primero las relaciones con ingredientes
        $sql1 = "DELETE FROM KEBAB_INGREDIENTES WHERE kebab_id = :kebab_id";
        $consulta1 = $con->prepare($sql1);
        $consulta1->execute([':kebab_id' => $kebab->id]);
    
        // Crear la consulta de eliminación para el kebab
        $sql2 = "DELETE FROM KEBAB WHERE id = :id";
        $consulta2 = $con->prepare($sql2);
    
        // Asignar el parámetro del ID del objeto kebab y ejecutar la consulta
        return $consulta2->execute([':id' => $kebab->id]);
    }
    
    public static function save($kebab) {
        // Buscar el kebab por nombre u otra propiedad única
        $kebabExistente = self::findByObj($kebab);
        
        if ($kebabExistente) {
            // Si existe, actualizarlo
            $kebabExistente= self::update($kebab);
        } else {
            // Si no existe, crear uno nuevo
            $kebabExistente= self::nuevo($kebab);
        }
        return $kebabExistente;
    }
    
    public static function getAll() {
        // Obtener la conexión
        $con = Conexion::getConection();
        
        // Array para almacenar los objetos Kebab
        $kebabs = [];
        
        // Crear la consulta SQL
        $sql = "SELECT * FROM KEBAB";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Ejecutar la consulta
        if ($consulta->execute()) {
            // Recorremos los resultados utilizando un array asociativo
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                $kebab = new Kebab(
                    $fila["id"] ?? null,
                    $fila["nombre"],
                    $fila["foto"] ?? null,
                    $fila["precio"] ?? 0,
                    $fila["descripcion"] ?? "",
                    RepoIngrediente::ingredientesPorKebab($fila["id"]), // Obtener ingredientes con alérgenos
                    $fila["kebab_id"] ?? null
                );
                $kebabs[] = $kebab;
            }
        }
        // Devolver el array de objetos Kebab
        return $kebabs;
    }

    public static function getCarta() {
        // Obtener la conexión
        $con = Conexion::getConection();
        
        // Array para almacenar los objetos Kebab
        $kebabs = [];
        
        // Crear la consulta SQL
        $sql = "SELECT * FROM KEBAB where kebab_id is null";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Ejecutar la consulta
        if ($consulta->execute()) {
            // Recorremos los resultados utilizando un array asociativo
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                $kebab = new Kebab(
                    $fila["id"] ?? null,
                    $fila["nombre"],
                    $fila["foto"] ?? null,
                    $fila["precio"] ?? 0,
                    $fila["descripcion"] ?? "",
                    RepoIngrediente::ingredientesPorKebab($fila["id"]), // Obtener ingredientes con alérgenos
                    $fila["kebab_id"] ?? null
                );
                $kebabs[] = $kebab;
            }
        }
        // Devolver el array de objetos Kebab
        return $kebabs;
    }
}
