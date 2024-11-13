<?php

class RepoAlergenos implements RepoCrud
{

    /**
     * @param mixed $alergeno
     * 
     * @return [type]
     */
    public static function nuevo($alergeno) {
        
        // Obtener la conexión
        $con = Conexion::getConection();
        
        // Crear la consulta de inserción en la base de datos
        $sql = "INSERT INTO ALERGENOS (nombre, imagen) VALUES (:nombre, :imagen)";
        
        // Preparar la consulta en la base de datos
        $consulta = $con->prepare($sql);
        
        // Crear un array con los parámetros necesarios para la consulta
        $parametros = [
            ':nombre' => $alergeno->nombre,
            ':imagen' => $alergeno->imagen
        ];
        
        // Ejecutar la consulta en la base de datos y verificar si fue exitosa
        if ($consulta->execute($parametros)) {
            // Si el INSERT fue exitoso, se llama a findByObj para obtener el alérgeno completo
            $alergeno=self::findByObj($alergeno);
        } else {
            // Si el INSERT falla, devuelve null
            $alergeno=null;
        }
        return $alergeno;
    }
    

    /**
     * @param mixed $id
     * 
     * @return [type]
     */
    public static function findByID($id) {
        $alergeno = null; // Inicializamos en null
    
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
    
        // Crear la consulta para buscar el alérgeno por ID
        $sql = "SELECT * FROM ALERGENOS WHERE id = :id";
    
        // Preparar la consulta
        $consulta = $con->prepare($sql);
    
        // Asignar el parámetro del ID
        $parametros = [':id' => $id];
    
        // Ejecutar la consulta
        $consulta->execute($parametros);
    
        // Obtener el resultado
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
    
        // Si se encuentra el registro, asignamos el objeto a $alergeno
        if ($fila) {
            $alergeno = new Alergenos(
                $fila["id"] ?? null,     // ID del alérgeno, puede ser null si no está presente
                $fila["nombre"],         // Nombre del alérgeno
                $fila["imagen"] ?? null  // Imagen del alérgeno, opcional
            );
        }
    
        // Devolver el objeto encontrado o null
        return $alergeno;
    }
    
    

    public static function findByObj($alergeno){
        // aqui tengo que utilizar la conexion
        $con=Conexion::getConection();
        // creo la consulta a la base de datos
        $sql="SELECT * FROM ALERGENOS where nombre = :nombre";
        // preparo la consulta a base de datos
        $consulta = $con -> prepare($sql);
        // creo un array con los parametros necesarios para la consulta
        $parametros = array(':nombre' => $alergeno.nombre);
        // realizo la consulta a la base de datos pasando el array acosiativo de parametros
        $consulta->execute($parametros);
        $fila=$consulta->fetch(PDO::FETCH_ASSOC);

        // aqui es solo un if por que busco si hay uno
        if($fila){
        // de esta forma recorro los resultados utilizando un array asociativo en los resultados
        // aqui compongo el objeto
        $alergeno = new Alergenos(
            $fila["id"] ?? null,     // ID del alérgeno, puede ser null si no está presente
            $fila["nombre"],         // Nombre del alérgeno
            $fila["imagen"] ?? null  // Imagen del alérgeno, opcional
        );
        }
        // devuelvo el objeto
        return $alergeno;
    }

    public static function update($alergeno) {
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Crear la consulta de actualización
        $sql = "UPDATE ALERGENOS SET nombre = :nombre, imagen = :imagen WHERE id = :id";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Asignar los parámetros usando las propiedades del objeto alérgeno
        $parametros = [
            ':id' => $alergeno->id,
            ':nombre' => $alergeno->nombre,
            ':imagen' => $alergeno->imagen
        ];
        
        // Ejecutar la consulta
        if ($consulta->execute($parametros)) {
            // Si la actualización fue exitosa, asignar el objeto alérgeno a la variable de resultado
            $resultado = $alergeno;
        } else {
            // Si falló, asignar null a la variable de resultado
            $resultado = null;
        }
    
        // Devolver el resultado al final de la función
        return $resultado;
    }
    
    
    public static function delete($alergeno) {
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Crear la consulta de eliminación
        $sql = "DELETE FROM ALERGENOS WHERE id = :id";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        
        // Asignar el parámetro del ID del objeto alérgeno
        $parametros = [':id' => $alergeno->id];
        
        // Ejecutar la consulta y devolver el resultado TRUE/FALSE
        return $consulta->execute($parametros);
    }
    
