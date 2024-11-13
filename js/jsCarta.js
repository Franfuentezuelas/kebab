window.addEventListener("load", function() {

    // Función para cambiar el icono de usuario
    function cambiarIconoUsuario(seed) {
        const userDiv = document.getElementById('user');
        const nuevaImagen = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`;
        userDiv.style.backgroundImage = `url('${nuevaImagen}')`;
    }

    // Cambiar el icono al cargar la página (por defecto vacío)
    cambiarIconoUsuario('');

    // Hacer la solicitud a la API para obtener los kebabs
    fetch("http://www.mykebab.com/aplicacion/kebabs")
        .then(response => response.json())
        .then(kebabs => {
            // Obtenemos el contenedor donde estarán los elementos del carrusel
            const carta = document.querySelector(".productos");
            // Limpiamos el contenido existente
            carta.innerHTML = "";   

            // Recorremos cada kebab para agregarlo al carrusel
            kebabs.forEach((kebab, index) => {
                // Creamos un div para cada item del carrusel
                const elementoCarta = document.createElement("div");
                elementoCarta.classList.add("col-12", "col-sm-12", "col-md-6", "col-lg-4", "col-xl-3");
                // Creamos el contenido HTML para cada kebab
                elementoCarta.innerHTML = `
                    <div class="producto border rounded p-3 text-center">
                        <div class="producto-titulo">
                            <h3>${kebab.nombre}</h3>
                        </div>
                        <div class="producto-descripcion">
                            <p>${kebab.descripcion}</p>
                        </div>
                        <div class="producto-precio">
                            <p>${kebab.precio}€</p>
                        </div>
                        <div class="producto-botones">
                            <input type="button" class="personalizar ${kebab.nombre}" value="Personalizar">
                            <input type="button" class="botonComprar ${kebab.nombre}" value="Comprar">
                        </div>
                    </div>

                `;

                // Seleccionamos el producto y los botones
                const producto = elementoCarta.querySelector('.producto');
                const personalizar = elementoCarta.querySelector('.personalizar');
                const botonComprar = elementoCarta.querySelector('.botonComprar');

                // Añadimos los eventos a los botones
                personalizar.addEventListener('click', function() {
                    alert("Personalizar");
                });

                botonComprar.addEventListener('click', function() {
                    alert("Comprar");
                });

                // Aplicamos la imagen de fondo al producto
                producto.style.backgroundImage = `url(./imagenes/${kebab.foto})`;
                producto.style.backgroundSize = 'cover';
                producto.style.backgroundPosition = 'center';
                producto.style.backgroundRepeat = 'no-repeat';

                // Añadimos el item al carrusel
                carta.appendChild(elementoCarta);
            });
        })
        .catch(error => console.error("Error fetching kebabs:", error)); // Manejo de errores

});

