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
        case 'plantilla':
            // Respuesta exitosa para obtener la lista de pedidos
            http_response_code(200);
            // devuelvo la plantilla html de la tabla de pedidos
            echo file_get_contents('../Plantilla/pedidos.html');
            break;
        case 'pedidos':
            switch ($_SESSION['user']->tipo) {
                case Tipo::EMPRESA:
                    // Respuesta exitosa para obtener la lista de pedidos
                    http_response_code(200);
                    // devuelvo en nombre del usuario si tiene la sesion iniciada
                    echo json_encode(RepoPedido::getAll());
                    break;
                case Tipo::COCINA:
                    // Respuesta exitosa para obtener la lista de pedidos
                    http_response_code(200);
                    // devuelvo en nombre del usuario si tiene la sesion iniciada
                    echo json_encode(RepoPedido::getCocinaAll());
                    break;
                case Tipo::REPARTIDOR:
                    // Respuesta exitosa para obtener la lista de pedidos
                    http_response_code(200);
                    // devuelvo en nombre del usuario si tiene la sesion iniciada
                    echo json_encode(RepoPedido::getRepartidorAll());
                    break;
                default:
                    // Respuesta exitosa para obtener la lista de pedidos
                    http_response_code(200);
                    echo json_encode(RepoPedido::getByUsuarioId($_SESSION['user']->id));
                    break;
            }
            break;
        case 'actualizarPedido':
 
            if($_SESSION['user']->tipo !== Tipo::USUARIO){
                $inputJSON = file_get_contents('php://input');
                $input = json_decode($inputJSON, true); // true para obtener un array asociativo
                //echo $input['estado'];
                //echo $input['id'];

                    switch ($input['estado']) {
                        case 'RECIBIDO':
                            $estado = 'ENPREPARACION';
                            break;
                        case 'ENPREPARACION':
                            $estado = 'ENVIADO';
                            break;
                        case 'ENVIADO':
                            $estado = 'COMPLETADO';
                            break;
                        default:
                        $estado= 'COMPLETADO';
                        break;
                    }

                // Respuesta exitosa para obtener la lista de pedidos
                http_response_code(200);
                // devuelvo en nombre del usuario si tiene la sesion iniciada
                RepoPedido::updateEstado($input['id'], $estado);
                echo json_encode(["correcto" => "Actualizado correctamente"]);
            }else{
                http_response_code(403); // utilizo el 403 para "Forbidden" e indicar que no se tiene permiso
                echo json_encode(["error" => "No tiene permiso para realizar esta acción"]);
            }
            break;
        default:
            // Respuesta para un endpoint no encontrado
            http_response_code(404); // Usualmente se usa el código 404 para "Not Found"
            echo json_encode(["error" => "Endpoint no encontrado"]);
            break;
    }
}
    