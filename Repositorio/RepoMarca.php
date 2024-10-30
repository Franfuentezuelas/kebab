<?php

Class RepoMarca implements RepoCrud
{

    public static function nuevo($marca){

    }

    public static function findByID($id){
        // aqui tengo que utilizar la conexion
        $marcas=[];
        $con=Conexion::getConection();
        // creo la consulta a la base de datos
        $sql="SELECT * FROM MARCAS where id = :id";
        // preparo la consulta a base de datos
        $consulta = $con -> prepare($sql);
        // creo un array con los parametros necesarios para la consulta
        $parametros = array(':id' => $id);
        // realizo la consulta a la base de datos parando el array acosiativo de parametros 
        $consulta->execute($parametros);
        $fila=$consulta->fetch(PDO::FETCH_ASSOC);

        // aqui es solo un if por que busco si hay uno
        if($fila){
        // de esta forma recorro los resultados utilizando un array asociativo en los resultados
                // aqui compongo el objeto y lo agrego a un array de objetos
                $marca=new Marca($fila["nombre"],$fila["id"]);
                $marcas[]=$marca;
        }

        // devuelvo el array de objetos
        return $marcas;
    }

    public static function findByObj($objeto){}

    public static function update($id, $objeto){}

    public static function delete(Obj $objeto){}

    public static function save(Obj $objeto){}


    public static function getAll() {
        // Obtener la conexión
        $con = Conexion::getConection();
        // Array para almacenar los objetos de marcas
        $marcas = [];
        // Crear la consulta SQL
        $sql = "SELECT * FROM MARCAS";
        // Preparar la consulta
        $consulta = $con->prepare($sql);
        // Ejecutar la consulta
        $resultado = $consulta->execute();
        // Verificar si la consulta se ejecutó correctamente
        if ($resultado) {
            // Recorremos los resultados utilizando un array asociativo
            while ($fila = $consulta->fetch()) { // si utilizo en el parentesis de fetch PDO::FETCH_ASSOC solamente trabajo con un array asociativo
                // Creamos el objeto Marca y lo agregamos al array de marcas
                $marca = new Marca($fila["nombre"], $fila["id"]);
                $marcas[] = $marca;
            }
        }
        // Devolver el array de objetos Marca
        return $marcas;
    }
    


}


