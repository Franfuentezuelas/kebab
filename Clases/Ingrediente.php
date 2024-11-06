<?php

class Ingrediente implements ToJSON {
    /**
     * Clase Ingrediente
     */

    public function __construct(
        int $id = null, // ID del ingrediente
        string $nombre, // Nombre del ingrediente
        string $imagen = null, // Imagen del ingrediente, opcional
        float $precio, // Precio del ingrediente
        string $descripcion, // Descripción del ingrediente
        array $alergenos = null // Array de alérgenos, por defecto null
    ) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->imagen = $imagen;
        $this->precio = $precio;
        $this->descripcion = $descripcion;
        $this->alergenos = $alergenos; // Asignamos el array de alérgenos
    }

    /**
     * Método para convertir el objeto a una representación de cadena
     * @return string Representación de cadena del kebab
     */
    public function toString() : string {
        return $this->id . '.' . $this->nombre . '. ' . $this->descripcion. '. '.$this->precio;
    }

    /**
     * Metodo implementado de la interfaz ToJSON
     * @return string JSON con el objeto
     */
    public function toJSON() : string {
        // Crear un array con los atributos del ingrediente
        $datosIngrediente = [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'imagen' => $this->imagen,
            'precio' => $this->precio,
            'descripcion' => $this->descripcion,
            'alergenos' => $this->alergenos // Agregamos el array de alérgenos
        ];

        // Convertir el array a JSON y retornarlo
        return json_encode($datosIngrediente, JSON_PRETTY_PRINT);
    }
}
