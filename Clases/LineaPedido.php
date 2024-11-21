<?php

class LineaPedido implements ToJSON {

    public function __construct(
        ?int $linea = null,
        int $kebab_id,
        int $pedido_id,
        string $nombre_kebab,
        int $cantidad,
        float $precio,
        float $total,
        Kebab $kebab
    ) {
        $this->linea = $linea;
        $this->kebab_id = $kebab_id;
        $this->pedido_id = $pedido_id;
        $this->nombre_kebab = $nombre_kebab;
        $this->cantidad = $cantidad;
        $this->precio = $precio;
        $this->total = $this->precio * $this->cantidad;
        
        // // Obtener el objeto Kebab por ID y almacenarlo como JSON
        // $kebab = RepoKebab::findByID($this->kebab_id);
        $this->kebab_json = $kebab ? $kebab->toJSON() : '{}'; // Asignar JSON vacío si no existe
    }

    /**
     * Método implementado de la interfaz ToJSON
     * @return string JSON con el objeto
     */
    public function toJSON() : string {
        // Crear un array con los atributos de la línea de pedido, incluyendo el JSON del kebab
        $datosPedido = [
            'linea' => $this->linea,
            'kebab_id' => $this->kebab_id,
            'pedido_id' => $this->pedido_id,
            'nombre_kebab' => $this->nombre_kebab,
            'cantidad' => $this->cantidad,
            'precio' => $this->precio,
            'total' => $this->total,
            'kebab_json' => json_decode($this->kebab_json) // Decodificar para incluir como objeto JSON anidado
        ];

        // Convertir el array a JSON y retornarlo
        return json_encode($datosPedido, JSON_PRETTY_PRINT);
    }

    public function toString() : string {
        // Decodificar el JSON del kebab para obtener los ingredientes
        $kebabData = json_decode($this->kebab_json, true); // Convertir el JSON en un array asociativo
    
        // Obtener los nombres de los ingredientes utilizando array_map
        // Se asume que kebabData['ingredientes'] es un array de arrays donde cada ingrediente tiene un 'nombre'
        $ingredientes = array_map(fn($ingrediente) => $ingrediente['nombre'], $kebabData['ingredientes']);
    
        // Crear el string de salida utilizando concatenación
        // Utilizamos number_format para asegurar que los precios y el total tengan dos decimales
        $resultado = "Kebab: " . $kebabData['nombre'] . // Añadir el nombre del kebab
                     ", Ingredientes: " . implode(', ', $ingredientes) . // Listar los ingredientes separados por comas
                     ", Precio: " . number_format($this->precio, 2) . // Formatear el precio a dos decimales
                     ", Cantidad: " . $this->cantidad . // Añadir la cantidad del kebab
                     ", Total: " . number_format($this->total, 2); // Formatear el total a dos decimales
    
        // devuelvo el string completo de la linea para la factura
        return $resultado;
    }
}
