<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/csscanvas.css">
    <script src="js/jscanvas.js"></script>
   
</head>
<body>
    <div class="cargaImagen">
    <input type="file" id="imagen" accept="image/*" class="cargaImagen">
    <button id="cargar" class="cargar">Cargar imagen</button>
    </div>
    <div class="camara">
    <button id="activarCamara" class="hacerFoto">Camara</button>
    <button id="foto" disabled class="hacerFoto">Hacer foto</button>
    </div>
    <div class="guardando">
    <button id="guardar" class="guardarImagen">Guardar</button>
    </div>
    <div id="contenedor">
        <canvas id="canvas"></canvas>
        <div id="difuminado"></div>
        <div id="foco"></div>
    </div>
</body>
</html>