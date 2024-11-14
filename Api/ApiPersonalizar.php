<?php
// Asegúrate de que estos encabezados estén definidos antes de cualquier salida
header("Access-Control-Allow-Origin: *");  // Permitir todos los orígenes o usa http://localhost si solo es para tu entorno local
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  // Permitir los métodos CORS que tu servidor manejará
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Permitir los encabezados necesarios
header("Access-Control-Allow-Credentials: true");  // Permitir credenciales (si es necesario)

// Asegúrate de que las respuestas sean en formato JSON
header('Content-Type: application/json');

// Si la solicitud es de tipo OPTIONS, responder con los encabezados CORS y salir
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);  // Responder con código 200 y no procesar más la solicitud
}

// Cargar las dependencias necesarias
require_once '../micargador.php';

// Obtener el parámetro 'var' de la URL
$peticion = isset($_GET['var']) ? $_GET['var'] : '';

// Gestiona los endpoints
switch ($peticion) {
    case 'plantilla':
        // Respuesta exitosa para obtener la lista de kebabs
        http_response_code(200);
        // Quiero enviar la plantilla de personalización que es un archivo php
        $plantilla = file_get_contents('../Plantilla/personalizar.html');
        // Codificar en formato JSON y mostrar
        echo $plantilla;
        break;

    default:
        // Respuesta para un endpoint no encontrado
        http_response_code(404); // Usualmente se usa el código 404 para "Not Found"
        echo json_encode(["error" => "Endpoint no encontrado"]);
        break;
}