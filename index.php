<?php
require_once 'micargador.php';
// Permitir CORS desde localhost (ajústalo según sea necesario)
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
Loguear::iniciarSesion();

class Principal
{
    public static function main()
    {
        if(isset($_GET['var'])){
            if($_GET['var'] == "logout"){
                Loguear::logout();
                unset($_GET['var']);
            }
        }
        //var_dump($_SERVER["DOCUMENT_ROOT"]);
        require_once 'micargador.php';
       // si estamos enviando un login o registro
        //$_GET['var'] == "login"
        if (isset($_POST['usuario']) && isset($_POST['password']) && count($_POST)==2) {
            // aqui puedo redirigir al controlador para login o registro
            require_once './controlador/acceso.php';
        }
        //require_once './helper/sesion.php';
        require_once './Vistas/Principal/layout.php';
    }
}
Principal::main();

