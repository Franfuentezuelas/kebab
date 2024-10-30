<?php
// con esta interface obligamos a que todos los repositorios que 
// implementen RepoCrud
/**
 * RepoCrud intercafe para comunicacion base de datos
 */
interface RepoCrud{

    public static function nuevo($objeto);

    public static function findByID($id);

    public static function findByObj($objeto);

    public static function update($id, $objeto);

    public static function delete(Obj $objeto);

    public static function save(Obj $objeto);

    public static function getAll();

}