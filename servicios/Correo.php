<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

//require 'PHPMailer/PHPMailerAutoload.php';
Loguear::iniciarSesion();

class Correo
{

    public static function Correo ($usuario, $pedido) {

        $mail = new PHPMailer(true);
        
        $mail->isSMTP();
        $mail->SMTPDebug = 1;
        $mail->Host = 'localhost:1025';
        //$mail->Host = 'host.docker.internal';// que docker se busque la vida para encontar el contenedor
        $mail->Port = 1025;
        $mail->SMTPAuth = false;
        
        
        $mail->setFrom('pedidos@correo.com', 'Pedido');
        $mail->addAddress($usuario->correo, $usuario->nombre);
  
        
        $mail->isHTML(true);
        $mail->Subject = 'Kebab';
        // quiero meter la la imagen en base64 en el cuerpo del mail
        $mail->Body = '
     
            <h1>Hola djfadlfjka</h1>
            <h1>adios</h1>
       
        ';
        $mail->AltBody = 'Este es el cuerpo del mensaje en formato HTML';
        //$mail->addAttachment('carro.jpg');
        
        // envio el correo del pedido al cliente
        $archivo = GeneradorPDF::GeneradorPDF($pedido);

        $mail->addStringAttachment($archivo, 'pedido.pdf', 'base64', 'application/pdf');
        
        $mail->send();
      
    }
}
