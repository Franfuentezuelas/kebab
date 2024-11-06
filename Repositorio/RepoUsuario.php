<?php

class RepoUsuario implements RepoCrud
{
    public static function nuevo($usuario) {
        $con = Conexion::getConection();
        
        $sql = "INSERT INTO Usuario (nombre, apellidos, telefono, usuario, pass, tipo, correo, carrito, saldo) 
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
            ':carrito' => json_encode($usuario->carrito), // Asegúrate de que sea un JSON
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
        $sql = "SELECT * FROM Usuario WHERE id = :id";
        
        $consulta = $con->prepare($sql);
        $parametros = [':id' => $id];
        
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
                json_decode($fila["carrito"], true), // Decodificar carrito
                $fila["saldo"],
                RepoDireccion::findByUsuarioId($fila["id"]), // Cargar direcciones del usuario
                RepoPedido::getByUsuarioId($fila["id"]) // Cargar pedidos del usuario
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
                json_decode($fila["carrito"], true), // Decodificar carrito
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
            ':carrito' => json_encode($usuario->carrito),
            ':saldo' => $usuario->saldo
        ];
        // el metodo update devuelve el usuario ya modificado o null si no se puede realizar la modificacion
        return $consulta->execute($parametros) ? $usuario : null;
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
                json_decode($fila["carrito"], true),
                $fila["saldo"],
                RepoDireccion::findByUsuarioId($fila["id"]) // Cargar direcciones del usuario
            );
        }
        
        return $usuarios;
    }
}
