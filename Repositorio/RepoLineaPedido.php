<?php

class RepoLineaPedido {
    public static function nuevo(LineaPedido $lineaPedido) {
        $con = Conexion::getConection();
    
        // Consulta de inserción para la tabla LineaPedido
        $sql = "INSERT INTO PEDIDO_KEBAB (kebab_id, pedido_id, nombre_kebab, cantidad, precio, kebabJSON) 
                VALUES (:kebab_id, :pedido_id, :nombre_kebab, :cantidad, :precio, :kebabjson)";
        
        $consulta = $con->prepare($sql);
        
        // Preparar los parámetros para la consulta
        $parametros = [
            ':kebab_id' => $lineaPedido->kebab_id,
            ':pedido_id' => $lineaPedido->pedido_id,
            ':nombre_kebab' => $lineaPedido->nombre_kebab,
            ':cantidad' => $lineaPedido->cantidad,
            ':precio' => $lineaPedido->precio,
            ':kebabjson' => $lineaPedido->kebab_json
        ];
    
        // Ejecutar la consulta e insertar la línea de pedido
        if ($consulta->execute($parametros)) {
            $lineaPedido->linea = $con->lastInsertId(); // Devuelve el ID de la línea de pedido recién creada
    
            // Obtener el pedido correspondiente al id
           // $pedido = RepoPedido::findByID($lineaPedido->pedido_id);
           // if ($pedido) {
                // Sumar el total de la nueva línea de pedido al importe existente
                // $nuevoImporte = $pedido->importe + $lineaPedido->total;
    
                // Actualizar el importe del pedido
                //RepoPedido::updatePrecio($pedido, $nuevoImporte);
           // }
        }
    
        return $lineaPedido; // La línea o null si no se pudo guardar
    }
    
    
    public static function findByID($id) {
        $con = Conexion::getConection();
        $sql = "SELECT * FROM PEDIDO_KEBAB WHERE id = :id";
        
        $consulta = $con->prepare($sql);
        $parametros = [':id' => $id];
        
        $consulta->execute($parametros);
        $lineaPedido = null;
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        
        // Si se encuentra la fila, crear un objeto LineaPedido
        if ($fila) {
            $lineaPedido = new LineaPedido(
                $fila["linea"],
                $fila["kebab_id"],
                $fila["pedido_id"],
                $fila["nombre_kebab"],
                $fila["cantidad"],
                $fila["precio"]
            );
            $lineaPedido->total = $fila["total"];
            $lineaPedido->kebab_json = $fila["kebab_json"];
        }
        return $lineaPedido; // Devolver el objeto o null si no existe
    }

    public static function findByObj(LineaPedido $lineaPedido) {
        return self::findByID($lineaPedido->linea);
    }

    public static function getAll() {
        $con = Conexion::getConection();
        $lineas = [];
        
        $sql = "SELECT * FROM PEDIDO_KEBAB";
        
        $consulta = $con->prepare($sql);
        $consulta->execute();
        
        // Recorrer cada fila y crear objetos LineaPedido
        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $lineas[] = new LineaPedido(
                $fila["linea"],
                $fila["kebab_id"],
                $fila["pedido_id"],
                $fila["nombre_kebab"],
                $fila["cantidad"],
                $fila["precio"]
            );
            $lineas[count($lineas) - 1]->total = $fila["total"];
            $lineas[count($lineas) - 1]->kebab_json = $fila["kebab_json"];
        }
        
        return $lineas; // Devolver el array de líneas de pedido
    }

    public static function findByPedidoID($pedido_id) {
        $con = Conexion::getConection();
        $lineas = [];
    
        $sql = "SELECT * FROM PEDIDO_KEBAB WHERE pedido_id = :pedido_id";
        
        $consulta = $con->prepare($sql);
        $parametros = [':pedido_id' => $pedido_id];
        
        $consulta->execute($parametros);
        
        // Recorrer cada fila y crear objetos LineaPedido
        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $lineaPedido = new LineaPedido(
                $fila["linea"],
                $fila["kebab_id"],
                $fila["pedido_id"],
                $fila["nombre_kebab"],
                $fila["cantidad"],
                $fila["precio"]
            );
            $lineaPedido->total = $fila["total"];
            $lineaPedido->kebab_json = $fila["kebab_json"];
            $lineas[] = $lineaPedido;
        }
        return $lineas; // Devolver el array de líneas de pedido
    }

    public static function update(LineaPedido $lineaPedido) {
        $con = Conexion::getConection();
        $sql = "UPDATE PEDIDO_KEBAB SET kebab_id = :kebab_id, pedido_id = :pedido_id, 
                nombre_kebab = :nombre_kebab, cantidad = :cantidad, 
                precio = :precio, total = :total, kebab_json = :kebab_json 
                WHERE linea = :linea";
        
        $consulta = $con->prepare($sql);
        
        $parametros = [
            ':linea' => $lineaPedido->linea,
            ':kebab_id' => $lineaPedido->kebab_id,
            ':pedido_id' => $lineaPedido->pedido_id,
            ':nombre_kebab' => $lineaPedido->nombre_kebab,
            ':cantidad' => $lineaPedido->cantidad,
            ':precio' => $lineaPedido->precio,
            ':total' => $lineaPedido->total,
            ':kebab_json' => $lineaPedido->kebab_json
        ];

        return $consulta->execute($parametros); // Retorna true si la actualización fue exitosa
    }

    public static function delete(LineaPedido $lineaPedido) {
        $con = Conexion::getConection();
        $sql = "DELETE FROM PEDIDO_KEBAB WHERE linea = :linea";
        
        $consulta = $con->prepare($sql);
        $parametros = [':linea' => $lineaPedido->linea];
        
        return $consulta->execute($parametros); // Retorna true si la eliminación fue exitosa
    }
}

