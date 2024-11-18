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


    // Actualiza el contador del carrito
    contador.textContent = carrito.kebabs.length; // Concatenamos el texto con el número de kebabs
    contador.value = carrito.kebabs.length; // Concatenamos el texto con el número de kebabs

    // Función para cambiar el icono de usuario
    function cambiarIconoUsuario(seed) {
        const userDiv = document.getElementById('user');
        const nuevaImagen = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`;
        userDiv.style.backgroundImage = `url('${nuevaImagen}')`;
    }
    // api que pide el nombre del usuario y lo cambia en la imagen
    // en la peticion no se le pasa nada ya que es el servidor el que tiene que tener la sesion activa
    // si hay sesion activa se le pasa el nombre del usuario

    // pedir a la api el nombre del usuario
    async function cargarusuario() {  
    await fetch('http://www.mykebab.com/usuario')
        .then(response => response.text())
        .then(usuario => {
            console.log(usuario);
            if(usuario==""){
                cambiarIconoUsuario('');
            }else{
                cambiarIconoUsuario(usuario);
            };
        })
        .catch(error => console.error("Error fetching usuario:", error)); // Manejo de errores
    }

    cargarusuario();
    // cambiar el nombre de usuario
    //cambiarIconoUsuario('');
    // cambiar login por el nombre de usuario
    // y habilibar el evento click para logout en el nombre del usuario y para mantenimiento
    // sera un div emergente, si pulsas mantenimiento se abrira un div en toda la pantalla para 
    // mantener los datos del usuario
  });

