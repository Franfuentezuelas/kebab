<?php

class RepoLogin
{

    public static function usuarioExiste($usuario) {
        
        // Obtener la conexión
        $con = Conexion::getConection();
        $existe=false;
        // creo la consulta a la base de datos
        $sql="SELECT * FROM usuario where user = :user";
        
        // Preparar la consulta en la base de datos
        $consulta = $con->prepare($sql);
        
        // Crear un array con los parámetros necesarios para la consulta
        $parametros = [
            ':user' => $usuario
        ];
        
        // Ejecutar la consulta en la base de datos y verificar si fue exitosa
        if ($consulta->execute($parametros)) {
            $existe=true;
        }
        return $existe;
    }
    
    public static function login($usuario, $pass) {
        
        // Obtener la conexión
        $con = Conexion::getConection();
        $existe=false;
        // Crear la consulta de inserción en la base de datos
        $sql="SELECT * FROM usuario where usuario = :user AND pass = :pass" ;
        
        // Preparar la consulta en la base de datos
        $consulta = $con->prepare($sql);
        
        // Crear un array con los parámetros necesarios para la consulta
        $parametros = [
            ':user' => $usuario,
            ':pass' => $pass
        ];
        
        // Ejecutar la consulta en la base de datos y verificar si fue exitosa
        if ($consulta->execute($parametros)) {
            // Si el INSERT fue exitoso, se llama a findByObj para obtener el alérgeno completo
            $existe=false;
        } else {
            // Si el INSERT falla, devuelve null
            $alergeno=null;
        }
        return $alergeno;
    }
    
    

}