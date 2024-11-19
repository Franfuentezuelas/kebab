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

    // Actualiza el contador del carrito
    contador.textContent = carrito.kebabs.length;
    contador.value = carrito.kebabs.length;

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
                    const dropdown = document.createElement("div");
                    dropdown.id = "userOptions";
                    dropdown.style.display = "none"; // Ocultarlo inicialmente
                    dropdown.style.position = "absolute";
                    dropdown.style.top = "100%"; // Colocarlo justo debajo del enlace
                    dropdown.style.right = "0"; // Alinear al borde derecho del contenedor
                    dropdown.style.backgroundColor = "#fff";
                    dropdown.style.border = "1px solid #ccc";
                    dropdown.style.padding = "10px";
                    dropdown.style.zIndex = "1000";
                    dropdown.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

                    // Agregar los enlaces al dropdown
                    const logoutLink = document.createElement("a");
                    logoutLink.href = "logout";
                    logoutLink.style.width = "100%";
                    logoutLink.innerText = "Logout";
                    logoutLink.style.color = "#000";
                    logoutLink.style.display = "block";
                    logoutLink.style.marginBottom = "5px"; // Separar visualmente los enlaces
                    dropdown.appendChild(logoutLink);


                    logoutLink.addEventListener("click", function (e) {
                        e.preventDefault(); // Evitar que se ejecute el enlace
                    
                        // Crear un fondo translúcido que ocupe toda la pantalla
                        const overlay = document.createElement("div");
                        overlay.id = "overlay";
                        overlay.style.position = "fixed";
                        overlay.style.top = "0";
                        overlay.style.left = "0";
                        overlay.style.width = "100%";
                        overlay.style.height = "100%";
                        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Color negro translúcido
                        overlay.style.zIndex = "9999"; // Asegurar que esté encima de todo
                        overlay.style.display = "flex";
                        overlay.style.justifyContent = "center";
                        overlay.style.alignItems = "center";
                    
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
                            // Quitar el overlay al cancelar
                            document.body.removeChild(overlay);
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
                    
                            // Redirigir al logout
                            location.href = "logout";
                        });
                        confirmationBox.appendChild(logoutButton);
                    
                        // Agregar el confirmationBox al overlay
                        overlay.appendChild(confirmationBox);
                    
                        // Agregar el overlay al body
                        document.body.appendChild(overlay);
                    });
                    

                    const editLink = document.createElement("a");
                    editLink.href = "#";
                    editLink.innerText = "Editar";
                    editLink.style.width = "100%";
                    editLink.style.color = "#000";
                    editLink.style.display = "block";
                    dropdown.appendChild(editLink);

                    // Insertar el dropdown dentro del enlace user
                    user.appendChild(dropdown);

                    // Mostrar/ocultar el dropdown al hacer clic en user
                    user.addEventListener("click", function (e) {
                        e.stopPropagation(); // Evitar que se propague el evento
                        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
                    });

                    // Ocultar el dropdown al hacer clic en cualquier otra parte de la página
                    document.addEventListener("click", function () {
                        dropdown.style.display = "none";
                    });

                    login.parentElement.appendChild(user);
                    login.style.display = "none";

                    // Actualizar carrito al cargar la página

                    actualizarCarrito(carrito.kebabs);
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
    console.log(usuario.innerText);

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
        modal.id = "overlay";
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
                    carrito.push(kebab);
                }
            });

            // Actualizamos el contador del carrito
            actualizarContador(carrito);

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
                    carrito.push(kebab);
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
    contador.textContent = carrito.length;  // Ahora reflejamos la longitud total del carrito
    contador.value = carrito.length;
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
            body: JSON.stringify({ carrito: carrito }) // Datos que se envían al servidor
        });

        const data = await response.json();
        console.log(data.message); // Esto mostrará el mensaje de éxito, si lo hay
        console.log(data.carrito);  // Mostramos el carrito actualizado
    } catch (error) {
        console.error('Error al actualizar el carrito en el servidor:', error);
    }
}
