

//<img id="iconoUsuario" src='https://api.dicebear.com/9.x/pixel-art/svg?seed=francisco'>
window.addEventListener("load", function() {

function cambiarIconoUsuario(seed) {
    const userDiv = document.getElementById('user');
    const nuevaImagen = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`;
    userDiv.style.backgroundImage = `url('${nuevaImagen}')`;
}

cambiarIconoUsuario('');


fetch("http://www.mykebab.com/aplicacion/kebabs") // aqui realizo la peticion de los kebabs para ponerlos en el carrusel
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
            //elementoCarrusel.style.backgroundImage = `url(./imagenes/${kebab.foto})`;// foto tiene el nombre kebab_clasico_Pollo.jpg
            elementoCarrusel.classList.add("carousel-item");
            elementoCarrusel.innerHTML = `
                <div class="producto border rounded p-3 text-center">
                    <h3>${kebab.nombre}</h3>
                    <p>${kebab.descripcion}</p>
                    <p>${kebab.precio}€</p>
                    <div class="botones">
                    <input type="button" class="personalizar ${kebab.nombre}" value="Personalizar">
                    <input type="button" class="botonComprar ${kebab.nombre}" value="Comprar"> 
                    </div>
                </div>
            `;

            // Seleccionamos el div con clase 'producto' recién creado
            const elementoProducto = elementoCarrusel.querySelector('.producto');
            const personalizar = elementoProducto.querySelector('.personalizar');
            const botonComprar = elementoProducto.querySelector('.botonComprar');
            personalizar.addEventListener('click', function() {
                alert("personalizar");
                //botonComprar.click();
            });
            botonComprar.addEventListener('click', function() {
                alert("comprar");
                //personalizar.click();
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


})
