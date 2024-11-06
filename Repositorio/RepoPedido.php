<?php

class RepoPedido
{
    public static function nuevo(Pedido $pedido): Pedido {
        $con = Conexion::getConection();
        
        // Si no se proporciona la fecha, se usa la fecha actual
        $fecha = $pedido->getFecha() ?? new DateTime();

        // Preparar la consulta SQL para insertar un nuevo pedido
        $sql = "INSERT INTO pedido (importe, usuario_id, fecha, direccion) 
                VALUES (:importe, :usuario_id, :fecha, :direccion)";
        
        $consulta = $con->prepare($sql);
        
        // Establecer los parámetros de la consulta
        $parametros = [
            ':importe' => $pedido->getImporte(),
            ':usuario_id' => $pedido->getUsuarioId(),
            ':fecha' => $fecha->format('Y-m-d H:i:s'), // Formato adecuado para la base de datos
            ':direccion' => json_encode($pedido->getDireccion()) // Convertir a JSON si es necesario
        ];

        // Ejecutar la consulta
        if ($consulta->execute($parametros)) {
            $pedido->setId($con->lastInsertId()); // Asignar el ID autogenerado al objeto Pedido
        } else {
            // Manejar el error según sea necesario
            $pedido = null;
        }

        return $pedido;
    }

    public static function findByID(int $id): ?Pedido {
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

    public static function getAll(): array {
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

    public static function getByUsuarioId($usuario_id): array {
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
                [], // Aquí podrías cargar las líneas de pedido si es necesario
                (float)$fila["importe"]
            );
        }
        
        return $pedidos;
    }    
    
    public static function updateEstado(Pedido $pedido, Estado $nuevoEstado): bool {
        $con = Conexion::getConection();
        
        $sql = "UPDATE pedido SET estado = :estado WHERE id = :id";
        
        $consulta = $con->prepare($sql);
        $parametros = [
            ':estado' => $nuevoEstado->value, // Usar el valor del enum
            ':id' => $pedido->getId()
        ];

        return $consulta->execute($parametros);
    }

    public static function updatePrecio(Pedido $pedido, float $nuevoPrecio): bool {
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
