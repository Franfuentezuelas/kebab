<?php

class Kebab implements ToJSON {
    /**
     * Clase Kebab
     */

    public function __construct(
        int $id = null, // ID del kebab
        string $nombre, // Nombre del kebab
        string $foto = null, // Imagen del kebab, opcional
        float $precio, // Precio del kebab
        string $descripcion, // Descripción del kebab
        array $ingredientes = null, // Array de ingredientes del kebab
        string $kebab_id = null // Kebab base, por defecto null
    ) {
        
        $this->nombre = $nombre;
        $this->foto = $foto; // "/imagenes/".$foto;
        $this->descripcion = $descripcion;
        $this->ingredientes = $ingredientes; // Asignamos el array de ingredientes
        $this->kebab_id = $kebab_id; // Asignamos el kebab base
        //$this->precio = $precio; // Precio del kebab
        // quiero que el precio sea calculado en base al kebab y los ingredientes adicionales
        //$this->precio=$this->calculaPrecio($this->ingredientes,$this->kebab_id,$this->id);
        if($this->kebab_id==null){
            $this->precio = $precio;
        }else{
        // Calculamos el precio al crear el objeto
        $this->precio = $this->calculaPrecio();
        }

        if($id==null && $kebab_id==null){
            $this->id=RepoKebab::nuevo($this);
        }elseif($id==null){
            $this->id=RepoKebab::findByIngredientes($kebab_id,$ingredientes, $this)->id;
        }else{
            $this->id = $id;
        }
        
        
    }
    /**
     * Metodo implementado de la interfaz ToJSON
     * @return string JSON con el objeto
     */
    public function toJSON() : string {
        // Crear un array con los atributos del kebab
        $datosKebab = [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'foto' => $this->foto,
            'precio' => $this->precio,
            'descripcion' => $this->descripcion,
            'ingredientes' => $this->ingredientes, // Agregamos el array de ingredientes
            'kebab_base' => $this->kebab_id
        ];

        // Convertir el array a JSON y retornarlo
        return json_encode($datosKebab, JSON_PRETTY_PRINT);
    }

        /**
     * Método para convertir el objeto a una representación de cadena
     * @return string Representación de cadena del kebab
     */
    public function toString() : string {
        return $this->id . '.' . $this->nombre . '.' . $this->descripcion. " precio ".$this->precio."€ ingredientes ".$this->getIngredientesIds();
    }

    // Método para obtener los IDs de los ingredientes
    public function getIngredientesIds() {
        $ids = '';
        foreach ($this->ingredientes as $ingrediente) {
            // Aquí asumimos que cada ingrediente tiene un atributo 'idingrediente'
            $ids .= intval($ingrediente->id) . ',';
        }
        // Eliminar la última coma
        return rtrim($ids, ',');
    }

    // Método para obtener los IDs de los ingredientes
    public function getIngredientes() {
        $nombres = '';
        foreach ($this->ingredientes as $ingrediente) {
            // Aquí asumimos que cada ingrediente tiene un atributo 'idingrediente'
            $nombres .= ($ingrediente->nombre) . ',';
        }
        // Eliminar la última coma
        return rtrim($nombres, ',');
    }


        /**
     * Método para calcular el precio del kebab
     * @return float Precio calculado
     */
    public function calculaPrecio() {
        $precio = 0;
    
        if ($this->kebab_id == 1) {
            // Caso de kebab al gusto (precio base incluye 3 ingredientes más baratos)
            $precio = RepoKebab::findByID(1)->precio;
    
            // Ordenar los ingredientes por precio y obtener los extras
            usort($this->ingredientes, function($a, $b) {
                return $a->precio <=> $b->precio;
            });
            $extras = array_slice($this->ingredientes, 3);
    
            foreach ($extras as $ingrediente) {
                $precio += $ingrediente->precio;
            }
        } else {
            // Caso de kebab personalizado
            $kebabBase = RepoKebab::findByID($this->kebab_id);
            $precio = $kebabBase->precio;
    
            // Obtener los IDs de los ingredientes base
            $ingredientesBaseIds = array_map(function($ingrediente) {
                return $ingrediente->id;
            }, $kebabBase->ingredientes);
    
            // Filtrar los ingredientes adicionales
            $ingredientesExtras = array_filter($this->ingredientes, function($ingrediente) use ($ingredientesBaseIds) {
                return !in_array($ingrediente->id, $ingredientesBaseIds);
            });
    
            // Sumar el precio de los ingredientes adicionales
            foreach ($ingredientesExtras as $ingrediente) {
                $precio += $ingrediente->precio;
            }
        }

        return $precio;
    }
    
}

