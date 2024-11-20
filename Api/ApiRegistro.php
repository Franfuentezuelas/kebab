<?php
// // Asegúrate de que estos encabezados estén definidos antes de cualquier salida
// header("Access-Control-Allow-Origin: *");  // Permitir todos los orígenes o usa http://localhost si solo es para tu entorno local
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  // Permitir los métodos CORS que tu servidor manejará
// header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Permitir los encabezados necesarios
// header("Access-Control-Allow-Credentials: true");  // Permitir credenciales (si es necesario)

// // Establecer el encabezado de respuesta para indicar que estamos trabajando con JSON
// header('Content-Type: application/json');

// // Cargar las dependencias necesarias
// require_once '../micargador.php';

// // Iniciar sesión antes de acceder a cualquier variable de sesión
// Loguear::iniciarSesion();

// if(!loguear::estaLogado()){
//         // Tengo que obtener la informacion del usuario enviada en el formulario

        
//             http_response_code(200);
//             $_SESSION['enviado']=true;
//             $usuario = $_SESSION['user']; // Recuperar el objeto
//             $carrito = $usuario->carrito; // Acceder al carrito
//             if($carrito==null){
//                 $carrito = "[{}]";
//             }
//             echo $carrito;
//         }else{
//             http_response_code(405);
//             echo json_encode(['message' => 'Ya se cargo el carrito']);
//         }

//         // Respuesta para un endpoint no encontrado
//         http_response_code(404); // Usualmente se usa el código 404 para "Not Found"
//         echo json_encode(["error" => "Endpoint no encontrado"]);




//     http_response_code(403); // Usualmente se usa el código 403 no tiene permiso ya que no hay sesion iniciada
//     echo ""; -->
