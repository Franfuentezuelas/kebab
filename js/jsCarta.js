window.addEventListener("load", function() {

    // Obtén el contenedor del carrito y el contador
    var carrito = document.getElementById("carrito");
    var contador = document.getElementById("contador");
    
    // Hacer la solicitud a la API para obtener los kebabs
    fetch("https://www.mykebab.com/aplicacion/kebabs")
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
                elementoCarta.classList.add("col-12", "col-sm-12", "col-md-6", "col-lg-4", "col-xl-3", "separacion");
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
                personalizar.kebab = kebab;
                const botonComprar = elementoCarta.querySelector('.botonComprar');

                // Añadimos los eventos a los botones
                personalizar.addEventListener('click', async function() {
                var kebab = elementoCarta.kebab;
                const seccion = document.getElementById("seccion");
                var editarkebab = document.getElementById("editarkebab");
                // comprobamos si el div editarkebab existe
                if (!editarkebab) {
                // ahora cargo la plantilla de personalizacion
                await fetch("https://www.mykebab.com/personalizar/plantilla")
                    .then(response => response.text())
                    .then(plantilla => {
                        const personalizar = plantilla;
                        // Añado la plantilla de personalizacion al html
                        var div = document.createElement("div");
                        div.id="editarkebab";
                        div.innerHTML = personalizar;
                        document.getElementById("carta").appendChild(div);
                        // oculto la seccion 
                        seccion.style.display = "none";
                    })
                    .then(function() {
                        const volver = document.getElementById("volver");
                        volver.addEventListener('click', function() {
                            var seccion = document.getElementById("seccion");
                            var editarkebab = document.getElementById("editarkebab");
                            // muestro la seccion quitando display none al restaurarlo
                            seccion.style.display = "";
                            // oculto el div editarkebab
                            editarkebab.style.display = "none";
                            
                            // limpiamos los ingredientes
                             var elementosIngredientes =Array.from(document.getElementById("ingredientes").children);
                                elementosIngredientes.forEach((elementoIngrediente, index) => {
                                    var per = document.getElementById("personalizar");
                                    // ahora cambio el precio del ingrediente
                                    console.log(elementoIngrediente.ingrediente.precio);
                                    console.log(elementoIngrediente.precioAnterior);
                                    if(elementoIngrediente.precioAnterior){
                                        elementoIngrediente.ingrediente.precio=elementoIngrediente.precioAnterior;
                                        elementoIngrediente.innerHTML = "";
                                        elementoIngrediente.innerHTML = elementoIngrediente.ingrediente.nombre+" "+elementoIngrediente.precioAnterior+"€";
                                    }
                                    // lo cambio al div personalizar
                                    per.appendChild(elementoIngrediente);
                                    
                                });

                        });
                        const comprar = document.getElementById("comprar");
                        comprar.addEventListener('click', function() {
                            var seccion = document.getElementById("seccion");
                            var editarkebab = document.getElementById("editarkebab");
                            // muestro la seccion quitando display none al restaurarlo
                            seccion.style.display = "";
                            // oculto el div editarkebab
                            editarkebab.style.display = "none";
                        // capturo el kebab con las modificaciones y lo creo
                        const guardado= document.getElementById("imagen").kebab;
                        // quiero copiar el kebab guardado a otro objeto y trabajar con el
                        // guardado porque si no lo copio el guardado se pierde
                        // y si lo copio el guardado se pierde el original
                        var kebab = JSON.parse(JSON.stringify(guardado));
                        // obtengo los ingredientes seleccionados
                        var seleccionados = Array.from(document.getElementById("ingredientes").children);

                        var eleccion = Array.from(document.getElementById("ingredientes").children);
                        var seleccionados=[];
                        eleccion.forEach(function(seleccionado){
                            seleccionados.push(seleccionado.ingrediente);
                        });


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
                        console.log(kebab.ingredientes.length);
                        console.log(seleccionados.length);
                        if (kebab.ingredientes.length == seleccionados.length) {
                            console.log(kebab.ingredientes);
                            console.log(seleccionados);
                            kebab.ingredientes=kebab.ingredientes.sort((a, b) => a.id-b.id);
                            seleccionados=seleccionados.sort((a, b) => a.id-b.id);
                            
                            for (let i = 0; i < kebab.ingredientes.length; i++) {

                                if (kebab.ingredientes[i].id != seleccionados[i].id) {
                                    if(mismoKebab){
                                        mismoKebab = false;
                                    }
                                }
                            }
                        }else{
                            mismoKebab = false;
                        }
                        

                        if (mismoKebab) {

                            // mandamos el kebab al carrito
                            // Obtén el contenedor del carrito y el contador
                            var carrito = document.getElementById("carrito");
                            var contador = document.getElementById("contador");
                            carrito.kebabs.push(guardado);

                            // Guardar el carrito actualizado en localStorage
                            localStorage.setItem("carrito", JSON.stringify(carrito.kebabs));

                            // Actualizar el contador
                            var contar = carrito.kebabs.length; // Número de kebabs en el carrito
                            contador.value = contar;  // Actualiza el valor si el contador es un input
                            contador.textContent = contar;  // Actualiza el texto si el contador es un span
                            console.log(carrito.kebabs);
                            
                            
                        // metes en el carro el kebab de la casa
                        // y cambias el carro agregando el nuevo kebab
                        // cambias el numero de kebab que tiene el carro
                        
                    }else{
                        console.log(kebab);
                        //solo metemos el kebab si almenos tiene un ingrediente
                        if(seleccionados.length>0){
                            kebab.kebab_id= kebab.id;
                            kebab.id= null;
                            kebab.nombre=kebab.nombre+" personalizado";
                            kebab.ingredientes="";
                            kebab.ingredientes=seleccionados;
                            console.log(kebab.ingredientes);
                            kebab.precio=precio.value;
                            console.log(kebab);
                            // mandamos el kebab al carrito
                            // Obtén el contenedor del carrito y el contador
                            var carrito = document.getElementById("carrito");
                            var contador = document.getElementById("contador");
                            console.log(carrito.kebabs);
                            carrito.kebabs.push(kebab);

                            // Guardar el carrito actualizado en localStorage
                            localStorage.setItem("carrito", JSON.stringify(carrito.kebabs));

                            // Actualizar el contador
                            var contar = carrito.kebabs.length; // Número de kebabs en el carrito
                            contador.value = contar;  // Actualiza el valor si el contador es un input
                            contador.textContent = contar;  // Actualiza el texto si el contador es un span
                            console.log(carrito.kebabs);
                            
                        }

            
                            // limpiamos los ingredientes
                             var elementosIngredientes =Array.from(document.getElementById("ingredientes").children);
                                elementosIngredientes.forEach((elementoIngrediente, index) => {
                                    var per = document.getElementById("personalizar");
                                    // ahora cambio el precio del ingrediente
                                    console.log(elementoIngrediente.ingrediente.precio);

                                    if(elementoIngrediente.precioAnterior){
                                        console.log(elementoIngrediente.precioAnterior);
                                        elementoIngrediente.ingrediente.precio=elementoIngrediente.precioAnterior;
                                        elementoIngrediente.innerHTML = "";
                                        elementoIngrediente.innerHTML = elementoIngrediente.ingrediente.nombre+" "+elementoIngrediente.precioAnterior+"€";
                                    }
                                    // lo cambio al div personalizar
                                    per.appendChild(elementoIngrediente);
                                    
                                });
                    

                            actualizar(carrito.kebabs);
                            
                            }
                        });
                    })
                    .then(async function() {
                        // Fetch para obtener los ingredientes desde el servidor
    await fetch("https://www.mykebab.com/aplicacion/ingredientes")
    .then(response => response.json())
    .then(ingredientes => {
        // Obtenemos el contenedor donde estarán los elementos del carrusel
        const personalizar = document.getElementById("personalizar"); // div personalizar  
        personalizar.todosIngredientes = ingredientes;
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
                const idIngrediente = event.dataTransfer.getData('text');  // Obtener el id del ingrediente
                const ingrediente = document.getElementById(idIngrediente);
                if (ingrediente.parentElement.id != "personalizado") {
                    personalizado.appendChild(ingrediente);
                    actualizarPrecioYAlergenos();
                    kebab.nuevoPrecio=precio.nuevoPrecio;
                }
            });

            // Evento para cuando se suelta un ingrediente sobre el contenedor "ingredientes"
            ingredientes.addEventListener('drop', function (event) {

                event.preventDefault();  // Prevenir el comportamiento por defecto
                const idIngrediente = event.dataTransfer.getData('text');  // Obtener el id del ingrediente
                const ingrediente = document.getElementById(idIngrediente);
                // Mover el ingrediente al contenedor de "ingredientes" si no está allí

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
                kebab.nuevoPrecio=precio.nuevoPrecio;
            });
            // Añadimos el item al carrusel
            personalizar.appendChild(elementoIngrediente);
    })
})
    .catch(error => console.error("Error fetching kebabs:", error)); // Manejo de errores

                    })

                }else{
                    // mostramos el div editarkebab
                    editarkebab.style.display = "block";
                    // oculto la seccion
                    seccion.style.display = "none";
                }                
              
                    // ahora tengo que incluir el kebab en la personalizacion y los ingredientes
                   
                    // comprobar si el kebab tiene los mismos ingredientes que hay seleccionados
                    // comprobar que el ingrediente no este repetido
                    // agregar el ingrediente al div personalizar
                    // agregar el ingrediente al div ingredientes
                  
        var kebab = this.kebab
                // Obtenemos el contenedor donde estarán los elementos del carrusel
        const imagen = document.getElementById("imagen");
        const descripcion = document.getElementById("descripcion");
        const precio = document.getElementById("precio");
        const ingredientes = document.getElementById("ingredientes");
        // Limpiamos el contenido existente
        //imagen.innerHTML = "";
        //descripcion.innerHTML = "";
        //precio.innerHTML = "";

        // Añadimos los atributos del kebab
        imagen.src = `./imagenes/${kebab.foto}`;
        imagen.kebab = kebab;
        descripcion.innerHTML = kebab.descripcion; 
        precio.innerHTML = kebab.precio+"€";
        precio.value = kebab.precio;

        // Recorremos cada kebab para cambiar sus ingrecientes
        console.log(kebab.ingredientes);
        kebab.ingredientes.forEach((ingrediente, index) => {
                // Creamos un div para cada item del carrusel
                var ingredienteCambio=document.getElementById("ingrediente"+ingrediente.id);
                console.log(ingredienteCambio);
                ingredienteCambio.precioAnterior=ingredienteCambio.ingrediente.precio;
                ingredienteCambio.ingrediente.precio=0;
                ingredienteCambio.innerHTML=ingrediente.nombre;
                document.getElementById("ingredientes").appendChild(ingredienteCambio);
            // Añadimos el item
            ingredientes.appendChild(ingredienteCambio);

        });
        actualizarPrecioYAlergenos();
        kebab.nuevoPrecio=precio.nuevoPrecio;
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

                    actualizar(carrito.kebabs);
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

    

}




function actualizar(carrito){
    const usuario = document.getElementById("user");
    console.log(usuario.innerText);

        fetch('https://www.mykebab.com/usuario/actualizarCarrito', {
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