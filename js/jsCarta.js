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
                elementoCarta.kebab = kebab;  // Asignamos el objeto kebab al elemento Carrusel
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

                // Al hacer clic en el botón "comprar"
                botonComprar.addEventListener('click', function() {
                    // Añadir el kebab al carrito (elementoCarrusel.kebab hace referencia al objeto kebab)
                    carrito.kebabs.push(elementoCarta.kebab);
                    
                    // Guardar el carrito actualizado en localStorage
                    localStorage.setItem("carrito", JSON.stringify(carrito.kebabs));

                    // Actualizar el contador
                    var contar = carrito.kebabs.length; // Número de kebabs en el carrito
                    contador.value = contar;  // Actualiza el valor si el contador es un input
                    contador.textContent = contar;  // Actualiza el texto si el contador es un span
                    console.log(carrito.kebabs);
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

