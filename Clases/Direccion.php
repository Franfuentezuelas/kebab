<?php

final class Direccion implements ToJSON {
    
    /**
     * Clase Direccion
     */
    public function __construct(
        int $id = null,
        string $via,
        int $numero,
        string $resto = null,
        string $puntoGPS = null,
        string $localidad_nombreloc,
        string $localidad_nombreprov,
        int $usuario_id=null
    ) {
        $this->id = $id;
        $this->via = $via;
        $this->numero = $numero;
        $this->resto = $resto;
        $this->puntoGPS = $puntoGPS;
        $this->localidad_nombreloc = $localidad_nombreloc;
        $this->localidad_nombreprov = $localidad_nombreprov;
        $this->usuario_id = $usuario_id;
    }

    /**
     * Metodo implementado de la interfaz ToJSON
     * @return string JSON con el objeto
     */
    public function toJSON() : string {
        // Crear un array con los atributos de la dirección
        $datosDireccion = [
            'id' => $this->id,
            'via' => $this->via,
            'numero' => $this->numero,
            'resto' => $this->resto,
            'puntoGPS' => $this->puntoGPS,
            'localidad_nombreloc' => $this->localidad_nombreloc,
            'localidad_nombreprov' => $this->localidad_nombreprov,
            'usuario_id' => $this->usuario_id
        ];

        // Convertir el array a JSON y retornarlo
        return json_encode($datosDireccion, JSON_PRETTY_PRINT);
    }

    /**
     * Metodo que devuelve un string con la dirección del usuario
     * @return string con la dirección completa
     */
    public function toString() : string {
        // Comenzamos con la dirección básica
        $direccion = trim($this->via . ' ' . $this->numero);
        
        // Si $resto no es null, lo añadimos a la dirección
        if ($this->resto !== null) {
            $direccion .= ' ' . trim($this->resto); // Concatenamos el resto, asegurándonos de eliminar espacios extra
        }

        // Agregamos la localidad y provincia
        $direccion .= ' ' . trim($this->localidad_nombreloc . ', ' . $this->localidad_nombreprov);
        
        return $direccion; // devolvemos la dirección completa
    }

}
