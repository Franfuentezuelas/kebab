<?php
//  no hay que incluir los includes por que en index que es la unica puerta tengo la autocarga
//  tiene que estar configurado para poder encontrarlo en los diferentes directorios
class Autocargador
{
    public static function autocargar()
    {
        spl_autoload_register('self::autocarga');
    }

    public static function autocarga($clase){
    // obtengo la ruta de DOCUMENT_ROOT
    $inicio=$_SERVER["DOCUMENT_ROOT"];
    // ejecutamos la funcion de obtencion de todas las carpetas
    $carpetas=Autocargador::listacarpetas($inicio);
    // ahora miro si la en alguna de las parpetas esta la clase que necesitamos y hacemos include_once
        $contador=0;
        $correcto=false;
        //var_dump(count($carpetas));
        while(!$correcto && $contador<count($carpetas)){
            $fichero=$carpetas[$contador].'/'.$clase.'.php';
            if(file_exists($fichero))
            {
                require_once $fichero;
                $correcto=true;
            }
            $contador++;
        }
    }
    
    // funcion para cargar en un array todas las carpetas
    public static function listacarpetas($inicio) {
        // Creo el array donde voy a guardar las direcciones de las carpetas
        $carpetas = [];
        // Obtengo todos los elementos del directorio
        $elementos = scandir($inicio);
        // Itero sobre cada elemento encontrado
        foreach ($elementos as $elemento) {
            // Ignoro los directorios "." y ".." que representan el actual y el superior
            if ($elemento != '.' && $elemento != '..'&& $elemento != '.git') {
                $rutaCompleta = $inicio . '/' . $elemento;
                // Verifico si el elemento es una carpeta
                if (is_dir($rutaCompleta)) {
                    // Añadir la carpeta al array
                    $carpetas[] = $rutaCompleta;
                    // Llamada recursiva para obtener las subcarpetas
                    $subcarpetas = Autocargador::listacarpetas($rutaCompleta);
                    // Añadir las subcarpetas al array principal
                    foreach ($subcarpetas as $sub) {
                        $carpetas[] = $sub;
                    }
                }
            }
        }
        // Devuelve el array con todas las direcciones de las carpetas del proyecto
        return $carpetas;
    }

}

Autocargador::autocargar();


