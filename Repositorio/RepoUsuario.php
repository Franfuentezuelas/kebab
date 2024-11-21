<?php

class RepoUsuario //implements RepoCrud

{
    public static function nuevo($usuario) {
        $con = Conexion::getConection();
        
        $sql = "INSERT INTO usuario (nombre, apellidos, telefono, usuario, pass, tipo, correo, carrito, saldo) 
                VALUES (:nombre, :apellidos, :telefono, :usuario, :pass, :tipo, :correo, :carrito, :saldo)";
        
        $consulta = $con->prepare($sql);
        
        $parametros = [
            ':nombre' => $usuario->nombre,
            ':apellidos' => $usuario->apellidos,
            ':telefono' => $usuario->telefono,
            ':usuario' => $usuario->usuario,
            ':pass' => $usuario->pass,
            ':tipo' => $usuario->tipo->value,
            ':correo' => $usuario->correo,
            ':carrito' => $usuario->carrito, // Asegúrate de que sea un JSON
            ':saldo' => $usuario->saldo
        ];

        if ($consulta->execute($parametros)) {
            $usuario->id = $con->lastInsertId();

            // Guardar direcciones del usuario
            foreach ($usuario->direcciones as $direccion) {
                $direccion->usuario_id = $usuario->id; // Asignar el ID del usuario a la dirección
                RepoDireccion::nuevo($direccion); // Llamar al repositorio de dirección
            }
        } else {
            $usuario = null;
        }
        return $usuario;
    }
    
    public static function findByID($id) {
       
        $con = Conexion::getConection();
        $sql = "SELECT * FROM usuario WHERE id = :id";
        $usuario=null;
        $consulta = $con->prepare($sql);
        $parametros = [':id' => $id];
        
        $consulta->execute($parametros);
        
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
     
        if ($fila) {
           
            // Crear el objeto Usuario con los datos recuperados de la base de datos
            $usuario = new Usuario(
                $fila["id"],
                $fila["nombre"],
                $fila["apellidos"],
                $fila["telefono"],
                $fila["usuario"],
                $fila["pass"],
                Tipo::from($fila["tipo"]), // tengo que hacer que sea un enum Tipo
                $fila["correo"],
                $fila["carrito"],
                $fila["saldo"],
                RepoDireccion::findByUsuarioId($fila["id"]), // Recuperar direcciones del usuario
                RepoAlergenos::alergenosPorUsuario($fila["id"]) // Recuperar pedidos del usuario
                
            );
          
        }

        return $usuario;
    }
    
    

    public static function findByUser($usuario) {
        $con = Conexion::getConection();
        $sql = "SELECT * FROM Usuario WHERE usurio like upper(:usuario)";
        
        $consulta = $con->prepare($sql);
        $parametros = [':usuario' => $usuario];
        
        $consulta->execute($parametros);
        $usuario = null;
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if ($fila) {
            $usuario = new Usuario(
                $fila["id"],
                $fila["nombre"],
                $fila["apellidos"],
                $fila["telefono"],
                $fila["usuario"],
                $fila["pass"],
                Tipo::from($fila["tipo"]), // Convertir tipo a enum
                $fila["correo"],
                $fila["carrito"], // Decodificar carrito
                $fila["saldo"],
                RepoDireccion::findByUsuarioId($fila["id"]), // Cargar direcciones del usuario
                RepoPedido::getByUsuarioId($fila["id"]) // Cargar pedidos del usuario
            );
        }
        return $usuario;
    }

    public static function login($usuario, $pass) {
        $con = Conexion::getConection();
        $sql = "SELECT * FROM Usuario WHERE usuario like upper(:usuario) and pass like upper(:pass)";
        
        $consulta = $con->prepare($sql);
        $parametros = [':usuario' => $usuario,
                    ':pass' => $pass];
        
        $consulta->execute($parametros);
        $usuario = null;
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if ($fila) {
            $usuario = new Usuario(
                $fila["id"],
                $fila["nombre"],
                $fila["apellidos"],
                $fila["telefono"],
                $fila["usuario"],
                $fila["pass"],
                Tipo::from($fila["tipo"]), // Convertir tipo a enum
                $fila["correo"],
                $fila["carrito"], // Decodificar carrito
                $fila["saldo"],
                RepoDireccion::findByUsuarioId($fila["id"]), // Cargar direcciones del usuario
                
            );
        }
        return $usuario;
    }

