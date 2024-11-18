window.addEventListener("load", function() {
    // Obtén el contenedor del carrito y el contador
    var carrito = document.getElementById("carrito");
    var contador = document.getElementById("contador");

    // Función para mostrar el estado de "loading" (carga) mientras esperamos
    function mostrarLoading() {
        const loader = document.getElementById("loading");
        loader.style.display = "block";  // Muestra el indicador de carga
    }

    // Función para ocultar el estado de "loading" una vez que los datos se cargan
    function ocultarLoading() {
        const loader = document.getElementById("loading");
        loader.style.display = "none";  // Oculta el indicador de carga
    }

    mostrarLoading();  // Mostrar "loading" mientras cargamos los datos

    // Realizamos las dos solicitudes en paralelo con Promise.all
    Promise.all([
        fetch("http://www.mykebab.com/aplicacion/ingredientes").then(response => response.json()),
        fetch("http://www.mykebab.com/aplicacion/gusto").then(response => response.json())
    ])
    .then(([ingredientes, kebab]) => {
        // Después de que ambas solicitudes se resuelvan, ocultamos el "loading"
        ocultarLoading();

        // Manejo de ingredientes
        const personalizar = document.getElementById("personalizar");
        ingredientes.forEach(ingrediente => {
            const elementoIngrediente = document.createElement("div");
            elementoIngrediente.classList.add("item");
            elementoIngrediente.innerHTML = ingrediente.nombre;
            personalizar.appendChild(elementoIngrediente);
        });

        // Manejo de kebab
        const imagen = document.getElementById("imagen");
        const descripcion = document.getElementById("descripcion");
        const precio = document.getElementById("precio");
        const ingredientesContainer = document.getElementById("ingredientes");

        // Actualizamos la información del kebab
        imagen.src = `./imagenes/${kebab.foto}`;
        descripcion.innerHTML = kebab.descripcion;
        precio.innerHTML = `${kebab.precio}€`;
        precio.value = kebab.precio;

        // Añadimos los ingredientes al kebab
        kebab.ingredientes.forEach(ingrediente => {
            const elementoIngrediente = document.createElement("div");
            elementoIngrediente.classList.add("item");
            elementoIngrediente.innerHTML = ingrediente.nombre;
            ingredientesContainer.appendChild(elementoIngrediente);
        });
    })
    .catch(error => {
        ocultarLoading();  // Ocultar el "loading" en caso de error
        console.error("Error al cargar los datos:", error);
    });
});
