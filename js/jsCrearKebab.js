window.addEventListener("load", function() {
    cargarTablaKebab();
    // incluir el evento de pulsar comprar
    const precioEmpresa= document.getElementById("precioEmpresa");
    precioEmpresa.addEventListener('input', function(event) {
        // Definir la expresión regular para aceptar los patrones válidos
        const regex = /^[0-9]{0,2}([,.]{1}[0-9]{0,2})?$/;
    
        // Si el valor no cumple con el patrón, lo elimina
        if (!regex.test(event.target.value)) {
            event.target.value = event.target.value.slice(0, -1);
        }
    });
    
    document.querySelector('img').addEventListener('click', function() {
        // Abro una nueva ventana para capturar la imagen y guardarla
        const nuevaVentana = window.open(
            'https://www.mykebab.com/foto', 
            '_blank',
            'width=790,height=875,scrollbars=yes'
        );
        
        if (!nuevaVentana) {
            alert('La ventana no se pudo abrir. Verifica que no esté bloqueada por el navegador.');
            return;
        }
    
        // Escucha los mensajes de la nueva ventana
        window.addEventListener("message", (event) => {
            // Procesa directamente el contenido del mensaje
            const imagenBase64 = event.data;
            console.log("Imagen recibida:", imagenBase64);
        
            // Por ejemplo, establecer la imagen como src de un elemento en la ventana principal
            const imgElement = document.querySelector('img');
            if (imgElement) {
                imgElement.src = imagenBase64;
            }
        });
        
    });
    

    
    const guardar = document.getElementById("guardar");
    guardar .addEventListener('click', function() {
        const error=document.getElementById("errores");
        error.innerHTML="";
        capturarKebab();
        // obtengo el kebab con los ingredientes seleccionados
        // tengo que cojer el kebab 
    });

    //Hacer la solicitud a la API para obtener el kebab
    fetch("https://www.mykebab.com/aplicacion/gusto") //https://cors-anywhere.herokuapp.com/http://www.mykebab.com/aplicacion/kebabs
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
        imagen.src = `./imagenes/foto.png`;
        imagen.kebab = kebab;
        
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
    fetch("https://www.mykebab.com/aplicacion/ingredientes")
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

function cargarTablaKebab(){
    // obtenemos el contenedor para insertar los datos
    const tablaKebab = document.getElementById("tablaKebab");
    Promise.all([
        fetch('https://www.mykebab.com/pedido/tablakebab'),
        fetch('https://www.mykebab.com/pedido/kebabsCuenta')
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

function capturarKebab() {

    const imagen=document.getElementById("imagen");
    const nombre=document.getElementById("nombre");
    const descripcion=document.getElementById("descripcion");
    const precio=document.getElementById("precioEmpresa");
    const seleccionados=Array.from(document.getElementById("ingredientes").children);
    var ingredientes=[];
    seleccionados.forEach(function(elemento){
        ingredientes.push(elemento.ingrediente);
    });
    
    console.log(precio.value);
    console.log(ingredientes);
    // modificamos el kebab base que tenemos con los parametros nuevos
    imagen.kebab.id=null;
    imagen.kebab.foto=nombre.value+"."+obtenerExtensionBase64(imagen.src);
    imagen.kebab.imagen=imagen.src;
    imagen.kebab.nombre=nombre.value;
    imagen.kebab.descripcion=descripcion.value;
    imagen.kebab.precio=precio.value;
    imagen.kebab.ingredientes=ingredientes;
    console.log(imagen.kebab);
    // validamos el kebab
    let errores=validarKebab(imagen.kebab);
    console.log(errores);
    console.log(errores.length);
    if(errores.length===0){
    // enviar el kebab a la api
    fetch('https://www.mykebab.com/mantenimiento/kebab', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(imagen.kebab)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data["message"]=="guardado correctamente"){
            alert("Kebab guardado correctamente");
            // recargamos la pagina
            location.reload();
        }else{
            alert(data["message"]);
        }
    })
    .catch(error => {
        console.error("Error al guardar el kebab:", error);
    });
    }else{
        alert("No se pudo guardar el kebab"); 
        const error=document.getElementById("errores");
        error.innerHTML="";
        error.innerHTML=errores;
    }
}

function validarKebab(kebab) {
    let errores = [];

    // Validar que ID sea null
    if (kebab.id !== null) {
        errores.push("El ID debe ser null.");
    }

    // Validar que nombre no esté vacío
    if (!kebab.nombre || kebab.nombre.trim() === "") {

        errores.push("El nombre no puede estar vacío.");
    }

    // Validar que foto no esté vacía
    if (!kebab.foto || kebab.foto.trim() === "") {
        errores.push("La foto no puede estar vacía.");
    }

    // Validar que descripción no esté vacía
    if (!kebab.descripcion || kebab.descripcion.trim() === "") {
        errores.push("La descripción no puede estar vacía.");
    }

    // Validar que precio sea un número válido y no esté vacío
    if (!kebab.precio || isNaN(parseFloat(kebab.precio))) {
        errores.push("El precio debe ser un número válido y no puede estar vacío.");
    }

    // Validar que ingredientes no esté vacío
    if (!kebab.ingredientes || kebab.ingredientes.length === 0) {
        errores.push("Debe haber al menos un ingrediente.");
    }

    // Validar que la imagen no tenga el src por defecto
    console.log(kebab.imagen);
    if (kebab.imagen === "https://www.mykebab.com/imagenes/foto.png") {
        errores.push("Debe seleccionar una imagen válida.");
    }

    return errores;
}


function obtenerExtensionBase64(base64String) {
    // Divide la cadena en dos partes usando la coma como separador
    const partes = base64String.split(",");
    if (partes.length > 1) {
        // Extrae el tipo MIME de la primera parte (data:image/<tipo>;base64)
        const mimeType = partes[0].match(/data:image\/([a-zA-Z0-9]+);base64/);
        if (mimeType && mimeType[1]) {
            // Devuelve la extensión basada en el tipo MIME
            return mimeType[1];
        }
    }
    return null; // Devuelve null si no se encuentra un tipo MIME válido
}