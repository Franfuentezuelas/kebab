<?php

class Usuario implements ToJSON {
    /**
     * Clase Usuario
     */

    public function __construct(
        int $id = null, 
        string $nombre, 
        string $apellidos = null, 
        int $telefono, 
        string $usuario, 
        string $pass, 
        Tipo $tipo = Tipo::USUARIO, 
        string $correo, 
        string $carrito= null, 
        float $saldo = 0.0,
        array $direcciones = null,
        array $alergenos = null,
        array $pedidos = null
    ) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->telefono = $telefono;
        $this->usuario = $usuario;
        $this->pass = $pass;
        $this->tipo = $tipo;
        $this->correo = $correo;
        $this->carrito = $carrito;
        $this->saldo = $saldo;
        $this->direcciones = $direcciones;// Asignación del array de direcciones
        $this->alergenos = $alergenos; // Asignación del array de alérgenos
        $this->pedidos = $pedidos; // Asignación del array de pedidos
    }

    /**
     * Metodo implementado de la interfaz ToJSON
     * @return string JSON con el objeto
     */
    public function toJSON() : string {
        // Crear un array con los atributos del usuario
        $datosUsuario = [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'apellidos' => $this->apellidos,
            'telefono' => $this->telefono,
            'usuario' => $this->usuario,
            'pass' => $this->pass,
            'tipo' => $this->tipo->value, // Acceso al valor del enum Tipo
            'correo' => $this->correo,
            'carrito' => json_decode($this->carrito, true), // Decodifica si $carrito es una cadena JSON
            'saldo' => $this->saldo,
            'direcciones' => $this->direcciones, // Agregamos el array de direcciones
            'alergenos' => $this->alergenos // Agregamos el array de alérgenos
        ];

        // Convertir el array a JSON y retornarlo
        return json_encode($datosUsuario, JSON_PRETTY_PRINT);
    }

    /**
     * Metodo que devuelve un string con el nombre completo del usuario
     * @return string con el nombre completo
     */
    public function toStrin() : string {
        // String con el nombre completo
        return trim($this->nombre . ' ' . $this->apellidos); // Usamos trim para eliminar espacios extra por ejemplo si no hay apellidos
    }
}

