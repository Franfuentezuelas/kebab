<?php
    $valida=new Validacion();
    if(isset($_POST['submit']))
    {
        $valida->Requerido('usuario');
        $valida->Requerido('contrasena');

        //Comprobamos validacion
        if($valida->ValidacionPasada())
        {

        }
    }
