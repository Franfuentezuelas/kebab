<?php
Loguear::iniciarSesion();
    // quiero ortener la url que esta llamando a index.php con el parametro var
    if(!isset($_GET['var'])){
        $var="inicio";
    }else{
        $var=$_GET['var'];
    }
    if(isset($_SESSION['user']) && $_SESSION['user']->tipo != Tipo::USUARIO){
        $tipo = $_SESSION['user']->tipo;
    }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <?php
    if(isset($tipo)) {
        require_once './Vistas/Principal/headEmpresa.php';
        }else{
        require_once './Vistas/Principal/head.php';
        }
    ?>
</head>
<body>
<?php
    if(isset($tipo)){
        require_once './Vistas/Principal/headerEmpresa.php';
        }else{
        require_once './Vistas/Principal/header.php';
        }
    ?>
        <?php
        if (isset($tipo)) {
                if($tipo == Tipo::EMPRESA){
                    switch ($var) {
                        case 'crear':
                            require_once './Vistas/Principal/navEmpresaCrear.php';
                            break;
                        case 'listaKebab':
                            require_once './Vistas/Principal/navEmpresaListado.php';
                            break;
                        default:
                        require_once './Vistas/Principal/navEmpresa.php';
                        break;
                        }
                }elseif($tipo == Tipo::REPARTIDOR || $tipo == Tipo::COCINA){
                    require_once './Vistas/Principal/navtrabajador.php';
                }
            }else{
        switch ($var) {
            case 'inicio':
                require_once './Vistas/Principal/nav.php';
                break;
            case 'carta':
                require_once './Vistas/Principal/navCarta.php';
                break;
            case 'gusto':
                require_once './Vistas/Principal/navGusto.php';
                break;
            case 'registro':
                require_once './Vistas/Principal/navRegistro.php';
                break;
            case 'login':
                require_once './Vistas/Principal/navLogin.php';
                break;
            case 'contacto':
                require_once './Vistas/Principal/navContacto.php';
                break;
            case 'pedidos':
                require_once './Vistas/Principal/navPedidos.php';
                break;
            }

        }
        //require_once './Vistas/Principal/nav.php';
    ?>
    
        <?php
        switch ($var) {
            case 'inicio':
                require_once './Vistas/Principal/main.php';
                break;
            case 'carta':
                require_once './Vistas/Principal/mainCarta.php';
                break;
            case 'gusto':
                require_once './Vistas/Principal/mainGusto.php';
                break;
            case 'registro':
                require_once './Vistas/Principal/mainRegistro.php';
                break;
            case 'login':
                require_once './Vistas/Principal/mainlogin.php';
                break;
            case 'contacto':
                require_once './Vistas/Principal/maincontacto.php';
                break;
            case 'pedidos':
                require_once './Vistas/Principal/mainPedidos.php';
                break;
            case 'crear':
                if($tipo == Tipo::EMPRESA){
                    require_once './Vistas/Principal/mainEmpresaCrear.php';
                }else{
                    require_once './Vistas/Principal/nav.php';
                }
                break;
            
            case 'listaKebab':
                if($tipo == Tipo::EMPRESA){
                    require_once './Vistas/Principal/mainEmpresaListar.php';
                }else{
                    require_once './Vistas/Principal/nav.php';
                }
                break;
            }
    ?>
        <?php
        require_once './Vistas/Principal/footer.php';
    ?>
        <?php
         require_once './Vistas/Principal/scripts.php';
        if(isset($tipo)){
            require_once './Vistas/Principal/scriptsEmpresa.php';
            }
        switch ($var) {
            case 'inicio':
                require_once './Vistas/Principal/scriptsInicio.php';
                break;
            case 'carta':
                require_once './Vistas/Principal/scriptsCarta.php';
                break;
            case 'gusto':
                require_once './Vistas/Principal/scriptsGusto.php';
                break;
            case 'registro':
                require_once './Vistas/Principal/scriptsRegistro.php';
                break;
            case 'login':
                require_once './Vistas/Principal/scriptsLogin.php';
                break;
            case 'contacto':
                require_once './Vistas/Principal/scriptsContacto.php';
                break;
            case 'pedidos':
                require_once './Vistas/Principal/scriptsPedidos.php';
                break;
            }
    ?>
</body>
</html>