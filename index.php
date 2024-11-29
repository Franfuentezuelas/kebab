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
        require_once 'micargador.php';
        if(isset($_GET['var'])){
            if($_GET['var'] == "logout"){
                Loguear::logout();
                unset($_GET['var']);
            }
     
            //var_dump($_SERVER["DOCUMENT_ROOT"]);
        
            // si estamos enviando un login o registro
            //$_GET['var'] == "login"
            if (isset($_POST['usuario']) && isset($_POST['password']) && count($_POST)>=2) {
                // aqui puedo redirigir al controlador para login o registro
                require_once './controlador/acceso.php';
            }
        }
       
        if (isset($_SESSION["user"]) && $_SESSION['user']->tipo !== Tipo::USUARIO && isset($_GET['var']) && $_GET['var']=="inicio"){
            $_GET['var']="pedidos";
        }
        //require_once './helper/sesion.php';
        require_once './Vistas/Principal/layout.php';
    }
}
Principal::main();

