<?php

class Alergenos implements ToJSON {
    /**
     * Clase Alergenos
     */

    public function __construct(
        int $id = null, // ID del alérgeno, puede ser null si se autogenera
        string $nombre, // Nombre del alérgeno
        string $imagen = null // Imagen del alérgeno, opcional
    ) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->imagen = $imagen;
    }

    /**
     * Metodo implementado de la interfaz ToJSON
     * @return string JSON con el objeto
     */
    public function toJSON() : string {
        // Crear un array con los atributos del alérgeno
        $datosAlergeno = [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'imagen' => $this->imagen
        ];

        // Convertir el array a JSON y retornarlo
        // de esta forma creo el JSON y mantengo el UTF8 para que no se distorsionen los datos (JSON_UNESCAPED_UNICODE)
        return json_encode($datosAlergeno, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE); 
    }
}
