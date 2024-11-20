<?php

$user=null;
if($_GET['var']=="login"){

    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    $user = RepoUsuario::login($usuario, $password);

}elseif($_GET['var']=="registrarse"){
 // Obtener los datos del formulario
$nombreUsuario = $_POST['usuario'];  // Cambiar el nombre de la variable para evitar confusión
$password = $_POST['password'];
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$direccion = $_POST['direccion'];
$numero = $_POST['numero'];
$resto = $_POST['resto'];
$provincia = $_POST['provincia'];
$localidad = $_POST['localidad'];
$codigopostal = $_POST['codigopostal'];

// Crear el objeto Usuario con los datos del formulario
$usuario = new Usuario(null, $nombre, $apellidos, $telefono, $nombreUsuario, $password, Tipo::USUARIO, $email, null, 0, null, null);
// dfakdljfañdsjfksdak( id,  nombre, apellidos, telefono, usuario, password, tipo, correo, carrito, saldo, direcciones, alergenos)
// Crear la dirección del usuario
$direccionUser = new Direccion(null, $direccion, $numero, $resto, null, $localidad, $provincia, null);

// Agregar la dirección al usuario
$usuario->direcciones[] = $direccionUser;

// Guardar el usuario y la dirección en la base de datos
$user = RepoUsuario::nuevo($usuario);

    // si el usuario se ha creado correctamente, lo registramos en la sesion logeandolo
    // lo redirigimos a la pagina principal
   
}
if($user!=null){
    Loguear::login($user);
    $_GET['var']="inicio";
}else{
    $_GET['var']="registro";
}


