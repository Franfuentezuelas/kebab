<?php


enum Estado: string {
    case RECIBIDO = 'RECIBIDO';
    case ENPREPARACION = 'ENPREPARACION';
    case ENVIADO = 'ENVIADO';
    case COMPLETADO = 'COMPLETADO';
}
