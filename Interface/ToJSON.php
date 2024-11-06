<?php

/**
 * Clase ToJSON, esta interface permite convertir un objeto en JSON
 */
interface ToJSON{
    /**
     * @return como es una funcion abstracta no hace nada
     * cuando se implementa tiene que convertir el objeto en un JSON
     */
    public function toJSON();

}
