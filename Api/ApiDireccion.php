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
// Obtener el parámetro 'var' de la URL
$peticion = isset($_GET['var']) ? $_GET['var'] : '';

// Verificar si las variables 'usuario' y 'password' existen
if ($peticion=="provincias"){
    echo json_encode(RepoDireccion::provincias());
}else{
    echo json_encode(RepoDireccion::localidades($peticion));
}

