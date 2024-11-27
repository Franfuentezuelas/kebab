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

if(loguear::estaLogado()){
       
        $pedido = null;
      
        

        // esta parte esta en el archivo transaccionPedido.php
        // tengo que crear el pedido con los catos del carrito
        // incluir en un bucle las lineas de pedido
        // agregar los importe de esa linea al pedido que los ira acumulando
        // finalizar la transeccion
        
        try {

        $pedido = TransaccionPedido::transaccionPedido($_SESSION['user']->id);
           

        
            Correo::Correo($_SESSION['user'], $pedido);

            $_SESSION['user']->carrito= "[{}]";

        //RepoUsuario::updateCarro($_SESSION['user']->id);

            // Respuesta exitosa para obtener la lista de kebabs
            http_response_code(200);
            // Mostrar mensaje de éxito
            echo "ok";

            
        } catch (Exception $e) {

            // Respuesta exitosa para obtener la lista de kebabs
            http_response_code(404);
            // Mostrar mensaje de error si algo salió mal
            echo "Error al procesar el pedido: " . $e->getMessage();
        }
     
}else{
    http_response_code(403); // Usualmente se usa el código 403 no tiene permiso ya que no hay sesion iniciada
    echo "no logado";
}