    public static function findByObj($usuario) {
        $con = Conexion::getConection();
        $sql = "SELECT * FROM Usuario WHERE usuario = :usuario OR correo = :correo";
        
        $consulta = $con->prepare($sql);
        $parametros = [
            ':usuario' => $usuario->usuario,
            ':correo' => $usuario->correo
        ];
        
        $consulta->execute($parametros);
        $user = null;
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if ($fila) {
            $user = new Usuario(
                $fila["id"],
                $fila["nombre"],
                $fila["apellidos"],
                $fila["telefono"],
                $fila["usuario"],
                $fila["pass"],
                Tipo::from($fila["tipo"]), // Convertir tipo a enum
                $fila["correo"],
                $fila["carrito"], // Decodificar carrito
                $fila["saldo"],
                RepoDireccion::findByUsuarioId($fila["id"]), // Cargar direcciones del usuario
                RepoPedido::getByUsuarioId($fila["id"]) // Cargar pedidos del usuario
            );
        }
        return $user;
    }
    
    
    public static function update($usuario) {
        $con = Conexion::getConection();
        $sql = "UPDATE Usuario SET nombre = :nombre, apellidos = :apellidos, telefono = :telefono, 
                usuario = :usuario, pass = :pass, tipo = :tipo, correo = :correo, 
                carrito = :carrito, saldo = :saldo WHERE id = :id";
        
        $consulta = $con->prepare($sql);
        
        $parametros = [
            ':id' => $usuario->id,
            ':nombre' => $usuario->nombre,
            ':apellidos' => $usuario->apellidos,
            ':telefono' => $usuario->telefono,
            ':usuario' => $usuario->usuario,
            ':pass' => $usuario->pass,
            ':tipo' => $usuario->tipo->value,
            ':correo' => $usuario->correo,
            ':carrito' => $usuario->carrito,
            ':saldo' => $usuario->saldo
        ];
        // el metodo update devuelve el usuario ya modificado o null si no se puede realizar la modificacion
        return $consulta->execute($parametros) ? $usuario : null;
    }

public static function updateCarro($id) {
    // Obtener la conexión a la base de datos
    $con = Conexion::getConection();

    // Consulta SQL con parámetro preparado
    $sql = "UPDATE Usuario SET carrito = null WHERE id = :id";

    // Preparar la consulta
    $consulta = $con->prepare($sql);
    
    // Asignar el valor del parámetro
    $parametros = [':id' => $id];

    // Ejecutar la consulta
    $consulta->execute($parametros);

    // Comprobar si alguna fila fue afectada
    return $consulta->rowCount() > 0;
}
    

    public static function delete($usuario) {
        $con = Conexion::getConection();
        $sql = "DELETE FROM Usuario WHERE id = :id";
        
        $consulta = $con->prepare($sql);
        $parametros = [':id' => $usuario->id];
        
        return $consulta->execute($parametros);
    }

    public static function getAll() {
        $con = Conexion::getConection();
        $usuarios = [];
        
        $sql = "SELECT * FROM Usuario";
        
        $consulta = $con->prepare($sql);
        $consulta->execute();
        
        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $usuarios[] = new Usuario(
                $fila["id"],
                $fila["nombre"],
                $fila["apellidos"],
                $fila["telefono"],
                $fila["usuario"],
                $fila["pass"],
                Tipo::from($fila["tipo"]),
                $fila["correo"],
                $fila["carrito"],
                $fila["saldo"],
                RepoDireccion::findByUsuarioId($fila["id"]) // Cargar direcciones del usuario
            );
        }
        return $usuarios;
    }
}