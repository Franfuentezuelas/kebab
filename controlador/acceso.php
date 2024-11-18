<?php

if(isset($_POST['usuario']) && isset($_POST['password']) && !isset($_POST['nombre'])){
    $usuario=$_POST['usuario'];
    $password=$_POST['password'];

    $user = RepoUsuario::login($usuario, $password);
    if($user!=null){
        Loguear::login($user);
        $_POST['var']="inicio";
    }else{
        $_POST['var']="login";
    }

}else{
// si esta correcto sesion star
$_POST['var']="inicio";
}


