<?php
    // quiero ortener la url que esta llamando a index.php con el parametro var
    if(!isset($_GET['var'])){
        $var="inicio";
    }else{
        $var=$_GET['var'];
    }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <?php
        require_once './Vistas/Principal/head.php';
    ?>
</head>
<body>
<?php
        require_once './Vistas/Principal/header.php';
    ?>
        <?php
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
            }   
    ?>
        <?php
        require_once './Vistas/Principal/footer.php';
    ?>
        <?php
        require_once './Vistas/Principal/scripts.php';
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
            }
    ?>
</body>
</html>