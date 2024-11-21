<?php

class RepoPedido
{
    public static function nuevo(Pedido $pedido) {
        $con = Conexion::getConection();

        // Preparar la consulta SQL para insertar un nuevo pedido
        $sql = "INSERT INTO pedido (importe, usuario_id, direccion)
                VALUES (:importe, :usuario_id, :direccion)";
        
        $consulta = $con->prepare($sql);
        
        // Establecer los parámetros de la consulta
        $parametros = [
            ':importe' => $pedido->importe,
            ':usuario_id' => $pedido->usuario_id,
            ':direccion' => $pedido->direccion // Convertir a JSON si es necesario
        
        ];

        // Ejecutar la consulta
        if ($consulta->execute($parametros)) {
            $pedido->id=$con->lastInsertId(); // Asignar el ID autogenerado al objeto Pedido
        } else {
            // Manejar el error según sea necesario
            $pedido = null;
        }

        return $pedido;
    }

    public static function findByID(int $id) {
        $con = Conexion::getConection();
        $sql = "SELECT * FROM pedido WHERE id = :id";
        
        $consulta = $con->prepare($sql);
        $parametros = [':id' => $id];
        
        $consulta->execute($parametros);
        $pedido = null;
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if ($fila) {
            $pedido = new Pedido(
                $fila["id"],
                $fila["usuario_id"],
                new DateTime($fila["fecha"]), // Crear el objeto DateTime a partir de la fecha de la base de datos
                $fila["direccion"], // Se asume que ya está en formato string
                Estado::RECIBIDO, // Estado por defecto
                [], // Puedes cargar las líneas si lo deseas
                (float)$fila["importe"] // Importe total
            );
        }
        return $pedido;
    }

    public static function getAll() {
        $con = Conexion::getConection();
        $pedidos = [];
        
        $sql = "SELECT * FROM pedido";
        
        $consulta = $con->prepare($sql);
        $consulta->execute();
        
        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $pedidos[] = new Pedido(
                $fila["id"],
                $fila["usuario_id"],
                new DateTime($fila["fecha"]),
                $fila["direccion"],
                Estado::RECIBIDO,
                [],
                (float)$fila["importe"]
            );
        }
        
        return $pedidos;
    }

    public static function getByUsuarioId($usuario_id) {
        $con = Conexion::getConection();
        $pedidos = [];
        
        $sql = "SELECT * FROM pedido WHERE usuario_id = :usuario_id";
        
        $consulta = $con->prepare($sql);
        $consulta->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
        $consulta->execute();
        
        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $pedidos[] = new Pedido(
                $fila["id"],
                $fila["usuario_id"],
                new DateTime($fila["fecha"]),
                $fila["direccion"],
                Estado::from($fila["estado"]), // Convierte el estado de la base de datos al enum
                (float)$fila["importe"]
            );
        }
        
        return $pedidos;
    }
    
    public static function updateEstado(Pedido $pedido, Estado $nuevoEstado) {
        $con = Conexion::getConection();
        
        $sql = "UPDATE pedido SET estado = :estado WHERE id = :id";
        
        $consulta = $con->prepare($sql);
        $parametros = [
            ':estado' => $nuevoEstado->value, // Usar el valor del enum
            ':id' => $pedido->getId()
        ];

        return $consulta->execute($parametros);
    }

    public static function updatePrecio(Pedido $pedido, float $nuevoPrecio) {
        $con = Conexion::getConection();
        
        $sql = "UPDATE pedido SET importe = :importe WHERE id = :id";
        
        $consulta = $con->prepare($sql);
        $parametros = [
            ':importe' => number_format($nuevoPrecio, 2, '.', ''), // Asegurarse de que el precio esté formateado
            ':id' => $pedido->getId()
        ];

        return $consulta->execute($parametros);
    }
}
