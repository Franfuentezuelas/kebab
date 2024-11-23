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
    <input type="file" id="imagen" accept="image/*">
    <button id="cargar">Cargar imagen</button>
    <br>
    <button id="activarCamara">Camara</button>
    <button id="foto" disabled>Hacer foto</button>

    <div id="contenedor">
        <canvas id="canvas"></canvas>
        <div id="difuminado"></div>
        <div id="foco"></div>
    </div>
    <button id="guardar">Guardar</button>
</body>
</html>