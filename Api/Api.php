<?php
// Permitir CORS desde localhost (ajústalo según sea necesario)
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../micargador.php';

$peticion=$_GET['var'];

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
        // Lógica para devolver la carta
        $kebabs = RepoKebab::getCarta(); // Asegúrate de que esta función esté definida correctamente

        // Codificar en formato JSON y mostrar
        echo json_encode($kebabs);
        break;

    default:
        // Respuesta para un endpoint no encontrado
        http_response_code(404); // Usualmente se usa el código 404 para "Not Found"
        echo json_encode(["error" => "Endpoint no encontrado"]);
        break;
}


