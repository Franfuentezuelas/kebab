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

// Iniciar sesión antes de acceder a cualquier variable de sesión
Loguear::iniciarSesion();

if(isset($_GET['var']) && loguear::estaLogado()){
    
switch ($_GET['var']) {
    case 'nombre':
        // Respuesta exitosa para obtener la lista de kebabs
        http_response_code(200);
        // devuelvo en nombre del usuario si tiene la sesion iniciada
        echo $_SESSION['usuario'];
        break;

    case 'carrito':
        
        if(!isset($_SESSION['enviado'])){
            http_response_code(200);
            $_SESSION['enviado']=true;
            $usuario = $_SESSION['user']; // Recuperar el objeto
            $carrito = $usuario->carrito; // Acceder al carrito
            if($carrito==null){
                $carrito = "[{}]";
            }
            echo $carrito;
        }else{
            http_response_code(405);
            echo json_encode(['message' => 'Ya se cargo el carrito']);
        }

        break;

        case 'actualizarCarrito':
            http_response_code(200);
            
            // Leer el cuerpo de la solicitud
            $inputData = file_get_contents('php://input');  // Obtiene el cuerpo de la solicitud
        
            // Intentar decodificar la cadena de texto JSON recibida
            $data = json_decode($inputData, true);  // Convertimos el texto JSON a un array PHP
        
            if (isset($data['carrito'])) {  // Verificamos si el carrito está presente en los datos
                $usuario = $_SESSION['user'];  // Recuperar el objeto del usuario desde la sesión
        
                // Asignar el carrito recibido al objeto usuario
                $usuario->carrito = json_encode($data['carrito']);  // Guarda el carrito enviado en el usuario
        
                // Actualizar el usuario en la base de datos (esto depende de tu implementación de RepoUsuario)
                $usuarioActualizado = RepoUsuario::update($usuario);
        
                if ($usuarioActualizado) {
                    // Responder con el carrito actualizado
                    $_SESSION['user'] = $usuarioActualizado;  // Actualiza la sesión con el usuario actualizado
                    echo json_encode([
                        'message' => 'Carrito actualizado correctamente',
                        'carrito' => $usuarioActualizado->carrito  // Devuelves el carrito actualizado al cliente
                    ]);
                } else {
                    // Si no se pudo actualizar, responder con un error
                    echo json_encode(['message' => 'Error al actualizar el carrito']);
                }
            } else {
                // Si no se envió el carrito, devolver un error
                echo json_encode(['message' => 'No se recibió el carrito en la solicitud']);
            }
            break;

    default:
        // Respuesta para un endpoint no encontrado
        http_response_code(404); // Usualmente se usa el código 404 para "Not Found"
        echo json_encode(["error" => "Endpoint no encontrado"]);
        break;
}

}else{
    http_response_code(403); // Usualmente se usa el código 403 no tiene permiso ya que no hay sesion iniciada
    echo "";
}