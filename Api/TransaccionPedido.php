<?php

// iniciamos la sesion para verificar que esta logado
class TransaccionPedido {
    public static function transaccionPedido($idusuario){ 
        // Obtener la conexión utilizando la clase Conexion
        $pdo = Conexion::getConection(); // Obtén la conexión de PDO desde la clase Conexion
        $idusuario = $idusuario*1;
        
        $usuario = RepoUsuario::findByID($idusuario);
      

        try {

            // // Establecer el modo de error para PDO
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            $pdo->beginTransaction();
            
            // $estado = Estado::RECIBIDO; // Estado por defecto no es necesario ya que se asigna la base de datos
            // $fecha = new DateTime(); // Fecha actual aunque no es necesaria ya que la asigna la base de datos
            $direccion = $usuario->direcciones[0]; // Dirección del usuario

            $importe = 0;

            // Obtener carrito del usuario
            $carrito = json_decode($usuario->carrito, true);
     
        // Aquí mapeamos el carrito y creamos un array de objetos Kebab
        $carrito = array_map(function($kebabData) {
            // Extraemos los datos del carrito para crear el objeto Kebab
            $id = $kebabData['id'] ?? null;  // El ID del kebab (puede ser null si es nuevo)
            $nombre = $kebabData['nombre'] ?? '';  // El nombre del kebab
            $foto = $kebabData['foto'] ?? null;  // Foto del kebab (opcional)
            $precio = $kebabData['precio'] ?? 0;  // Precio del kebab
            $descripcion = $kebabData['descripcion'] ?? '';  // Descripción del kebab
            $ingredientes = $kebabData['ingredientes'] ?? [];  // Ingredientes (debe ser un array)
            $kebab_id = $kebabData['kebab_id'] ?? null;  // ID del base de datos del kebab

            // Crear un array de objetos Ingrediente a partir de los datos del carrito
            $ingredientes = array_map(function($ingrediente) {
                // Asegúrate de que el objeto Ingrediente esté correctamente instanciado
                return new Ingrediente(
                    $ingrediente['id'],
                    $ingrediente['nombre'],
                    $ingrediente['imagen'],
                    $ingrediente['precio'],
                    $ingrediente['descripcion'],
                    $ingrediente['alergenos']
                );
            }, $ingredientes);
     
            // Ahora creamos el objeto Kebab
            return new Kebab(
                $id,               // ID del kebab (si existe)
                $nombre,           // Nombre
                $foto,             // Foto
                $precio,           // Precio
                $descripcion,      // Descripción
                $ingredientes,     // Ingredientes (array de Ingrediente)
                $kebab_id = $kebabData['kebab_id'] ?? null  // ID del kebab base (opcional ya que puede no tenerlo si tiene id)
            );
        }, $carrito);
        
        // recorro los kebabs para tener el precio total
        foreach ($carrito as $kebab) {
            $importe+=$kebab->precio;
        }
        
        
        // Obtener la dirección como string
        $direccionStr = $direccion->toString();

        // creamos el objeto pedido con los datos que hemos compuesto
        $pedido = new Pedido(
            null, // El ID del pedido es autoincremental
            $usuario->id,
            null,
            $direccionStr, // Direccion es un objeto que debes haber creado antes
            $estado = Estado::RECIBIDO, // Se pasa el enum aquí
            [], // Líneas de pedido con los kebabs agrupados
            $importe // Importe total
        );
        
        // ahora guardo el pedido en la base de datos
        $pedido =RepoPedido::nuevo($pedido);
        // ahora creo las lineas de pedido agrupando los kebabs que son iguales
        $lineasPedido = []; // Array para almacenar las líneas de pedido
        
        foreach ($carrito as $kebab) {
            // Buscar si ya existe una línea de pedido para este kebab
            $found = false;
        
            // Recorremos las líneas de pedido para ver si este kebab ya está
            foreach ($lineasPedido as &$linea) {// pasamos por referencia el la linea para poder actualizarla
                if ($linea->kebab_id === $kebab->id) {
                    // Si encontramos el kebab, sumamos la cantidad y actualizamos el total
                    $linea->cantidad += 1; // O usar la cantidad que está en el carrito si es mayor que 1
                    $linea->total = $linea->precio * $linea->cantidad; // Recalcular el total
                    $found = true;
                    break; // Salimos del bucle porque ya hemos actualizado la línea

                }
            }
        
            // Si no hemos encontrado el kebab en las líneas de pedido, creamos una nueva línea
            if (!$found) {
                $lineasPedido[] = new LineaPedido(
                    null, // El ID de la línea se generará automáticamente
                    $kebab->id,
                    $pedido->id, // El ID del pedido ya registrado
                    $kebab->nombre,
                    1, // Asumimos que la cantidad es 1 ya que es el primero
                    $kebab->precio,
                    $kebab->precio, // El total inicial será igual al precio si la cantidad es 1
                    $kebab_json = $kebab//->tojson() // Asignar JSON vacío si no existe

                );
            }
        }
              
        // ahora guardamos las líneas de pedido
        foreach ($lineasPedido as $linea) {
        
            $linea = RepoLineaPedido::nuevo($linea);
           
        }
       
            // Si todo va bien, hacer commit de la transacción
            $pdo->commit();
            // devolvemos el pedido creado correctamente
            return $pedido;
        } catch (Exception $e) {
                 // Si ocurre un error, hacer rollback
                 $pdo->rollBack();
                 throw new Exception("Error al registrar el pedido: " . $e->getMessage());
        
        }
}

}

