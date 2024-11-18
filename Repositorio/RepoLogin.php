<?php

class RepoLogin
{

    public static function usuarioExiste($usuario) {
        
        // Obtener la conexión
        $con = Conexion::getConection();
        $existe="false";
        // creo la consulta a la base de datos
        $sql="SELECT * FROM usuario where usuario like :usuario ";
        
        // Preparar la consulta en la base de datos
        $consulta = $con->prepare($sql);
        
        // Crear un array con los parámetros necesarios para la consulta
        $parametros = [
            ':usuario' => $usuario
        ];
        
        // Ejecutar la consulta en la base de datos y verificar si fue exitosa
        if ($consulta->execute($parametros)) {
            // Si el select tiene respuesta es que el usuario existe
            if($consulta->rowCount()>0){
                $existe="true";
            }
        }
        return $existe;
    }
    
    public static function login($usuario, $pass) {
        
        // Obtener la conexión
        $con = Conexion::getConection();
        $existe="false";
        // Crear la consulta de inserción en la base de datos
        $sql="SELECT * FROM usuario where usuario like :usuario AND pass like :pass " ;
        
        // Preparar la consulta en la base de datos
        $consulta = $con->prepare($sql);
        
        // Crear un array con los parámetros necesarios para la consulta
        $parametros = [
            ':usuario' => $usuario,
            ':pass' => $pass
        ];
        
        // Ejecutar la consulta en la base de datos y verificar si fue exitosa
        if ($consulta->execute($parametros)) {
            // Si el select tiene respuesta es que el usuario existe
            if($consulta->rowCount()>0){
                $existe="true";
            }
        }
        return $existe;
    }
    
    

}