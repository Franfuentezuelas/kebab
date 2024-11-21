<?php

class Pedido implements ToJSON {
    /**
     * Clase Pedido
     */

    public function __construct(
        ?int $id = null, // ID de la línea de pedido, puede ser null si se autogenera
        int $usuario_id,
        ?DateTime $fecha = null, // Permitir que fecha sea null
        ?String $direccion=null, // Objeto Dirección
        Estado $estado = Estado::RECIBIDO, // Estado por defecto
        ?array $lineas = null, // Array de líneas de pedido por defecto vacío
        float $importe = 0.0 // Importe total inicial
    ) {
        $this->id = $id;
        $this->usuario_id = $usuario_id;
        $this->fecha = $fecha ?: new DateTime(); // Si no se pasa una fecha, usar la fecha actual
        $this->direccion = $direccion; // Almacenar la representación en cadena de la dirección
        $this->estado = $estado;
        $this->lineas = $lineas;
        $this->importe = $importe;
    }

    /**
     * Método implementado de la interfaz ToJSON
     * @return string JSON con el objeto
     */
    public function toJSON() : string {
        // Crear un array con los atributos del pedido
        $datosPedido = [
            'id' => $this->id,
            'usuario_id' => $this->usuario_id,
            'fecha' => $this->fecha->format('H:i:s d-m-Y'), // Formatear la fecha a "horas:minutos:segundos día-mes-año"
            'direccion' => $this->direccion, // Almacenar la representación en cadena de la dirección
            'estado' => $this->estado->name, // Asumiendo que Estado tiene un método name
            'lineas' => array_map(fn($linea) => $linea->toJSON(), $this->lineas), // Convertir cada línea a JSON
            'importe' => number_format($this->importe, 2, '.', '') // Formato para el importe
        ];

        // Convertir el array a JSON y retornarlo
        return json_encode($datosPedido, JSON_PRETTY_PRINT);
    }
}
