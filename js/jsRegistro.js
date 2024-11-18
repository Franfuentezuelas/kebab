window.addEventListener("load", function() {
    // Obtén el contenedor del carrito y el contador
    var carrito = document.getElementById("carrito");
    var contador = document.getElementById("contador");


    fetch('http://www.mykebab.com/direccion/provincias')
    .then(response => response.json())  // Parsear la respuesta como JSON
    .then(data => {
        var provincias=document.getElementById("provincia");
        data.forEach(provincia => {
            var option=document.createElement("option");
            option.value=provincia;
            option.innerHTML=provincia;
            provincias.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error:', error);      

    });

    // Obtener los elementos select
const provincia = document.getElementById("provincia");
const localidad = document.getElementById("localidad");


// Evento que se ejecuta cuando cambia el valor de la provincia
provincia.addEventListener('change', function() {
    // Si se selecciona "Seleccione una provincia", deshabilitar el select de localidad
    if (provincia.value === "Seleccione una provincia") {
        localidad.innerHTML = ""; // Limpiar las localidades
        const option = document.createElement("option");
        option.value = "Seleccione una localidad";
        option.innerHTML = "Seleccione una localidad";
        localidad.appendChild(option);
        localidad.setAttribute("disabled", "true"); // Deshabilitar localidad
    } else {
        // Si se selecciona una provincia válida, habilitar el select de localidad
        fetch('http://www.mykebab.com/direccion/' + provincia.value)
            .then(response => response.json()) // Parsear la respuesta como JSON
            .then(data => {
                localidad.innerHTML = ""; // Limpiar el select de localidades
                const option = document.createElement("option");
                option.value = "Seleccione una localidad";
                option.innerHTML = "Seleccione una localidad";
                localidad.appendChild(option);

                // Añadir las nuevas localidades al select
                data.forEach(localidadData => {
                    const option = document.createElement("option");
                    option.value = localidadData;
                    option.innerHTML = localidadData;
                    localidad.appendChild(option);
                });

                // Habilitar el select de localidad
                localidad.removeAttribute("disabled");
            })
            .catch(error => {
                console.error('Error:', error);
                // Si hay un error, también puedes limpiar o dejar el select vacío
                localidad.innerHTML = "";
                const option = document.createElement("option");
                option.value = "Seleccione una localidad";
                option.innerHTML = "Seleccione una localidad";
                localidad.appendChild(option);
                localidad.setAttribute("disabled", "true"); // Deshabilitar si hubo un error
            });
    }
});


    // Función para alternar la visibilidad de la contraseña
    document.getElementById('togglePassword').addEventListener('click', function (e) {
        // Obtener el campo de la contraseña
        var passwordField = document.getElementById('password');
        
        // Comprobar si la contraseña está visible o no
        if (passwordField.type === 'password') {
            passwordField.type = 'text';  // Cambiar a tipo 'text' para mostrar la contraseña
            this.innerHTML = '<i class="fa fa-eye-slash"></i>';  // Cambiar el icono a 'ojo tachado'
        } else {
            passwordField.type = 'password';  // Volver a tipo 'password' para ocultar la contraseña
            this.innerHTML = '<i class="fa fa-eye"></i>';  // Volver al icono de 'ojo'
        }
    });

    // evento enviar revisara todos los campos, si no estan vacios 
    // y cumplem los patrones de validacion se enviara el formulario
    // antes se comprobara si el usuario ya esta registrado y si es asi se informara al usuario
    enviar.addEventListener('click', function() {
        // Limpiar mensajes de error previos
        var camposError = document.querySelectorAll('.error');
        camposError.forEach(function(error) {
            error.innerHTML = "";
            error.classList.remove("show");
        });
    
        // Validación de nombre
        var nombre = document.getElementById("nombre");
        var errornombre = document.getElementById("errornombre");
        if (nombre.value.trim() === "") {
            errornombre.innerHTML = "El nombre no puede estar vacío";
            errornombre.classList.add("show");
            valido = false;
        }
    
        // Validación de apellidos
        var apellidos = document.getElementById("apellidos");
        var errorapellidos = document.getElementById("errorapellidos");
        if (apellidos.value.trim() === "") {
            errorapellidos.innerHTML = "Los apellidos no pueden estar vacíos";
            errorapellidos.classList.add("show");
            valido = false;
        }
    
        // Validación de teléfono (9 dígitos, comienza con 6)
        var telefono = document.getElementById("telefono");
        var errortelefono = document.getElementById("errortelefono");
        var telefonoRegex = /^6\d{8}$/;  // Expresión regular para 9 dígitos que comienzan con 6
        if (!telefonoRegex.test(telefono.value.trim())) {
            errortelefono.innerHTML = "El teléfono debe tener 9 dígitos y comenzar con 6";
            errortelefono.classList.add("show");
            valido = false;
        }
    
        // Validación de correo
        var email = document.getElementById("email");
        var erroremail = document.getElementById("erroremail");
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Expresión regular para correo
        if (!emailRegex.test(email.value.trim())) {
            erroremail.innerHTML = "Por favor, introduce un correo electrónico válido";
            erroremail.classList.add("show");
            valido = false;
        }
    
        // Validación de usuario
        var usuario = document.getElementById("usuario");
        var usuarioRegistrado=true;
        var errorusuario = document.getElementById("errorusuario");
        if (usuario.value.trim() === "") {
            errorusuario.innerHTML = "El usuario no puede estar vacío";
            errorusuario.classList.add("show");
            valido = false;
            usuarioRegistrado=false;
        }
    
        // Validación de contraseña
        var password = document.getElementById("password");
        var errorpassword = document.getElementById("errorpassword");
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/; // Expresión regular para correo
        if (!passwordRegex.test(password.value.trim())) {
            errorpassword.innerHTML = "Por favor, introduce un password válido";
            errorpassword.classList.add("show");
            valido = false;
        }
    
        // Validación de dirección
        var direccion = document.getElementById("direccion");
        var errordireccion = document.getElementById("errordireccion");
        if (direccion.value.trim() === "") {
            errordireccion.innerHTML = "La dirección no puede estar vacía";
            errordireccion.classList.add("show");
            valido = false;
        }
    
        // Validación de número de calle
        var numero = document.getElementById("numero");
        var errornumero = document.getElementById("errornumero");
        var numeroRegex = /^(?:[1-9][0-9]{0,3}|0)$/; 
        if (!numeroRegex.test(numero.value.trim())) {
            errornumero.innerHTML = "Por favor, introduce un numero de calle válido";
            errornumero.classList.add("show");
            valido = false;
        }
    
        // Validación de resto de dirección (opcional)
        var resto = document.getElementById("resto");
        var errorresto = document.getElementById("errorresto");
        if (resto.value.trim() === "") {
            errorresto.classList.remove("show");  // Si está vacío, no hay error
        }
    
        // Validación de provincia
        var provincia = document.getElementById("provincia");
        var errorprovincia = document.getElementById("errorprovincia");
        if (provincia.value === "Seleccione una provincia") {  // Comprobamos si se seleccionó la opción por defecto
            errorprovincia.innerHTML = "Selecciona una provincia";
            errorprovincia.classList.add("show");
            valido = false;
        }
    
        // Validación de localidad
        var localidad = document.getElementById("localidad");
        var errorlocalidad = document.getElementById("errorlocalidad");
        if (localidad.value == "Seleccione una localidad") {  // Comprobamos si se seleccionó la opción por defecto
            errorlocalidad.innerHTML = "Selecciona una localidad";
            errorlocalidad.classList.add("show");
            valido = false;
        }
    
        // Validación de código postal
        var codigopostal = document.getElementById("codigopostal");
        var errorcodigopostal = document.getElementById("errorcodigopostal");
        var codigopostalRegex = /^\d{5}$/;
        if (!codigopostalRegex.test(codigopostal.value.trim())) {
            errorcodigopostal.innerHTML = "Introduce un Codigo Postar válido";
            errorcodigopostal.classList.add("show");
            valido = false;
        }

    // aqui valido si el usuario ya esta registrado

    // Evento que se ejecuta cuando el usuario pulsa el botón "enviar"
    if (usuarioRegistrado){
            //realizo la peticion a la API para saber si el usuario ya esta registrado
            fetch('http://www.mykebab.com/logearse', {
                method: 'POST',  // Especificar el método de envío
                headers: {
                    'Content-Type': 'application/json',  // Tipo de contenido
                },
                body: JSON.stringify({
                    usuario: usuario.value,
                    password: password.value
                })  // Datos que se envían al servidor
            })
            .then(response => response.json())  // Parsear la respuesta como JSON
            .then(data => {
                var error=document.getElementById("errorlogin");
                error.innerHTML="";
                if (data.mensaje == "Login exitoso" || data.mensaje == "Contraseña incorrecta") {
                var registrado=document.getElementById("registrado");
                registrado.innerHTML="Ya tienes cuenta ";
                errorusuario.innerHTML = "Usuario ya registrado";
                errorusuario.classList.add("show");
                valido = false;
                }
            })
            .catch(error => {
                console.error('Error:', error);            
            })
        }
        if (valido) {
            alert("Registro exitoso");
        }
    });  
        
});
    