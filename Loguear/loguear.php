<?php

class Loguear{


/**
 * funcion iniciar sesion
 * @return [void]
 */
public static function iniciarSesion():void{
    session_start();
}

/**
 * funcion cerrar sesion
 * @return [void]
 */
public static function cerrarSesion():void{
    if(isset($_SESSION)){
        unset($_SESSION);
    }
    session_destroy();
}
/**
 * login strim usuario que se va a loguear, arranca la sesion
 * @param mixed $usuario
 * @return [void]
 */
public static function login($usuario) : void{
    iniciarSesion();

    $_SESSION['user']=$usuario;
    $_SESSION['usuario']=$usuario->nombre;
}
/**
 * logout  cierra sesion (session_destroy());
 * @return [void]
 */
public static function logout() : void{
    unset($_SESSION);
    cerrarSesion();
}

/**
 * funcion esta logueado devuelve true/false $_SESSION['user'] tiene que existir
 * @return [boolean]
 */
public static function estaLogado(){
    return isset($_SESSION['user'])? true:false;
}
// funcion guardar_sesion
/**
 * @param mixed $clave
 * @param mixed $valor
 * @return [void]
 */
public static function guardarSesion($clave, $valor) : void{
    isset($_SESSION)? $_SESSION[$clave]=$valor:false;
    
}
// funcion leer_sesion
/**
 * @param mixed $clave
 * @return [mixed]
 */
public static function leerSesion($clave) : mixed{
    $valor="";
    if(isset($_SESSION[$clave])){
        $valor=$_SESSION[$clave];
    }
    return $valor;
}

}