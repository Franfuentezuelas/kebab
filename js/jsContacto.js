//<img id="iconoUsuario" src='https://api.dicebear.com/9.x/pixel-art/svg?seed=francisco'>
window.addEventListener("load", function() {

    // Obtén el contenedor del carrito y el contador
var carrito = document.getElementById("carrito");
var contador = document.getElementById("contador");

// Verifica si el carrito ya está almacenado en localStorage
if (localStorage.getItem("carrito")) {
    // Si existe, lo carga desde localStorage
    carrito.kebabs = JSON.parse(localStorage.getItem("carrito"));
} else {
    // Si no existe, crea un nuevo carrito vacío
    carrito.kebabs = [];
}

    // Si el contador es un span u otro elemento, agregamos el número al contenido actual
    contador.textContent = carrito.kebabs.length; // Concatenamos el texto con el número de kebabs
    contador.value = carrito.kebabs.length; // Concatenamos el texto con el número de kebabs

function cambiarIconoUsuario(seed) {
    const userDiv = document.getElementById('user');
    const nuevaImagen = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`;
    userDiv.style.backgroundImage = `url('${nuevaImagen}')`;
}

cambiarIconoUsuario('');

})
