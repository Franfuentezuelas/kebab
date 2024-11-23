window.addEventListener("load", function() {
    cargarTablaKebab();
    // incluir el evento de pulsar comprar
    const comprar = document.getElementById("comprar");
    comprar .addEventListener('click', function() {
        // obtengo el kebab con los ingredientes seleccionados
        // tengo que cojer el kebab 
        const kebab= document.getElementById("imagen").kebab;
        // obtengo los ingredientes seleccionados
        var seleccionados = Array.from(document.getElementById("ingredientes").children);
        // obtengo el precio que se ha calculado
        // si tiene los mismos compramos el kebab directamente
        // si no modificamos el kebab pasando el id a kebab_id
        // los ingredientes los cambio por los que tiene seleccionados 
        // meto el precio nuevo calculado
        // agrego el kebab al carrito 
        // recargo la pagina para que vuelva al punto inicial y podamos crear otro personalizado en este caso
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
            // metes en el carro el kebab de la casa
            // y cambias el carro agregando el nuevo kebab
            // cambias el numero de kebab que tiene el carro
            
        }else{
            console.log(kebab);
            //solo metemos el kebab si almenos tiene un ingrediente
            if(kebab.nombre == "Kebab Al Gusto" && seleccionados.length>0){
                kebab.kebab_id= kebab.id;
                kebab.id= null;
                kebab.nombre=kebab.nombre+" personalizado";
                kebab.ingredientes=[];
                var preciosIngredientes=[];
                seleccionados.forEach(function(select){
                    kebab.ingredientes.push(select.ingrediente);
                    preciosIngredientes.push(select.ingrediente.precio);
                });
                kebab.ingredientes.sort((a, b) => a.id-b.id);
                preciosIngredientes.sort((a, b) => a - b);
                preciosIngredientes=preciosIngredientes.slice(3);
                var precioTotal=precio.value;
                preciosIngredientes.forEach(function(precio){
                    precioTotal+=precio;
                });
                kebab.nuevoPrecio=precioTotal;
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
            actualizar(carrito.kebabs);
            // mando el kebab al carrito directamente
                // Recargar la página
                location.reload();
            
        }

        
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

            // Recorremos cada kebab para agregarlo al carrusel
            ingredientes.forEach((ingrediente, index) => {
                // Creamos un div para cada item del carrusel
                const elementoIngrediente= document.createElement("div");
                elementoIngrediente.classList.add("item");
                elementoIngrediente.id = "ingrediente"+ingrediente.id;
                elementoIngrediente.draggable = "true";
                elementoIngrediente.ingrediente = ingrediente;  // Asignamos el objeto kebab al elemento Carrusel
                // Creamos el contenido HTML para cada kebab
                elementoIngrediente.innerHTML = ingrediente.nombre+" "+ingrediente.precio+"€";

                // Añado el evento de click que se enviara el div al div ingredientes
                // Añado el evento de arrastrar el div al div ingredientes

            // Contenedor Personalizar
            const personalizado = document.getElementById("personalizar");
            personalizado.addEventListener('dragover', function (event) {
                event.preventDefault();  // Necesario para permitir el "drop"
            });

            // Contenedor Ingredientes
            const ingredientes = document.getElementById("ingredientes");
            ingredientes.addEventListener('dragover', function (event) {
                event.preventDefault();  // Necesario para permitir el "drop"
            });
                // Añadimos el evento para mover el div arrastrandolo

                // Evento para cuando el ingrediente comienza a arrastrarse
                elementoIngrediente.addEventListener('dragstart', function (event) {
                    event.dataTransfer.setData('text', event.target.id);  // Guardamos el id del elemento arrastrado
                    event.target.classList.add('dragging');  // Efecto visual
                });

                // Evento para cuando el ingrediente termina de arrastrarse
                elementoIngrediente.addEventListener('dragend', function (event) {
                    event.target.classList.remove('dragging');  // Eliminar efecto visual
                });

                // Evento para cuando se suelta un ingrediente sobre el contenedor "personalizar"
                personalizado.addEventListener('drop', function (event) {
                    event.preventDefault();  // Prevenir el comportamiento por defecto
                    console.log(event);
                    const idIngrediente = event.dataTransfer.getData('text');  // Obtener el id del ingrediente

                    const ingrediente = document.getElementById(idIngrediente);
                    // Mover el ingrediente al contenedor de "personalizar" si no está allí
                    console.log(idIngrediente);
                    console.log(ingrediente);
                    console.log("soltado en personalizar");
                    console.log(ingrediente.parentElement.id);

                    if (ingrediente.parentElement.id != "personalizado") {
                        personalizado.appendChild(ingrediente);
                        actualizarPrecioYAlergenos();
                        kebab.nuevoPrecio=precio.nuevoPrecio;
                    }
                });

                // Evento para cuando se suelta un ingrediente sobre el contenedor "ingredientes"
                ingredientes.addEventListener('drop', function (event) {

                    event.preventDefault();  // Prevenir el comportamiento por defecto
                    console.log(event);
                    const idIngrediente = event.dataTransfer.getData('text');  // Obtener el id del ingrediente
                    console.log(idIngrediente);
                    const ingrediente = document.getElementById(idIngrediente);
                    console.log(ingrediente);
                    // Mover el ingrediente al contenedor de "ingredientes" si no está allí
                    console.log(idIngrediente);
                    console.log(ingrediente);
                    console.log(ingrediente.parentElement.id);
                    console.log("soltado en ingredientes");
                    if (ingrediente.parentElement.id != "ingredientes") {
                        ingredientes.appendChild(ingrediente);
                        actualizarPrecioYAlergenos();
                        kebab.nuevoPrecio=precio.nuevoPrecio;
                    }
                });


                // elementoIngrediente es el elemento que quieres mover entre los divs
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
                    actualizarPrecioYAlergenos();
                   
                });
                // Añadimos el item al carrusel
                personalizar.appendChild(elementoIngrediente);
        })
    })
        .catch(error => console.error("Error fetching kebabs:", error)); // Manejo de errores
    
});

