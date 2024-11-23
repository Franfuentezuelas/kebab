window.addEventListener("load", function () {
   
    cargarusuario();

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
                    user.usuario="";
                    user.innerHTML = "";
                } else {
                    cambiarIconoUsuario(usuario);
                    const login = document.getElementById("sesion");
                    var user = document.createElement("a");
                    user.id = "user";
                    user.usuario=usuario;
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
                            
                            fetch('http://www.mykebab.com/usuario/logout')
                            .then(response => response.text())
                            .then(data => {
                                console.log(data);   
                                window.location.href = "carta";                             
                            })
                            .catch(error => {
                                console.error("Error al actualizar el carrito:", error);
                            });
                            
                            // Recargar la página actual (carta)
                            
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

                   
                }
        
            })
            .catch(error => console.error("Error fetching usuario:", error)); // Manejo de errores
    }

 