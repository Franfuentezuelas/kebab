<?php
// Asegúrate de que estos encabezados estén definidos antes de cualquier salida
header("Access-Control-Allow-Origin: *");  // Permitir todos los orígenes o usa http://localhost si solo es para tu entorno local
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  // Permitir los métodos CORS que tu servidor manejará
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Permitir los encabezados necesarios
header("Access-Control-Allow-Credentials: true");  // Permitir credenciales (si es necesario)

// Establecer el encabezado de respuesta para indicar que estamos trabajando con JSON
header('Content-Type: application/json');

// Cargar las dependencias necesarias
require_once '../micargador.php';
// Obtener los datos JSON enviados en la solicitud
$input = file_get_contents('php://input');

// Decodificar el JSON recibido
$data = json_decode($input, true); // El 'true' convierte el JSON en un array asociativo

// Verificar si los datos fueron decodificados correctamente
if ($data === null) {
    // Si no se puede decodificar el JSON
    echo json_encode(["error" => "Datos JSON inválidos"]);
    exit;
}

// Verificar si las variables 'usuario' y 'password' existen
if (isset($data['usuario']) && isset($data['password'])) {
    $usuario = $data['usuario'];
    $password = $data['password'];
    
    // Aquí puedes hacer lo que necesites con los datos, como validar el usuario y la contraseña
    // Ejemplo de validación simple:
    $correcto = RepoLogin::usuarioExiste($usuario);
    if($correcto=="false"){
        echo json_encode(["mensaje" => "Usuario no existe REGISTRATE!"]);
    }else{
        $correcto = RepoLogin::login($usuario, $password);
        if($correcto=="false"){
            echo json_encode(["mensaje" => "Contraseña incorrecta"]);
        }else{
            echo json_encode(["mensaje" => "Login exitoso"]);
        }
    }
} else {
    // Si no se reciben las variables 'usuario' o 'password'
    echo json_encode(["mensaje" => "Faltan parámetros 'usuario' o 'password'"]);
}

