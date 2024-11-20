window.addEventListener("load", function() {


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


    const enviar = document.getElementById("enviar");

    // Evento que se ejecuta cuando el usuario pulsa el botón "enviar"
    enviar.addEventListener('click', function () {
        // paramos el evento para evitar que se ejecute el evento del submit
     
      console.log("pulsado enviar");
        var usuario = document.getElementById("usuario");
        var password = document.getElementById("password");
        var errorusuario = document.getElementById("errorusuario");
        var errorpassword = document.getElementById("errorpassword");
        var valido=true;
        // Limpiar los errores previos
        errorusuario.innerHTML = "";
        errorpassword.innerHTML = "";

        // Validar usuario
        if (usuario.value.trim() == "") {
            errorusuario.innerHTML = "El usuario no puede estar vacío";
            errorusuario.classList.add("show"); // Mostrar el error
            if(valido){
                valido=false;
            }
            
        } else {
            errorusuario.classList.remove("show"); // Ocultar si no hay error
        }

        // Validar contraseña
        if (password.value.trim() == "") {
            errorpassword.innerHTML = "La contraseña no puede estar vacía";
            errorpassword.classList.add("show"); // Mostrar el error
            if(valido){
                valido=false;
            }
        } else {
            errorpassword.classList.remove("show"); // Ocultar si no hay error
        }

        // si no hay errores realizo la comprobacion con la API login
        if (valido) {
            //realizo la peticion a la API
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
                if (data.mensaje == "Login exitoso") {
                error.innerHTML=data.mensaje;

                // ahora redirijo a la pagina principal
                //location.href = "http://www.mykebab.com";

                // quiero hacer el envio del formulario

                // Ahora obtengo el formulario y lo envío
                var loginForm = document.getElementById("loginForm");
                loginForm.submit();

                }else{
                    error.innerHTML="Error en los datos proporcionados"
                }
            })
            .catch(error => {
                console.error('Error:', error);            
            })
        }
    
    
    });  
});