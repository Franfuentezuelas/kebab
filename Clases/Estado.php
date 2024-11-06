<?php
namespace Clases;

enum Estado: string {
    case RECIBIDO = 'RECIBIDO';
    case ENPREPARACION = 'EN PREPARACION';
    case ENVIADO = 'ENVIADO';
    case COMPLETADO = 'COMPLETADO';
}
