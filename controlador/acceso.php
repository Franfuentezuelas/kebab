<?php

$_GET['var']="inicio";

    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    $user = RepoUsuario::login($usuario, $password);
    if($user!=null){
        Loguear::login($user);
        $_GET['var']="inicio";
    }else{
        $_GET['var']="registro";
    }