    public static function save($alergeno) {
        // Buscar el alérgeno por objeto
        $alergenoExistente = self::findByObj($alergeno);
        
        if ($alergenoExistente) {
            // Si existe, actualizarlo
            $alergeno = self::update($alergeno);
        } else {
            // Si no existe, crear uno nuevo
            $alergeno =self::nuevo($alergeno);
        }
        return $alergeno;
    }

    public static function getAll() {
        // Obtener la conexión
        $con = Conexion::getConection();
        // Array para almacenar los objetos de marcas
        $alergenos = [];
        // Crear la consulta SQL
        $sql = "SELECT * FROM ALERGENOS";
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        // Ejecutar la consulta
        $resultado = $consulta->execute();
        // Verificar si la consulta se ejecutó correctamente
        if ($resultado) {
            // Recorremos los resultados utilizando un array asociativo
            while ($fila = $consulta->fetch()) { // si utilizo en el parentesis de fetch PDO::FETCH_ASSOC solamente trabajo con un array asociativo
                // Creamos el objeto Marca y lo agregamos al array de marcas
                $alergeno = new Alergenos(
                    $fila["id"] ?? null,     // ID del alérgeno, puede ser null si no está presente
                    $fila["nombre"],         // Nombre del alérgeno
                    $fila["imagen"] ?? null  // Imagen del alérgeno, opcional
                );
                $alergenos[] = $alergeno;
            }
        }
        // Devolver el array de objetos Alergenos
        return $alergenos;
    }

    public static function alergenosIngrediente($id) {
        // Obtener la conexión
        $con = Conexion::getConection();
        // Array para almacenar los objetos de marcas
        $alergenos = [];
        // Crear la consulta SQL
        $sql = "SELECT i.id AS ingrediente_id,
                    i.nombre AS ingrediente_nombre,
                    a.id AS alergenos_id,
                    a.nombre AS alergenos_nombre,
                    a.imagen AS alergenos_imagen
                FROM ingrediente i
                JOIN ingrediente_alergenos ia ON i.id = ia.ingrediente_id
                JOIN alergenos a ON ia.alergenos_id = a.id
                where i.id= :id";

        // Asignar el parámetro del ID del objeto alérgeno
        $parametros = [':id' => $id];
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        // Ejecutar la consulta
        $resultado = $consulta->execute($parametros);
        // Verificar si la consulta se ejecutó correctamente
        if ($resultado) {
            // Recorremos los resultados utilizando un array asociativo
            while ($fila = $consulta->fetch()) { // si utilizo en el parentesis de fetch PDO::FETCH_ASSOC solamente trabajo con un array asociativo
                // Creamos el objeto Marca y lo agregamos al array de marcas
                $alergeno = new Alergenos(
                    $fila["alergenos_id"] ?? null,     // ID del alérgeno, puede ser null si no está presente
                    $fila["alergenos_nombre"],         // Nombre del alérgeno
                    $fila["alergenos_imagen"] ?? null  // Imagen del alérgeno, opcional
                );
                $alergenos[] = $alergeno;
            }
        }
        // Devolver el array de objetos Alergenos
        return $alergenos;
    }

    public static function alergenosPorUsuario($usuario_id) {
        // Obtener la conexión a la base de datos
        $con = Conexion::getConection();
        
        // Array para almacenar los objetos Alergenos
        $alergenos = [];
    
        // Consulta SQL para obtener los alérgenos asociados al usuario
        $sql = "SELECT a.id AS alergenos_id,
                       a.nombre AS alergenos_nombre,
                       a.imagen AS alergenos_imagen
                FROM alergenos a
                JOIN usuario_alergenos ua ON a.id = ua.alergenos_id
                WHERE ua.usuario_id = :usuario_id";
        
        // Preparar la consulta
        $consulta = $con->prepare($sql);
    
        // Asignar el parámetro `usuario_id` para la consulta
        $parametros = [':usuario_id' => $usuario_id];
        
        // Ejecutar la consulta
        $resultado = $consulta->execute($parametros);
    
        // Verificar si la consulta se ejecutó correctamente
        if ($resultado) {
            // Recorremos los resultados y creamos objetos Alergenos
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                $alergeno = new Alergenos(
                    $fila["alergenos_id"],      // ID del alérgeno
                    $fila["alergenos_nombre"],          // Nombre del alérgeno
                    $fila["alergenos_imagen"] ?? null   // Imagen del alérgeno
                );
                $alergenos[] = $alergeno;
            }
        }
        
        // Devolver el array de objetos Alergenos
        return $alergenos;
    }
    

}