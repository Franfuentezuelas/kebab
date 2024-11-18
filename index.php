<?php
require_once 'micargador.php';
// Permitir CORS desde localhost (ajústalo según sea necesario)
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
class Principal
{
    public static function main()
    {
        //var_dump($_SERVER["DOCUMENT_ROOT"]);
        require_once 'micargador.php';
       // si estamos enviando un login o registro
        if (isset($_POST['submit'])) {
            // aqui puedo redirigir al controlador para login o registro
            require_once './controlador/acceso.php';
        }
        //require_once './helper/sesion.php';
        require_once './Vistas/Principal/layout.php';
    }
}
Principal::main();

