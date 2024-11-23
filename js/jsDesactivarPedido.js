window.addEventListener("load", function() {
    // Obtén el contenedor del carrito y el contador
    Logado();
});

async function Logado() {
    await fetch('http://www.mykebab.com/usuario/nombre')
        .then(response => response.text())
        .then(usuario => {
            console.log(usuario);
            if (usuario == "") {
                const pedidos = document.querySelector('a[href="pedidos"]');
                pedidos.parentElement.style.display = "none";
            } else {
                const pedidos = document.querySelector('a[href="pedidos"]');
                pedidos.parentElement.style.display = "";
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}