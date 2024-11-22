<?php

$user=null;
if($_GET['var']=="login"){
    $validar = new Validacion(); // Crear objeto de validación

    // Obtener los datos del formulario
    $errores = []; // Array de errores
    
    $usuario = $_POST['usuario'] ?? ''; // Asegurarse de que no esté vacío
    $password = trim($_POST['password'] ?? ''); // Asegurarse de que no esté vacío
    //echo $usuario;
    //echo $password;
    // Validación del usuario
    if (!$validar->Requerido('usuario')) {
        $errores[] = "El campo usuario es obligatorio";
    }
    
    // Validación del password
    if (!$validar->Requerido('password')) {
        $errores[] = "El campo password es obligatorio";
    }
    
    // Si es necesario, validar el patrón de la contraseña
    $patron = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$/"; // Patrón para la contraseña
    
    if (!$validar->Patron($password, $patron)) {
        $errores[] = "La contraseña no cumple con el patrón requerido";
    }
    
    // Verificar si la validación pasó
    if ($validar->ValidacionPasada()) {
        // Si la validación pasó, hacer el login
        $user = RepoUsuario::login($usuario, $password);
        //echo "Usuario logueado exitosamente!";
    } else {
        // Si la validación falló, mostrar los errores
        echo "Hubo errores en el formulario:<br>";
        foreach ($errores as $error) {
            echo "<p>$error</p>";
        }
    }

}elseif($_GET['var']=="registrarse"){
    // Crear objeto de validación
$validar = new Validacion();
 // Obtener los datos del formulario
 // Variables del formulario
 $usuario = $_POST['usuario'];
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
 
 // Array para almacenar los errores
 $errores = [];
 
 // Validar que los campos no estén vacíos (excepto resto)
 $errores[] = $validar->Requerido('usuario');
 $errores[] = $validar->Requerido('password');
 $errores[] = $validar->Requerido('nombre');
 $errores[] = $validar->Requerido('apellidos');
 $errores[] = $validar->Requerido('telefono');
 $errores[] = $validar->Requerido('email');
 $errores[] = $validar->Requerido('direccion');
 $errores[] = $validar->Requerido('numero');
 $errores[] = $validar->Requerido('provincia');
 $errores[] = $validar->Requerido('localidad');
 $errores[] = $validar->Requerido('codigopostal');
 
 // Validar el patrón de la contraseña (mínimo 8 caracteres, mayúsculas, minúsculas, números, y caracteres especiales)
 $patronPassword = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$/";
 $errores[] = $validar->Patron($password, $patronPassword);
 
 // Validar el teléfono (9 dígitos, empieza con 6)
 $patronTelefono = "/^6\d{8}$/";  // Empieza con 6 y seguido de 8 dígitos
 $errores[] = $validar->Patron($telefono, $patronTelefono);
 
 // Validar el código postal (5 dígitos)
 $patronCodigoPostal = "/^\d{5}$/";  // 5 dígitos
 $errores[] = $validar->Patron($codigopostal, $patronCodigoPostal);
 
 // Validar el número (debe ser un número)
 $errores[] = $validar->EnteroRango('numero',0,1000);  // Validación de entero
 
 // Validar el email (formato correcto de email)
 $errores[] = $validar->Email('email');
 
 // Validar que no haya errores
 if ($validar->ValidacionPasada()) {
     // Si todo es válido, proceder con el registro o acción correspondiente
     //echo "Formulario enviado correctamente.";
     // Aquí iría el código para procesar los datos, por ejemplo:
     // $user = RepoUsuario::registro($nombreUsuario, $password, $nombre, $apellidos, $telefono, $email, $direccion, $numero, $resto, $provincia, $localidad, $codigopostal);
 
    // Crear el objeto Usuario con los datos del formulario
    $usuario = new Usuario(null, $nombre, $apellidos, $telefono, $usuario, $password, Tipo::USUARIO, $email, null, 0, null, null);
    // dfakdljfañdsjfksdak( id,  nombre, apellidos, telefono, usuario, password, tipo, correo, carrito, saldo, direcciones, alergenos)
    // Crear la dirección del usuario
    $direccionUser = new Direccion(null, $direccion, $numero, $resto, null, $localidad, $provincia, null);

    // Agregar la dirección al usuario
    $usuario->direcciones[] = $direccionUser;

    // Guardar el usuario y la dirección en la base de datos
    $user = RepoUsuario::nuevo($usuario);

    // si el usuario se ha creado correctamente, lo registramos en la sesion logeandolo
    // lo redirigimos a la pagina principal
 
    } else {
     // Si hay errores, mostrar los mensajes correspondientes
     foreach ($validar->errores as $campo => $error) {
         echo "<p>$error</p>";
     }
 }
 
   
}
if($user!=null){
    Loguear::login($user);
    $_GET['var']="inicio";
}else{
    $_GET['var']="registro";
}


