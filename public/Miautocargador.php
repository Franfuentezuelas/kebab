<?php
spl_autoload_register(function ($clase) {
//var_dump($_SERVER['DOCUMENT_ROOT']);// /servidor proyectos/
    include $_SERVER['DOCUMENT_ROOT'].'/servidor proyectos/Plantillas/App/Controllers/HomeController.php';
    include $_SERVER['DOCUMENT_ROOT'].'/servidor proyectos/Plantillas/App/Models/User.php';
    
});
