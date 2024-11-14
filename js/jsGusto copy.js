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

    // Fetch para obtener los ingredientes desde el servidor
    fetch("http://www.mykebab.com/aplicacion/ingredientes")
        .then(response => response.json())
        .then(ingredientes => {
            // Obtenemos el contenedor donde estarán los elementos del carrusel
            const personalizar = document.getElementById("personalizar"); // div personalizar
            //const personalizar = document.querySelector("#personalizar");
            // Añado el evento para que se pueda arrartar al div personalizar
            // personalizar.addEventListener('dragstart', function(event) {
            //     event.dataTransfer.setData('text/plain', event.target.id);
            // });
            // Limpiamos el contenido existente
            // personalizar.innerHTML = "";   

            // Recorremos cada kebab para agregarlo al carrusel
            ingredientes.forEach((ingrediente, index) => {
                // Creamos un div para cada item del carrusel
                const elementoIngrediente= document.createElement("div");
                elementoIngrediente.classList.add("item");
                
                elementoIngrediente.ingrediente = ingrediente;  // Asignamos el objeto kebab al elemento Carrusel
                // Creamos el contenido HTML para cada kebab
                elementoIngrediente.innerHTML = ingrediente.nombre;

                // Añado el evento de click que se enviara el div al div ingredientes
                // Añado el evento de arrastrar el div al div ingredientes
                // elementoIngrediente.addEventListener('click', function() {
                //     // muevo el elemento ingrediente al elemento personalizar
                //     personalizar.appendChild(elementoIngrediente);
                // });
                // elementoIngrediente.addEventListener('dragover', function(event) {
                //     event.preventDefault();
                //     elementoIngrediente.classList.add("dragover");  // Añade clase para resaltar
                // });
                // elementoIngrediente.addEventListener('dragleave', function() {
                //     elementoIngrediente.classList.remove("dragover");  // Elimina la clase cuando el objeto es arrastrado fuera
                // });
                // elementoIngrediente.addEventListener('drop', function(event) {
                //     event.preventDefault();
                //     elementoIngrediente.classList.remove("dragover");  // Elimina la clase al soltar
                //     // Añadir el elemento al elemento personalizar
                //     personalizar.appendChild(elementoIngrediente);
                // });

                // Aplicamos la imagen de fondo al producto
                // elementoIngrediente.style.backgroundImage = `url(./imagenes/${ingrediente.foto})`;
                // elementoIngrediente.style.backgroundSize = 'cover';
                // elementoIngrediente.style.backgroundPosition = 'center';
                // elementoIngrediente.style.backgroundRepeat = 'no-repeat';

                // Añadimos el item al carrusel
                personalizar.appendChild(elementoIngrediente);
            });
            //Hacer la solicitud a la API para obtener el kebab
            fetch("http://www.mykebab.com/aplicacion/gusto")
            .then(response => response.json())
            .then(kebab => {
                // Obtenemos el contenedor donde estarán los elementos del carrusel
                const imagen = document.getElementById("imagen");
                const descripcion = document.getElementById("descripcion");
                const precio = document.getElementById("precio");
                const ingredientes = document.getElementById("ingredientes");
                // Limpiamos el contenido existente
                imagen.innerHTML = "";
                descripcion.innerHTML = "";
                precio.innerHTML = "";

                // Añadimos los atributos del kebab
                imagen.src = `./imagenes/${kebab.foto}`;
                descripcion.innerHTML = kebab.descripcion;
                precio.innerHTML = kebab.precio+"€";
                precio.value = kebab.precio;

                // Recorremos cada kebab para agregarlo al carrusel
                kebab.ingredientes.forEach((ingrediente, index) => {
                        // Creamos un div para cada item del carrusel
                        const elementoIngrediente= document.createElement("div");
                        elementoIngrediente.classList.add("item");
                        
                        elementoIngrediente.ingrediente = ingrediente;  // Asignamos el objeto kebab al elemento Carrusel
                        // Creamos el contenido HTML para cada kebab
                        elementoIngrediente.innerHTML = ingrediente.nombre;


                    // Añadimos el item al carrusel
                    ingredientes.appendChild(elementoIngrediente);
                });
            })
            .catch(error => console.error("Error fetching kebabs:", error)); // Manejo de errores

        })
        .catch(error => console.error("Error fetching kebabs:", error)); // Manejo de errores


    

});