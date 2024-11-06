<?php

class Pedido implements ToJSON {
    /**
     * Clase Pedido
     */

    private ?int $id; // ID del pedido, puede ser null si se autogenera
    private int $usuario_id; // ID del usuario que realiza el pedido
    private DateTime $fecha; // Fecha del pedido
    private string $direccion; // Almacena la dirección como string
    private Estado $estado; // Estado del pedido (recibido, en proceso, entregado, etc.)
    private array $lineas; // Líneas de pedido, contiene los kebabs seleccionados
    private float $importe; // Precio total sumando todos los totales de las líneas

    public function __construct(
        int $id = null, // ID de la línea de pedido, puede ser null si se autogenera
        int $usuario_id,
        DateTime $fecha,
        Direccion $direccion, // Objeto Dirección
        Estado $estado = Estado::RECIBIDO, // Estado por defecto
        array $lineas = [], // Array de líneas de pedido por defecto vacío
        float $importe = 0.0 // Importe total inicial
    ) {
        $this->id = $id;
        $this->usuario_id = $usuario_id;
        $this->fecha = $fecha;
        $this->direccion = $direccion->toString(); // Almacenar la representación en cadena de la dirección
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
