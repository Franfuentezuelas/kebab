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
    case 'kebabs':
        // Respuesta exitosa para obtener la lista de kebabs
        http_response_code(200);
        // Lógica para devolver la lista de kebabs
        $kebabs = RepoKebab::getDeCasa(); // Asegúrate de que esta función esté definida correctamente

        // Codificar en formato JSON y mostrar
        echo json_encode($kebabs);
        break;

    case 'carta':
        // Respuesta exitosa para obtener la lista de kebabs
        http_response_code(200);
        // Lógica para devolver la carta
        $kebabs = RepoKebab::getCarta(); // Asegúrate de que esta función esté definida correctamente

        // Codificar en formato JSON y mostrar
        echo json_encode($kebabs);
        break;

    case 'gusto':
        // Respuesta exitosa para obtener el kebab al gusto
        http_response_code(200);
        // Lógica para devolver el kebab al gusto
        $kebab = RepoKebab::findByID(1); // Asegúrate de que esta función esté definida correctamente

        // Codificar en formato JSON y mostrar
        echo json_encode($kebab);
        break;

    case 'ingredientes':
        // Respuesta exitosa para obtener la lista de ingredientes
        http_response_code(200);
        // Lógica para devolver los ingredientes
        $ingredientes = RepoIngrediente::getAll(); // Asegúrate de que esta función esté definida correctamente

        // Codificar en formato JSON y mostrar
        echo json_encode($ingredientes);
        break;
    case 'canvas':
        // Respuesta exitosa para obtener la lista de kebabs
        http_response_code(200);
        // Lógica para devolver la lista de kebabs
        // Codificar en formato JSON y mostrar
        echo file_get_contents('../canvas/index.html');
        break;

    default:
        // Respuesta para un endpoint no encontrado
        http_response_code(404); // Usualmente se usa el código 404 para "Not Found"
        echo json_encode(["error" => "Endpoint no encontrado"]);
        break;
}



