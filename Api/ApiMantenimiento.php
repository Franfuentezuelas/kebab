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

if(isset($_GET['var']) && loguear::estaLogado() && $_SESSION['user']->tipo==Tipo::EMPRESA){

    switch ($_GET['var']) {
        case 'kebab':
            // Respuesta exitosa para obtener la el kebab a guardar
            http_response_code(200);
         
            $jsonData = file_get_contents("php://input");
            $data = json_decode($jsonData, true);
            $foto = str_replace(' ', '_', $data['nombre']).'.jpg';
               
            if (isset($data['imagen']) && isset($data['nombre'])) {
                $base64Image = $data['imagen']; // String Base64 de la imagen
                
                // Extraer el tipo de imagen desde el encabezado
                if (preg_match('/^data:image\/([a-zA-Z0-9]+);base64,/', $base64Image, $matches)) {
                    $extension = $matches[1]; // Obtén la extensión (ej. "jpeg", "png")
                    
                    // Elimina el prefijo del Base64 para obtener solo los datos
                    $base64Image = substr($base64Image, strpos($base64Image, ',') + 1);
                    
                    // Decodifica los datos Base64
                    $imageData = base64_decode($base64Image);
                    if ($imageData === false) {
                        echo json_encode(["error" => "No se pudo decodificar la imagen"]);
                        exit;
                    }
            
                    // Asegúrate de que el nombre de archivo sea seguro y no tenga caracteres no válidos
                    $foto = preg_replace('/\s+/', '_', $data['nombre']) . '.' . $extension;
                    $filePath =  '..\\imagenes\\' . $foto; // Ruta para guardar el archivo
                    
                    // Guarda la imagen en el servidor
                    if (file_put_contents($filePath, $imageData)) {
                        echo json_encode([
                            "message" => "guardado correctamente", 
                            "file" => $foto
                        ]);
                       
                        $incluidos=[];
                        foreach($data['ingredientes'] as $ingrediente){
                           $incluidos[]=RepoIngrediente::findByID($ingrediente["id"]);
                        }
                        // Una vez guardada la imagen, crea el objeto Kebab
                        $kebab = new Kebab(
                            null,
                            $data['nombre'],
                            $foto,
                            $data['precio'],
                            $data['descripcion'],
                            $incluidos,
                            null
                        );
                    } else {
                        echo json_encode(["error" => "No se pudo guardar la imagen"]);
                    }
                } else {
                    echo json_encode(["error" => "Formato de imagen no válido"]);
                }
            } else {
                echo json_encode(["error" => "Datos incompletos"]);
            }
            
            break;
        // case 'ingreciente':
          
        //     break;
        
        // case 'otros':
           
        //     break;
        default:
            // Respuesta para un endpoint no encontrado
            http_response_code(404); // Usualmente se usa el código 404 para "Not Found"
            echo json_encode(["error" => "Endpoint no encontrado"]);
            break;
    }
}
    