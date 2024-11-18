window.addEventListener("load", function() {   

    // Obtén el contenedor del carrito y el contador
    var carrito = document.getElementById("carrito");
    var contador = document.getElementById("contador");
    
   // Fetch para obtener los kebabs desde el servidor
    fetch("http://www.mykebab.com/aplicacion/kebabs")
        .then(response => response.json())
        .then(kebabs => {
            // Obtenemos el elemento que contiene el carrusel (el contenedor de los items)
            const carruselInner = document.querySelector(".carousel-inner");
            
            // Limpiamos cualquier contenido existente en el carrusel
            carruselInner.innerHTML = "";

            // Recorremos cada kebab para agregarlo al carrusel
            kebabs.forEach((kebab, index) => {
                // Creamos un elemento de carrusel con el contenido del kebab
                const elementoCarrusel = document.createElement("div");
                elementoCarrusel.classList.add("carousel-item");
                elementoCarrusel.kebab = kebab;  // Asignamos el objeto kebab al elemento Carrusel
                
                elementoCarrusel.innerHTML = `
                    <div class="producto border rounded p-3 text-center">
                        <h3>${kebab.nombre}</h3>
                        <p>${kebab.descripcion}</p>
                        <p>${kebab.precio}€</p>
                        <div class="botones">
                            
                            <input type="button" class="botonComprar ${kebab.nombre}" value="Comprar"> 
                        </div>
                    </div>
                `;
                
                // Seleccionamos el div con clase 'producto' recién creado
                const elementoProducto = elementoCarrusel.querySelector('.producto');
                //const personalizar = elementoProducto.querySelector('.personalizar');
                const botonComprar = elementoProducto.querySelector('.botonComprar');
                
                // Agregar evento para el botón "personalizar" (solo un ejemplo)
                // personalizar.addEventListener('click', function() {
                //     alert("personalizar");
                //     // Puedes añadir aquí tu lógica de personalización
                // });

                // Al hacer clic en el botón "comprar"
                botonComprar.addEventListener('click', function() {
                    // Añadir el kebab al carrito (elementoCarrusel.kebab hace referencia al objeto kebab)
                    carrito.kebabs.push(elementoCarrusel.kebab);
                    
                    // Guardar el carrito actualizado en localStorage
                    localStorage.setItem("carrito", JSON.stringify(carrito.kebabs));

                    // Actualizar el contador
                    var contar = carrito.kebabs.length; // Número de kebabs en el carrito
                    contador.value = contar;  // Actualiza el valor si el contador es un input
                    contador.textContent = contar;  // Actualiza el texto si el contador es un span
                    console.log(carrito.kebabs);
                });

                // Aplicamos la imagen de fondo y los ajustes
                elementoProducto.style.backgroundImage = `url(./imagenes/${kebab.foto})`;
                elementoProducto.style.backgroundSize = 'cover';
                elementoProducto.style.backgroundPosition = 'center';
                elementoProducto.style.backgroundRepeat = 'no-repeat';

                // Si es el primer kebab, añadimos la clase 'active' para mostrarlo primero
                if (index === 0) {
                    elementoCarrusel.classList.add("active");
                }

                // Agregamos el elemento de carrusel al contenedor 'carousel-inner'
                carruselInner.appendChild(elementoCarrusel);
            });
        })
        .catch(error => console.error("Error fetching kebabs:", error)); // Agrega un manejo de errores
});