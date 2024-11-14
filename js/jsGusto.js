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

    // incluir el evento de pulsar comprar
    const comprar = document.getElementById("comprar");
    comprar .addEventListener('click', function() {
        // obtengo el kebab con los ingredientes seleccionados
        // tengo que cojer el kebab 
        const kebab= document.getElementById("imagen").kebab;
        // obtengo los ingredientes seleccionados
        var seleccionados = Array.from(document.getElementById("ingredientes").children);
       
        // verifico si el kebab tiene los mismos ingredientes que hay seleccionados
        kebab.ingredientes.sort((a, b) => a.id-b.id);
        seleccionados.sort((a, b) => a.id-b.id);
        console.log(kebab.ingredientes);
        console.log(seleccionados);
        var mismoKebab = true;
        if (kebab.ingredientes.length === seleccionados.length) {
             
            for (let i = 0; i < kebab.ingredientes.length; i++) {
                if (kebab.ingredientes[i] !== seleccionados[i]) {
                    if(mismoKebab){
                        mismoKebab = false;
                    }
                }
            }
        }else{
            mismoKebab = false;
        }

        if (mismoKebab) {
            alert("Tiene que tener al menos un ingrediente");
        }else{
            console.log(kebab);
            //solo metemos el kebab si almenos tiene un ingrediente
            if(kebab.nombre == "Kebab Al Gusto" && seleccionados.length>0){
                kebab.kebab_id= kebab.id;
                kebab.id= null;
                kebab.nombre=kebab.nombre+" personalizado";
                kebab.ingredientes=seleccionados;
                kebab.precio=precio;
                console.log(kebab);
                // mandamos el kebab al carrito
                // Obtén el contenedor del carrito y el contador
                var carrito = document.getElementById("carrito");
                var contador = document.getElementById("contador");
                carrito.kebabs.push(kebab);

                // Guardar el carrito actualizado en localStorage
                localStorage.setItem("carrito", JSON.stringify(carrito.kebabs));

                // Actualizar el contador
                var contar = carrito.kebabs.length; // Número de kebabs en el carrito
                contador.value = contar;  // Actualiza el valor si el contador es un input
                contador.textContent = contar;  // Actualiza el texto si el contador es un span
                console.log(carrito.kebabs);

            }

            alert("Kebab agregado al carrito");
            // mando el kebab al carrito directamente
                // Recargar la página
                location.reload();
            
        }

        // obtengo el precio que se ha calculado
 
        // si tiene los mismos compramos el kebab directamente
        // si no modificamos el kebab pasando el id a kebab_id
        // los ingredientes los cambio por los que tiene seleccionados 
        // meto el precio nuevo calculado
        // agrego el kebab al carrito 
        // recargo la pagina para que vuelva al pulto inicial y podamos crear otro personalizado en este caso

    });

    //Hacer la solicitud a la API para obtener el kebab
    fetch("http://www.mykebab.com/aplicacion/gusto") //https://cors-anywhere.herokuapp.com/http://www.mykebab.com/aplicacion/kebabs
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
        imagen.kebab = kebab;
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
                elementoIngrediente.innerHTML = ingrediente.nombre+" "+ingrediente.precio+"€";

                // Añado el evento de click que se enviara el div al div ingredientes
                // Añado el evento de arrastrar el div al div ingredientes

                // Suponiendo que ya tienes los elementos con id "personalizar" y "ingredientes" en el HTML
                const personalizado = document.getElementById("personalizar");
                const ingredientes = document.getElementById("ingredientes");

                // Asumiendo que "elementoIngrediente" es el elemento que quieres mover entre los divs
                elementoIngrediente.addEventListener('click', function() {
                    // Obtenemos el elemento padre de "elementoIngrediente"
                    const parentElement = elementoIngrediente.parentElement;

                    // Comprobamos si el elemento está dentro de "ingredientes"
                    if (parentElement.id === "ingredientes") {
                        // Si está en "ingredientes", lo movemos a "personalizar"
                        personalizado.appendChild(elementoIngrediente);
                    } else if (parentElement.id === "personalizar") {
                        // Si está en "personalizar", lo movemos a "ingredientes"
                        ingredientes.appendChild(elementoIngrediente);
                    }

                    // tengo que calcular el precio del kebab nuevamente
                    var seleccionados = Array.from(document.getElementById("ingredientes").children);
                    var precios=[];

                    // Obtenemos el elemento del div de alergenos
                    const alergenos= document.getElementById("alergenos");
                    while (alergenos.firstChild) {
                        alergenos.removeChild(alergenos.firstChild);
                    }
                    // una vez quitados los alergenos del div y cargamos despues los que sean necesarios
                    // saco todos los precios de los ingredientes seleccionados
                    seleccionados.forEach(ingrediente => {
                        // Obtenemos el precio del ingrediente
                        console.log(ingrediente.ingrediente.precio);
                        precios.push(ingrediente.ingrediente.precio);

                        // Obtenemos los alergenos del ingrediente
                        ingrediente.ingrediente.alergenos.forEach(alergeno => {


                            const elementoAlergeno = document.getElementById(alergeno.nombre);
                            if(!elementoAlergeno){
                                const elementoAlergeno= document.createElement("div");
                                elementoAlergeno.id=alergeno.nombre;
                                elementoAlergeno.alergeno = alergeno;
                                elementoAlergeno.alt = alergeno.nombre;
                                elementoAlergeno.title = alergeno.nombre;
                                elementoAlergeno.classList.add("sprites");
                                //elementoAlergeno.src = `./imagenes/${alergeno.foto}/50`;
                                // Añadimos el elemento al div de alergenos
                                alergenos.appendChild(elementoAlergeno);
                            }
                        });
                    });
                    
                    precios.sort((a, b) => a - b);
                    console.log(precios);
                    precios = precios.slice(3); // Aquí se eliminan los tres primeros precios
                    // calcular precio
                    var coste = 0;
                    precios.forEach(precio => {
                        coste += precio;
                    });
                    const precio = document.getElementById("precio");
                    coste=coste+precio.value
                    // obtengo el precio base del kebab
                    // Redondear a dos decimales
                    coste = coste.toFixed(2);  // Esto convierte el coste en una cadena con dos decimales
                    precio.innerHTML="";
                    precio.innerHTML =coste+"€";
                    // incluir los alergenos para que se vean

                });

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
                const alergenos =document.getElementById("alergenos");
                ingrediente.alergenos.forEach(alergeno => {
                    // Creamos un div para cada item del carrusel   
                    const elementoAlergeno = document.getElementById(alergeno.nombre);
                    if(!alergeno){
                        const elementoAlergeno= document.createElement("img");
                        elementoAlergeno.id.alergeno;
                        elementoAlergeno.alt = alergeno.nombre;
                        elementoAlergeno.title = alergeno.nombre;
                        elementoAlergeno.src = `./imagenes/${alergeno.foto}/50`;

                        alergenos.appendChild(elementoAlergeno);
                    }
                });
        })
    })
        .catch(error => console.error("Error fetching kebabs:", error)); // Manejo de errores
    
});