// Función que actualiza el precio y los alergenos
function actualizarPrecioYAlergenos() {
    // Obtenemos todos los ingredientes seleccionados en el contenedor "ingredientes"
    var seleccionados = Array.from(document.getElementById("ingredientes").children);
    var precios = [];

    // Obtenemos el elemento del div de alergenos
    const alergenos = document.getElementById("alergenos");
    
    // Limpiamos el div de alergenos antes de actualizar
    while (alergenos.firstChild) {
        alergenos.removeChild(alergenos.firstChild);
    }

    // Recorremos los ingredientes seleccionados
    seleccionados.forEach(ingrediente => {
        // Obtenemos el precio del ingrediente
        console.log(ingrediente.ingrediente.precio);
        precios.push(ingrediente.ingrediente.precio);

        // Obtenemos los alergenos del ingrediente
        ingrediente.ingrediente.alergenos.forEach(alergeno => {
            const elementoAlergeno = document.getElementById(alergeno.nombre);
            if (!elementoAlergeno) {
                const elementoAlergeno = document.createElement("div");
                elementoAlergeno.id = alergeno.nombre;
                elementoAlergeno.alergeno = alergeno;
                elementoAlergeno.alt = alergeno.nombre;
                elementoAlergeno.title = alergeno.nombre;
                elementoAlergeno.classList.add("sprites");

                // Añadimos el elemento al div de alergenos
                alergenos.appendChild(elementoAlergeno);
            }
        });
    });

    // Ordenamos los precios de menor a mayor
    precios.sort((a, b) => a - b);
    console.log(precios);

    // Eliminamos los tres primeros precios (los más bajos)
    precios = precios.slice(3);

    // Calcular el precio total
    var coste = 0;
    precios.forEach(precio => {
        coste += precio;
    });

    // Obtenemos el precio base del kebab
    const precioBase = document.getElementById("precio");
    coste = coste + parseFloat(precioBase.value);  // Añadimos el precio base del kebab

    // Redondeamos el precio final a dos decimales
    
    // var kebab= document.getElementById("imagen").kebab;
    // kebab.nuevoPrecio = coste;
    precioBase.nuevoPrecio = coste;
    coste = coste.toFixed(2);
    // Actualizamos el precio mostrado en la página
    precioBase.innerHTML = `${coste}€`;

    // Incluir los alergenos para que se vean
    // Aquí iría el código para agregar alergenos al ingrediente desde su inicio

   
}


function actualizar(carrito){
    const usuario = document.getElementById("user");
    console.log(usuario.innerText);

        fetch('http://www.mykebab.com/usuario/actualizarCarrito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/text',
            },
            body: JSON.stringify({ carrito: carrito })
            // Datos que se envían al servidor 
        })
        .then(response => response.json())  // Parsear la respuesta JSON
        .then(data => {
            // Mostrar el mensaje recibido desde el servidor
            console.log(data.message);  // Esto mostrará: 'Carrito actualizado correctamente'

            // Mostrar el carrito actualizado
            console.log(data.carrito); 
        })
        .catch(error => {
            console.error('Error al actualizar el carrito en el servidor:', error);
        });
    }

function cargarTablaKebab(){
    // obtenemos el contenedor para insertar los datos
    const tablaKebab = document.getElementById("tablaKebab");
    Promise.all([
        fetch('http://www.mykebab.com/pedido/tablakebab'),
        fetch('http://www.mykebab.com/pedido/kebabsCuenta')
    ])
    .then(([plantilla, informekebab]) => {
        // Procesar las respuestas de ambas peticiones
        return Promise.all([
            plantilla.text(),
            informekebab.json()
        ]);
    }).then(([plantilla, informekebab]) => {
        var contenedor = document.getElementById("tablaKebab");
        contenedor.innerHTML = "";
        var div = document.createElement("div");
        div.innerHTML = plantilla;
        const tbody = div.querySelector("#tbody");
        var total=0;
        informekebab.forEach(kebab => {
            total+=kebab.cantidad;
            var tr = document.createElement("tr");
            var id = document.createElement("td");
            id.innerHTML = ""+kebab.id;
            tr.appendChild(id);
            var nombre = document.createElement("td");
            nombre.innerHTML = ""+kebab.nombre;
            tr.appendChild(nombre);
            var foto = document.createElement("td");
            foto.innerHTML = `<img src="./imagenes/${kebab.foto}" alt="${kebab.nombre}" width="50" height="50">`;
            tr.appendChild(foto);
            var precio = document.createElement("td");
            precio.innerHTML = ""+kebab.precio;
            tr.appendChild(precio);
            var descripcion = document.createElement("td");
            descripcion.innerHTML = ""+kebab.descripcion;
            tr.appendChild(descripcion);
            var cantidad = document.createElement("td");
            cantidad.innerHTML = ""+kebab.cantidad;
            tr.appendChild(cantidad);
            tbody.appendChild(tr);
        });
        var vendidos = div.querySelector("#total");
        vendidos.innerHTML = ""+total;
        
        contenedor.appendChild(div);
    });
        

}