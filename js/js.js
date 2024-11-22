window.addEventListener("load", function () {
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
    console.log(carrito.kebabs);

    // Actualiza el contador del carrito
    contador.textContent = carrito.kebabs.length;
    contador.value = carrito.kebabs.length;

    carrito.addEventListener("click", function () {
        
            // Crear un fondo translúcido que ocupe toda la pantalla
            const translucido = document.createElement("div");
            translucido.id = "translucido";
            translucido.style.position = "fixed";
            translucido.style.top = "0";
            translucido.style.left = "0";
            translucido.style.width = "100%";
            translucido.style.height = "100%";
            translucido.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Color negro translúcido
            translucido.style.zIndex = "9999"; // Asegurar que esté encima de todo
            translucido.style.display = "flex";
            translucido.style.justifyContent = "center";
            translucido.style.alignItems = "center";
        
            // Crear el div de confirmación
            const confirmationBox = document.createElement("div");
            confirmationBox.id = "confirmationBox";
            confirmationBox.style.backgroundColor = "#fff";
            confirmationBox.style.padding = "20px";
            confirmationBox.style.borderRadius = "8px";
            confirmationBox.style.textAlign = "center";
            confirmationBox.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        
            // Agregar el mensaje de confirmación
            const cesta = document.createElement("div");
            cesta.id = "cesta";
            const titulo = document.createElement("h2");
            titulo.textContent = "¡Tienes una cesta!";
            cesta.appendChild(titulo);
            confirmationBox.appendChild(cesta);

            //creo la tabla
            const tabla = document.createElement("table");
            tabla.style.width = "100%";   
            tabla.style.border = "1px solid #ccc";
            tabla.style.borderCollapse = "collapse";

            tabla.style.textAlign = "left";
            tabla.style.backgroundColor = "#f5f5f5";

            const tr = document.createElement("tr");
            tr.style.border = "1px solid #ccc";
            tr.style.borderCollapse = "collapse";
            tr.style.textAlign = "left";
            tr.style.backgroundColor = "#f5f5f5";

            const nombre = document.createElement("th");
            nombre.style.border = "1px solid #ccc";
            nombre.style.borderCollapse = "collapse";
            nombre.style.textAlign = "left";
            nombre.style.backgroundColor = "#f5f5f5";   
            nombre.textContent = "Kebab";
            const unidad = document.createElement("th");
            unidad.style.border = "1px solid #ccc";
            unidad.style.borderCollapse = "collapse";
            unidad.style.textAlign = "center";
            unidad.style.backgroundColor = "#f5f5f5";
            unidad.textContent = "Unidades";
            const precio = document.createElement("th");
            precio.style.border = "1px solid #ccc";
            precio.style.borderCollapse = "collapse";
            precio.style.textAlign = "center";
            precio.style.backgroundColor = "#f5f5f5";   
            precio.textContent = "Precio";
            const ingredientes = document.createElement("th");
            ingredientes.style.border = "1px solid #ccc";
            ingredientes.style.borderCollapse = "collapse";
            ingredientes.style.textAlign = "left";
            ingredientes.style.backgroundColor = "#f5f5f5";
            ingredientes.textContent = "Ingredientes";
            const preciototal = document.createElement("th");
            preciototal.style.border = "1px solid #ccc";
            preciototal.style.borderCollapse = "collapse";
            preciototal.style.textAlign = "center";
            preciototal.style.backgroundColor = "#f5f5f5";   
            preciototal.textContent = "PrecioTotal";
            const botones = document.createElement("th");
            botones.style.border = "1px solid #ccc";
            botones.style.borderCollapse = "collapse";
            botones.style.textAlign = "center";
            botones.style.backgroundColor = "#f5f5f5";   
           

            tr.appendChild(nombre);
            tr.appendChild(unidad);
            tr.appendChild(precio); 
            tr.appendChild(ingredientes);
            tr.appendChild(preciototal); 
            tr.appendChild(botones); 
            
            tabla.appendChild(tr);

            // inicio las variables entro de la tabla
            tabla.cantidad=0;
            tabla.preciototal=0;
            // ordeno los kebabs de local storage
            carrito.kebabs.sort(function (a, b) {
                return a-b;
            });
        
    let actual = null; // Inicializamos 'actual' como null
    let filaExistente = null; // Esta variable se usará para rastrear la fila existente

// ordeno los kebab para luego agruparlos por fila si son iguales
carrito.kebabs = carrito.kebabs.sort((a, b) => {
    // Primero se ordena por el id
    if (a.id !== b.id) return a.id - b.id;

    // Si los ids son iguales, se ordena por nombre
    if (a.nombre !== b.nombre) return a.nombre.localeCompare(b.nombre);

    // Si los nombres son iguales, se ordena por precio
    if (a.precio !== b.precio) return a.precio - b.precio;

    // Si los precios son iguales, se ordena por nuevoPrecio (si existe)
    const precioA = a.nuevoPrecio || a.precio; // Si no hay nuevoPrecio, usa el precio original
    const precioB = b.nuevoPrecio || b.precio;
    if (precioA !== precioB) return precioA - precioB;

    // Si los precios son iguales, se ordena por los ingredientes
    if (a.ingredientes.length !== b.ingredientes.length) return a.ingredientes.length - b.ingredientes.length;

    // Ordenar los ingredientes de cada kebab por su id
    for (let i = 0; i < a.ingredientes.length; i++) {
        if (a.ingredientes[i].id !== b.ingredientes[i].id) {
            return a.ingredientes[i].id - b.ingredientes[i].id;
        }
    }
    // Si todo es igual, no cambia el orden
    return 0;
});

console.log(carrito.kebabs);
// Recorremos los kebabs
carrito.kebabs.forEach(function (kebab) {
      
    if(actual == null || 
        actual.nombre !== kebab.nombre || 
        actual.precio !== kebab.precio || 
        (kebab.nuevoPrecio && actual.nuevoPrecio !== kebab.nuevoPrecio) || 
        !compararIngredientes(actual.ingredientes, kebab.ingredientes)){
        // Si es el primer kebab o es diferente al anterior, creamos una nueva fila

        // Guardamos el kebab actual en la variable 'actual'
        actual = kebab;
        
        // Creamos una nueva fila
        tabla.cantidad += 1;
        let precioUnitario = (kebab.id == null) ? kebab.nuevoPrecio : kebab.precio;
        tabla.preciototal += precioUnitario;

        const tr = document.createElement("tr");
        tr.style.border = "1px solid #ccc";
        tr.style.borderCollapse = "collapse";
        tr.style.textAlign = "left";
        tr.style.backgroundColor = "#f5f5f5";
        tr.kebab = kebab;

        const nombre = document.createElement("td");
        nombre.style.border = "1px solid #ccc";
        nombre.style.borderCollapse = "collapse";
        nombre.style.textAlign = "left";
        nombre.style.backgroundColor = "#f5f5f5";
        nombre.textContent = kebab.nombre;
        nombre.kebab = kebab;

        const unidad = document.createElement("td");
        // Aplicamos flexbox a la celda
        unidad.style.display = "flex";  // Activamos flexbox en el <td>
        unidad.style.justifyContent = "center";  // Centra los elementos horizontalmente
        unidad.style.alignItems = "center";  // Centra los elementos verticalmente
        unidad.style.flexDirection = "row";
        unidad.style.border ="Collapse";  // Asegura que los elementos se dispongan en fila (por defecto)

        const numero= document.createElement("div");
        numero.classList.add("unidades");
        
        numero.style.borderCollapse = "collapse";
        numero.style.textAlign = "center";
        numero.style.backgroundColor = "#f5f5f5";
        numero.textContent = 1;
        unidad.cantidad = 1;
        const mas= document.createElement("div");
        mas.style.borderCollapse = "collapse";
        mas.textContent = "+";
        mas.style.marginLeft = "1em";
        numero.kebab=kebab;
       
        const menos= document.createElement("div");
        menos.style.borderCollapse = "collapse";
        menos.textContent = "-";
        menos.style.marginRight = "1em";

        // creados los botones para aumentar y disminuir la cantidad de unidades

        menos.addEventListener("click", function() {
            eliminarKebab(this.parentElement.parentElement.kebab);
            let carrito = document.getElementById("carrito");

                actualizarContador(carrito);
                            // Guardamos el carrito actualizado en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito.kebabs));
                actualizarCarritoServidor(carrito);

                let cantidad = this.parentElement.getElementsByTagName("div")[1];
                console.log(cantidad.textContent);
                var resta=parseInt(cantidad.textContent)-1;
                cantidad.innerHTML="";
                cantidad.innerHTML=resta;
                cantidad.cantidad=resta;
                const tr = this.parentElement.parentElement
                let preciounidad = tr.getElementsByTagName("td")[2].precio;
                preciounidad=preciounidad;
                console.log(preciounidad);
                let actualizarpreciototal = tr.getElementsByTagName("td")[4];
                actualizarpreciototal.innerHTML = "";
                actualizarpreciototal.innerHTML = (resta*preciounidad).toFixed(2)+"€";

                let totalkebabs = document.getElementById("totalkebabs");
                totalkebabs.innerHTML = "";
                totalkebabs.total= totalkebabs.total-1;
                totalkebabs.innerHTML = totalkebabs.total;
                let ajusteprecio=document.getElementById("totalpreciototal");
                ajusteprecio.innerHTML="";
                ajusteprecio.total=ajusteprecio.total-preciounidad;
                ajusteprecio.innerHTML=ajusteprecio.total.toFixed(2)+"€";
            // si llega a 0 se elimina la fila que contiene el elemento
            if (cantidad.cantidad === 0) {
                 // Encuentra el <tr> correspondiente
                console.log(tr);
                if (tr) {
                    tr.remove(); // Elimina la fila completa de la tabla
                }
            }

        });
        mas.addEventListener("click", function() {
            agregarKebab(this.parentElement.parentElement.kebab);

            let carrito = document.getElementById("carrito");
        
            let cantidad = this.parentElement.getElementsByTagName("div")[1];
            console.log(cantidad.textContent);
            var suma=parseInt(cantidad.textContent)+1;
            cantidad.innerHTML="";
            cantidad.innerHTML=suma;
            cantidad.cantidad=suma;

            const tr = this.parentElement.parentElement
            let preciounidad = tr.getElementsByTagName("td")[2].precio;
            preciounidad=preciounidad;
            console.log(preciounidad);
            let actualizarpreciototal = tr.getElementsByTagName("td")[4];
            actualizarpreciototal.innerHTML = "";
            actualizarpreciototal.innerHTML = (suma*preciounidad).toFixed(2)+"€";
                actualizarContador(carrito);           
                 // Guardamos el carrito actualizado en localStorage
                localStorage.setItem("carrito", JSON.stringify(carrito.kebabs));
                actualizarCarritoServidor(carrito);
  
            let totalkebabs = document.getElementById("totalkebabs");
            totalkebabs.innerHTML = "";
            totalkebabs.total= totalkebabs.total+1;
            totalkebabs.innerHTML = totalkebabs.total;
            let ajusteprecio=document.getElementById("totalpreciototal");
            ajusteprecio.innerHTML="";
            ajusteprecio.total=ajusteprecio.total+preciounidad;
            ajusteprecio.innerHTML=ajusteprecio.total.toFixed(2)+"€";

            
        });
        

        unidad.appendChild(menos);
        unidad.appendChild(numero);
        unidad.appendChild(mas);
        

        const precio = document.createElement("td");
        precio.style.border = "1px solid #ccc";
        precio.style.borderCollapse = "collapse";
        precio.style.textAlign = "right";
        precio.style.backgroundColor = "#f5f5f5";
        precio.textContent = (precioUnitario).toFixed(2) + "€";
        precio.precio = precioUnitario;

        const ingredientes = document.createElement("td");
        ingredientes.style.border = "1px solid #ccc";
        ingredientes.style.borderCollapse = "collapse";
        ingredientes.style.textAlign = "left";
        ingredientes.style.backgroundColor = "#f5f5f5";
        ingredientes.textContent = kebab.descripcion;

        const preciototal = document.createElement("td");
        preciototal.style.border = "1px solid #ccc";
        preciototal.style.borderCollapse = "collapse";
        preciototal.style.textAlign = "right";
        preciototal.style.backgroundColor = "#f5f5f5";
        preciototal.textContent = (unidad.cantidad*precioUnitario).toFixed(2) + "€";
        

        const botones = document.createElement("td");
        botones.style.border = "1px solid #ccc";
        botones.style.borderCollapse = "collapse";
        botones.style.display = "flex"; // Corregido: display en lugar de dysplay
        botones.style.justifyContent = "center"; // Centra los botones horizontalmente
        botones.style.alignItems = "center"; // Centra los botones verticalmente
        botones.style.textAlign = "center";
        botones.style.backgroundColor = "#f5f5f5";

        
        const eliminar = document.createElement("input");
        eliminar.type = "button";
        eliminar.value = "Eliminar";
        eliminar.style.margin = "2px";
        
        const modificar = document.createElement("input");
        modificar.type = "button";
        modificar.value = "Modificar";
        modificar.style.margin = "2px";
        
        // Añadir los botones al contenedor
        botones.appendChild(eliminar);
        botones.appendChild(modificar);
        
        // eventos de los botones
        eliminar.addEventListener("click", function() {
            alert("Esta seguro que quiere eliminar este kebab?");
        });
        modificar.addEventListener("click", function() {
            alert("Esta seguro que quiere modificar este kebab?");
        });
        
    

        tr.appendChild(nombre);
        tr.appendChild(unidad);
        tr.appendChild(precio);
        tr.appendChild(ingredientes);
        tr.appendChild(preciototal);
        tr.appendChild(botones);

        tabla.appendChild(tr);
        
    } else {
        // Si el kebab es igual al actual, actualizamos la fila existente

        // Buscamos la fila existente para actualizarla
        var carro = tabla.querySelectorAll('tr');
        var ultimaFila = carro[carro.length - 1];  
        tabla.cantidad += 1;

        // Si encontramos la fila existente, actualizamos las unidades y el precio total
        if (ultimaFila) {
            let precioUnitario = kebab.nuevoPrecio || kebab.precio;
            tabla.preciototal += precioUnitario;
            const tds = ultimaFila.getElementsByTagName("td");
            const nombre = tds[0];
            const unidad = tds[1];
            const precio = tds[2];
            const ingredientes = tds[3];
            const preciototal = tds[4];
            
            // Aumentamos las unidades y el precio total
            unidad.cantidad  += 1;
            preciototal.precio = (unidad.cantidad*precio.precio).toFixed(2) + "€";

            console.log("mas de un elemento");
            // actualizamos las unidades y el precio total en la fila existente
            var numero = unidad.getElementsByTagName("div")[1];
            numero.innerHTML="";
            numero.innerHTML=unidad.cantidad;

            preciototal.innerHTML = "";
            preciototal.innerHTML = preciototal.precio;

            
        }
    }
});

            // ahora agrego una fila con el total de la lista
            const total = document.createElement("tr");
            total.style.border = "1px solid #ccc";
            total.style.borderCollapse = "collapse";
            total.style.textAlign = "center";
            total.style.backgroundColor = "#f5f5f5";

            const totalPrecio = document.createElement("td");
            totalPrecio.style.border = "1px solid #ccc";
            totalPrecio.style.borderCollapse = "collapse";
            totalPrecio.style.textAlign = "center";
            totalPrecio.style.backgroundColor = "#f5f5f5";
            totalPrecio.textContent = "Precio Total";
            totalPrecio.total=0;

            const totalUnidades = document.createElement("td");
            totalUnidades.classList.add("totalunidades");
            totalUnidades.style.border = "1px solid #ccc";
            totalUnidades.style.borderCollapse = "collapse";
            totalUnidades.style.textAlign = "center";
            totalUnidades.style.backgroundColor = "#f5f5f5";
            totalUnidades.textContent = "Total Unidades";
            totalUnidades.total=0;
            
            const vacio = document.createElement("td");
            vacio.style.border = "1px solid #ccc";
            vacio.style.borderCollapse = "collapse";
            vacio.style.textAlign = "center";
            vacio.style.backgroundColor = "#f5f5f5";
            vacio.textContent = "";
            

            const totalKebabs = document.createElement("td");
            totalKebabs.id="totalkebabs";
            totalKebabs.style.border = "1px solid #ccc";
            totalKebabs.style.borderCollapse = "collapse";
            totalKebabs.style.textAlign = "center";
            totalKebabs.style.backgroundColor = "#f5f5f5";
            // incluimos el total de unidades guardado en la tabla
            totalKebabs.textContent = tabla.cantidad;
            totalKebabs.total=tabla.cantidad;

            const totalPrecioTotal = document.createElement("td");
            totalPrecioTotal.id="totalpreciototal";
            totalPrecioTotal.style.border = "1px solid #ccc";
            totalPrecioTotal.style.borderCollapse = "collapse";
            totalPrecioTotal.style.textAlign = "center";
            totalPrecioTotal.style.backgroundColor = "#f5f5f5";
            // incluimos el precio total guardado en la tabla
            totalPrecioTotal.textContent = tabla.preciototal.toFixed(2)+" €";
            totalPrecioTotal.total=tabla.preciototal;

            const vacio2 = document.createElement("td");
            vacio2.style.border = "1px solid #ccc";
            vacio2.style.borderCollapse = "collapse";
            vacio2.style.textAlign = "center";
            vacio2.style.backgroundColor = "#f5f5f5";
            vacio2.textContent = "";

            total.appendChild(totalUnidades);
            total.appendChild(totalKebabs);
            total.appendChild(vacio);
            total.appendChild(totalPrecio);
            total.appendChild(totalPrecioTotal);
            tabla.appendChild(total);
            total.appendChild(vacio2); 
            cesta.appendChild(tabla);
        
            // Crear botón de "Cancelar"
            const cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancelar";
            cancelButton.style.margin = "10px";
            cancelButton.style.padding = "10px 20px";
            cancelButton.style.backgroundColor = "#f5f5f5";
            cancelButton.style.border = "1px solid #ccc";
            cancelButton.style.borderRadius = "4px";
            cancelButton.style.cursor = "pointer";
            cancelButton.addEventListener("click", function () {
                // Quitar el translucido al cancelar
                document.body.removeChild(translucido);
            });
            confirmationBox.appendChild(cancelButton);
        
            // Crear botón de "realizar compra"
            const comparBoton = document.createElement("button");
            comparBoton.textContent = "Realizar compra";
            comparBoton.style.margin = "10px";
            comparBoton.style.padding = "10px 20px";
            comparBoton.style.backgroundColor = "#ff4d4d";
            comparBoton.style.color = "#fff";
            comparBoton.style.border = "none";
            comparBoton.style.borderRadius = "4px";
            comparBoton.style.cursor = "pointer";

            // Evento de click para el botón de "realizar compra"
            comparBoton.addEventListener("click", function () {

                // Tengo que decirle al servidor que quiero realizar la compra
                // y que el carrito queda vacío

                fetch('http://www.mykebab.com/realizarcompra')
                    .then(response => response.text())
                    .then(data => {
                        
                        console.log(data);
                
                            // Mostrar mensaje de compra
                            const message = document.createElement("p");
                            message.textContent = "¡Compra realizada con éxito!";
                            confirmationBox.appendChild(message);
                
                            // Estilizar el mensaje
                            message.style.margin = "10px";
                            message.style.padding = "10px 20px";
                            message.style.backgroundColor = "#4CAF50";
                            message.style.color = "#fff";
                            message.style.border = "none";
                            message.style.borderRadius = "4px";
                            message.style.cursor = "pointer";
                            message.style.zIndex = "2000";
                
                            // Mostrar el mensaje de compra
                            console.log("Esperando...");
                            // borro el carrito
                            localStorage.removeItem("carrito");
                            // actualizo el servidor con el carrito vacio
                            actualizarCarritoServidor(carrito);
                            // actualizo el contador del carrito
                            actualizarContador(carrito);
                
                            // Pausar durante 3 segundos (3000 milisegundos) antes de continuar
                            setTimeout(function() {
                                // Aquí el código continúa después de la pausa
                                console.log("¡Tiempo terminado!");
                                carrito.kebabs = [];
                                // borro el carrito
                                localStorage.removeItem("carrito");
                                // Quitar el translucido al tramitar la compra
                                document.body.removeChild(translucido);
                                // actualizo el servidor con el carrito vacio
                                actualizarCarritoServidor(carrito);
                                // actualizo el contador del carrito
                                actualizarContador(carrito);

                            }, 2000); // 3000 milisegundos = 3 segundos

                        
                    })
                    .catch(error => {
                        console.error("Error en la solicitud:", error);
                    });
                


                // // Borrar el carrito del local storage
                // localStorage.removeItem("carrito");
        
                // // Redirigir al logout
                // location.href = "carta";
            });
            confirmationBox.appendChild(comparBoton);
        
            // Agregar el confirmationBox al translucido
            translucido.appendChild(confirmationBox);
        
            // Agregar el translucido al body
            document.body.appendChild(translucido);

    });


    // Función para cambiar el icono de usuario
    function cambiarIconoUsuario(seed) {
        const userDiv = document.getElementById('user');
        const nuevaImagen = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`;
        userDiv.style.backgroundImage = `url('${nuevaImagen}')`;
    }

    // API para pedir el nombre del usuario
    async function cargarusuario() {
        await fetch('http://www.mykebab.com/usuario/nombre')
            .then(response => response.text())
            .then(usuario => {
                console.log(usuario);
                if (usuario == "") {
                    cambiarIconoUsuario('');
                    const login = document.getElementById("sesion");
                    login.style.display = "";
                    const user = document.getElementById("user");
                    user.innerHTML = "";
                } else {
                    cambiarIconoUsuario(usuario);
                    const login = document.getElementById("sesion");
                    var user = document.createElement("a");
                    user.id = "user";
                    user.innerHTML = usuario;

                    // Configurar estilos del enlace contenedor
                    user.style.position = "relative"; // Establecer el contexto para el posicionamiento absoluto

                    // Crear el div con Logout y Editar
                    const emergente = document.createElement("div");
                    emergente.id = "userOptions";
                    emergente.style.display = "none"; // Ocultarlo inicialmente
                    emergente.style.position = "absolute";
                    emergente.style.top = "100%"; // Colocarlo justo debajo del enlace
                    emergente.style.right = "0"; // Alinear al borde derecho del contenedor
                    emergente.style.backgroundColor = "#fff";
                    emergente.style.border = "1px solid #ccc";
                    emergente.style.padding = "10px";
                    emergente.style.zIndex = "1000";
                    emergente.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

                    // Agregar los enlaces al emergente
                    const logoutboton = document.createElement("a");
                    logoutboton.href = "logout";
                    logoutboton.style.width = "100%";
                    logoutboton.innerText = "Logout";
                    logoutboton.style.color = "#000";
                    logoutboton.style.display = "block";
                    logoutboton.style.marginBottom = "5px"; // Separar visualmente los enlaces
                    


                    logoutboton.addEventListener("click", function (e) {
                        e.preventDefault(); // Evitar que se ejecute el enlace
                    
                        // Crear un fondo translúcido que ocupe toda la pantalla
                        const translucido = document.createElement("div");
                        translucido.id = "translucido";
                        translucido.style.position = "fixed";
                        translucido.style.top = "0";
                        translucido.style.left = "0";
                        translucido.style.width = "100%";
                        translucido.style.height = "100%";
                        translucido.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Color negro translúcido
                        translucido.style.zIndex = "9999"; // Asegurar que esté encima de todo
                        translucido.style.display = "flex";
                        translucido.style.justifyContent = "center";
                        translucido.style.alignItems = "center";
                    
                        // Crear el div de confirmación
                        const confirmationBox = document.createElement("div");
                        confirmationBox.id = "confirmationBox";
                        confirmationBox.style.backgroundColor = "#fff";
                        confirmationBox.style.padding = "20px";
                        confirmationBox.style.borderRadius = "8px";
                        confirmationBox.style.textAlign = "center";
                        confirmationBox.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
                    
                        // Agregar el mensaje de confirmación
                        const message = document.createElement("p");
                        message.textContent = "¿Seguro que quiere cerrar sesión?";
                        confirmationBox.appendChild(message);
                    
                        // Crear botón de "Cancelar"
                        const cancelButton = document.createElement("button");
                        cancelButton.textContent = "Cancelar";
                        cancelButton.style.margin = "10px";
                        cancelButton.style.padding = "10px 20px";
                        cancelButton.style.backgroundColor = "#f5f5f5";
                        cancelButton.style.border = "1px solid #ccc";
                        cancelButton.style.borderRadius = "4px";
                        cancelButton.style.cursor = "pointer";
                        cancelButton.addEventListener("click", function () {
                            // Quitar el translucido al cancelar
                            document.body.removeChild(translucido);
                        });
                        confirmationBox.appendChild(cancelButton);
                    
                        // Crear botón de "Cerrar Sesión"
                        const logoutButton = document.createElement("button");
                        logoutButton.textContent = "Cerrar Sesión";
                        logoutButton.style.margin = "10px";
                        logoutButton.style.padding = "10px 20px";
                        logoutButton.style.backgroundColor = "#ff4d4d";
                        logoutButton.style.color = "#fff";
                        logoutButton.style.border = "none";
                        logoutButton.style.borderRadius = "4px";
                        logoutButton.style.cursor = "pointer";
                        logoutButton.addEventListener("click", function () {
                            // Borrar el carrito del local storage
                            localStorage.removeItem("carrito");
                           fetch('http://www.mykebab.com/usuario/logout')
                            .then(response => response.text())
                            .then(data => {
                                console.log(data);                                
                            })
                            .catch(error => {
                                console.error("Error al actualizar el carrito:", error);
                            });
                          
                                location.href = "carta";
                        

                        });
                        confirmationBox.appendChild(logoutButton);
                    
                        // Agregar el confirmationBox al translucido
                        translucido.appendChild(confirmationBox);
                    
                        // Agregar el translucido al body
                        document.body.appendChild(translucido);
                    });
                    

                    const editarboton = document.createElement("a");
                    editarboton.href = "#";
                    editarboton.innerText = "Editar";
                    editarboton.style.width = "100%";
                    editarboton.style.color = "#000";
                    editarboton.style.display = "block";

                    // agrego los enlaces de logout y edit
                    emergente.appendChild(editarboton);
                    emergente.appendChild(logoutboton);
                    // Insertar el emergente dentro del enlace user
                    user.appendChild(emergente);

                    // Mostrar/ocultar el emergente al hacer clic en user
                    user.addEventListener("click", function (e) {
                        e.stopPropagation(); // Evitar que se propague el evento
                        emergente.style.display = emergente.style.display === "none" ? "block" : "none";
                    });

                    // Ocultar el emergente al hacer clic en cualquier otra parte de la página
                    document.addEventListener("click", function () {
                        emergente.style.display = "none";
                    });

                    login.parentElement.appendChild(user);
                    login.style.display = "none";

                    // Actualizar carrito al cargar la página

                    actualizarCarrito(carrito);
                }
        
            })
            .catch(error => console.error("Error fetching usuario:", error)); // Manejo de errores
    }

    cargarusuario(); // Llamar a cargarusuario cuando la página carga

    // cambiar el nombre de usuario
    //cambiarIconoUsuario('');
    // cambiar login por el nombre de usuario
    // y habilibar el evento click para logout en el nombre del usuario y para mantenimiento
    // sera un div emergente, si pulsas mantenimiento se abrira un div en toda la pantalla para 
    // mantener los datos del usuario
  });


// Función para enviar y actualizar el carrito
async function actualizarCarrito(carro) {
    let carrito = carro;  // Recibimos el carrito como parámetro
    let usuario = document.getElementById("user");
   
    try {
        // Pido el carrito del servidor
        const response = await fetch('http://www.mykebab.com/usuario/carrito');
        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error("El carrito recibido del servidor no es un array válido.");
            return;
        }

        // Crear el modal de fondo
        const modal = document.createElement("div");
        modal.id = "translucido";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Color negro translúcido
        modal.style.zIndex = "9999"; // Asegurar que esté encima de todo
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";

        // Crear el contenedor para el mensaje y los botones
        const modalContent = document.createElement("div");
        modalContent.style.backgroundColor = "#fff";
        modalContent.style.padding = "20px";
        modalContent.style.borderRadius = "10px";
        modalContent.style.textAlign = "center";
        modalContent.style.maxWidth = "400px";
        modalContent.style.width = "100%";

        // Crear el mensaje
        const message = document.createElement("p");
        message.textContent = "¡Tienes un carrito ya almacenado!";
        message.style.fontSize = "16px";
        message.style.marginBottom = "20px";

        // Crear los botones
        const btnGuardar = document.createElement("button");
        btnGuardar.textContent = "Utilizar Guardado";
        btnGuardar.style.margin = "10px";
        btnGuardar.style.padding = "10px 20px";
        btnGuardar.style.backgroundColor = "#4CAF50";
        btnGuardar.style.color = "#fff";
        btnGuardar.style.border = "none";
        btnGuardar.style.borderRadius = "5px";
        btnGuardar.style.cursor = "pointer";

        const btnUtilizarActual = document.createElement("button");
        btnUtilizarActual.textContent = "Utilizar Actual";
        btnUtilizarActual.style.margin = "10px";
        btnUtilizarActual.style.padding = "10px 20px";
        btnUtilizarActual.style.backgroundColor = "#2196F3";
        btnUtilizarActual.style.color = "#fff";
        btnUtilizarActual.style.border = "none";
        btnUtilizarActual.style.borderRadius = "5px";
        btnUtilizarActual.style.cursor = "pointer";

        const btnSumarCarritos = document.createElement("button");
        btnSumarCarritos.textContent = "Sumar los dos Carritos";
        btnSumarCarritos.style.margin = "10px";
        btnSumarCarritos.style.padding = "10px 20px";
        btnSumarCarritos.style.backgroundColor = "#FF9800";
        btnSumarCarritos.style.color = "#fff";
        btnSumarCarritos.style.border = "none";
        btnSumarCarritos.style.borderRadius = "5px";
        btnSumarCarritos.style.cursor = "pointer";

        // Añadir el mensaje y los botones al contenido del modal
        modalContent.appendChild(message);
        modalContent.appendChild(btnGuardar);
        modalContent.appendChild(btnUtilizarActual);
        modalContent.appendChild(btnSumarCarritos);

        // Añadir el contenido del modal al modal de fondo
        modal.appendChild(modalContent);

        // Añadir el modal al body
        document.body.appendChild(modal);

        // Funcionalidad de los botones
        btnGuardar.addEventListener("click", () => {
            console.log("Utilizando carrito guardado");
            // Reemplazamos el carrito local por el del servidor (eliminamos los kebabs actuales)
            localStorage.removeItem("carrito");

            // Actualizamos el carrito con el del servidor
            data.forEach(kebab => {
                if (Object.keys(kebab).length > 0 && kebab.nombre !== "") {
                    carrito.kebabs.push(kebab);
                }
            });

            // Actualizamos el contador del carrito
            actualizarContador(carrito);
            actualizarCarritoServidor(carrito);

            // Guardamos el carrito actualizado en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            // Cerramos el modal
            document.body.removeChild(modal);
        });

        btnUtilizarActual.addEventListener("click", () => {
            console.log("Utilizando carrito actual");
            // Cerramos el modal sin hacer cambios
            document.body.removeChild(modal);
                   // Enviar el carrito actualizado al servidor
        actualizarCarritoServidor(carrito);
        actualizarContador(carrito);
        });

        btnSumarCarritos.addEventListener("click", () => {
            console.log("Sumando los carritos");
            // Sumamos los carritos (servidor + local)
            data.forEach(kebab => {
                if (Object.keys(kebab).length > 0 && kebab.nombre !== "") {
                    carrito.kebabs.push(kebab);
                }
                       // Enviar el carrito actualizado al servidor
            actualizarCarritoServidor(carrito);
            actualizarContador(carrito);
            });


            // Cerramos el modal
            document.body.removeChild(modal);
        });

 

    } catch (error) {
        console.error('Error al obtener o actualizar el carrito:', error);
    }
}

// Función para actualizar el contador del carrito en la UI
function actualizarContador(carrito) {
    const contador = document.getElementById("contador");
    contador.textContent = carrito.kebabs.length;  // Ahora reflejamos la longitud total del carrito
    contador.value = carrito.kebabs.length;
    console.log("Carrito actualizado y contador ajustado.");

}

// Función para enviar el carrito actualizado al servidor
async function actualizarCarritoServidor(carrito) {
    try {
        const response = await fetch('http://www.mykebab.com/usuario/actualizarCarrito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ carrito: carrito.kebabs }) // Datos que se envían al servidor
        });

        const data = await response.json();
        console.log(data.message); // Esto mostrará el mensaje de éxito, si lo hay
        console.log(data.carrito);  // Mostramos el carrito actualizado
    } catch (error) {
        console.error('Error al actualizar el carrito en el servidor:', error);
    }
}


// Función para comparar ingredientes de dos kebabs
function compararIngredientes(ingredientesA, ingredientesB) {
    if (ingredientesA.length !== ingredientesB.length) return false;
    
    // Comparamos los ingredientes por el 'id' de cada uno
    for (let i = 0; i < ingredientesA.length; i++) {
        if (ingredientesA[i].id !== ingredientesB[i].id) return false;
    }

    return true;
}

function eliminarKebab(kebab) {
    var carrito=document.getElementById("carrito");
    console.log(carrito.kebabs);
    // Encuentra el índice del kebab en el array
    const index = carrito.kebabs.findIndex(k => 
        k.nombre === kebab.nombre &&
        k.precio === kebab.precio &&
        JSON.stringify(k.ingredientes) === JSON.stringify(kebab.ingredientes)
    );
    
    // Si existe en el array, lo elimina
    if (index !== -1) {
        carrito.kebabs.splice(index, 1);
        //actualizarTabla(); // Actualiza la tabla para reflejar los cambios
    } else {
        console.log("El kebab no se encontró en el carrito.");
    }
    console.log(carrito.kebabs);


}

function agregarKebab(kebab) {
    
    var carrito=document.getElementById("carrito");
    console.log(carrito.kebabs);
    carrito.kebabs.push(kebab);
    console.log(carrito.kebabs);

}

