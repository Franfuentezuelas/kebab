window.addEventListener("load", function() {

    // Obtener elementos del DOM
    const contenedor = document.getElementById("contenedor");
    const foco = document.getElementById("foco");
    const cargar = document.getElementById("cargar");
    const input = document.getElementById("imagen");
    const activarCamara = document.getElementById("activarCamara");
    const foto = document.getElementById("foto");
    const guardar = document.getElementById('guardar');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");

    let initialX = 0; // Almacena la posición inicial X
    let initialY = 0; // Almacena la posición inicial Y
    let isDragging = false; // Estado del arrastre

    // Guardar el tamaño inicial del foco al cargar la página
    const initialWidth = foco.offsetWidth;
    const initialHeight = foco.offsetHeight;

    // Variables para almacenar el tamaño actual del foco
    let currentWidth = initialWidth;
    let currentHeight = initialHeight;

    let videoCaja, video;

    // Evento para activar la cámara
    activarCamara.addEventListener('click', () => {
        // Deshabilitar el botón de activar cámara
        activarCamara.disabled = true;
        foto.disabled = false;

        // Crear el div que contendrá el video y aplicarle z-index 20
        videoCaja = document.createElement('div');
        // quiero ajustar la posición del video delante del contenedor
        videoCaja.style.position = 'absolute';  
        videoCaja.style.zIndex = '20';
        videoCaja.id = 'videoCaja';

        // Crear el elemento de video dinámicamente
        video = document.createElement('video');
        video.autoplay = true; // Para que el video se inicie automáticamente
        // Solo establece el ancho, la altura se ajustará proporcionalmente
        video.style.width = contenedor.offsetWidth + 'px';
        // Agregar el video dentro del videoWrapper
        videoCaja.appendChild(video);

        // Agregar el videoWrapper al contenedor principal
        contenedor.appendChild(videoCaja);

        // Acceder a la cámara
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            // Mostrar la transmisión en el elemento de video
            video.srcObject = stream;
        })
        .catch(error => {
            console.error("Error al acceder a la cámara:", error);
            alert("No se pudo acceder a la cámara.");
        });
    });

    // Capturar la imagen cuando se presiona el botón
    foto.addEventListener('click', () => {
        // Crear un canvas temporal para ajustar el tamaño de la imagen
        let captura = document.createElement('canvas');
        
        // Ajustar el ancho al del contenedor
        captura.width = contenedor.offsetWidth;

        // Calcular el alto automáticamente manteniendo la proporción
        let alto = (contenedor.offsetWidth / video.videoWidth) * video.videoHeight;
        captura.height = alto;

        // Obtener el contexto del canvas
        let context = captura.getContext('2d');

        // Capturar la imagen del video (sin dibujarla permanentemente en el canvas)
        context.drawImage(video, 0, 0, captura.width, captura.height);

        // Crear una URL de la imagen desde el canvas (esto es temporal)
        let url = captura.toDataURL();  // Esto convierte el contenido del canvas en una URL de imagen

        // Cargar la imagen en el foco y en el contenedor
        foco.style.backgroundImage = `url(${url})`;
        contenedor.style.backgroundImage = `url(${url})`;

        // Habilitar y deshabilitar botones según sea necesario
        activarCamara.disabled = false;
        foto.disabled = true;

        // Eliminar el video (opcional, si ya no lo necesitas)
        videoCaja.remove();
    });

    // evento click para cargar la imagen
    cargar.addEventListener("click", function() {
        // Obtener el archivo seleccionado
        let file = input.files[0];
            // Obtener la URL de la imagen
            if (file) {
                // Obtener la URL de la imagen
                let url = URL.createObjectURL(file);

                // Cargar la imagen en el foco
                foco.style.backgroundImage = `url(${url})`;

                // Cargar la imagen en el contenedor
                contenedor.style.backgroundImage = `url(${url})`;
            } else {
                alert("Por favor, selecciona una imagen.");
            }
    });

    // Evento mousedown para iniciar el seguimiento
    foco.addEventListener("mousedown", function(ev) {
        isDragging = true;
        initialX = ev.clientX; // Captura la posición inicial en X
        initialY = ev.clientY; // Captura la posición inicial en Y

        // Escucha el evento de movimiento
        document.addEventListener("mousemove", moverRata);
    });

    // Evento mouseup para detener el seguimiento
    document.addEventListener("mouseup", function() {
        isDragging = false;
        // Deja de escuchar el evento de movimiento
        document.removeEventListener("mousemove", moverRata);
    });

    // Evento para guardar la imagen que se ve en el div foco y asi obtener lo que seleccionamos solamene
    guardar.addEventListener('click', () => {
    // Obtener la URL de la imagen de fondo de foco (importente que se mantenga el tamaño original)
    let focoImagenUrl = foco.style.backgroundImage.slice(5, -2); // Extraer solo la URL

    // Crear un objeto Image para cargar la imagen de fondo que hemos obtenido
    let imagenFondo = new Image();
    // incluimos la imagen dentro del objeto
    imagenFondo.src = focoImagenUrl;

        // Esperar a que la imagen se haya cargado ya que si no estara vacia o sin todos los datos
        imagenFondo.onload = function() {
            // Obtener el tamaño original de la imagen
            const anchoImagenOriginal = imagenFondo.width; // 1600
            const altoImagenOriginal = imagenFondo.height; // 901
        // mostramos el tamaño que tiene la imagen para validar que tiene el mismo que inicialmente se cargo
            console.log("Ancho de la imagen:", anchoImagenOriginal);
            console.log("Alto de la imagen:", altoImagenOriginal);

            // capturamos las dimensiones que tiene el div foco para que el recorte de la imagen sea de ese tamaño
            let anchoFoco = foco.offsetWidth;  // Ancho del div foco 600 inicialmente y sin hacer scroll
            let altoFoco = foco.offsetHeight;  // Alto del div foco 600 inicialmente y sin hacer scroll

            // Obtener las coordenadas de la posición de fondo del foco (en pixeles)
            // de esta forma sabemos que estamos viendo en el div foco con respecto a la imagen total
            // de esta forma obtenemos la posicion de partida del recorte
            // poniendo el valor alternativo 0 evitamos que no se pueda obtener la posicion y le damos por defecto 0
            let xRecorte = parseInt(foco.style.backgroundPositionX, 10) || 0;
            let yRecorte = parseInt(foco.style.backgroundPositionY, 10) || 0;

            // Ajustar el canvas al tamaño del foco
            canvas.width = anchoFoco;
            canvas.height = altoFoco;

            // Dibujar la imagen completa en su tamaño original y recortar solo la región visible en el foco
            // de esta forma lo que conseguimos es posicionar la imagen con su tamaño real en 
            // la esquina superior izquierda del canvas pero no en la posicion 0,0 si no donde esta situada
            // en foco con lo que esa coordenada ya corresponde con la seleccion y posteriormente ajustamos 
            // el tamaño del canvas y del recorte que en este caso seran los mismos ademas no se ve canvas 
            // ya que lo hemos dejado oculto con css
            context.drawImage(
                imagenFondo,
                -xRecorte, -yRecorte,       // Punto de inicio del recorte
                anchoFoco, altoFoco,        // Tamaño del recorte que queremos obtener
                0, 0,                       // Dónde empieza a dibujar en el canvas
                anchoFoco, altoFoco         // Tamaño final en el canvas (mismo que el recorte)
            );

            // Crear una URL de la imagen desde el canvas
            let url = canvas.toDataURL();  // Convierte el contenido del canvas en una URL de imagen

            // Crear un nuevo elemento de imagen para mostrar la captura
            let imagenGuardada = document.createElement('img');
            imagenGuardada.src = url;

            // Ajustar el tamaño de la imagen solo me permite poner un ajusto no lo los dos???? auto no le gusta
            imagenGuardada.width = 600;  // Establece el ancho de la imagen (en píxeles)
            //imagenGuardada.height = 'auto'; // Establece la altura de la imagen (en píxeles)

            // Crear un contenedor div para agregar la imagen guardada
            let divImagen = document.createElement('div');
            divImagen.style.textAlign = 'center';
            divImagen.appendChild(imagenGuardada);

            // Añadir el div al body como el último hijo
            document.body.appendChild(divImagen);

            // Mostrar la imagen guardada en el div
            imagenGuardada.style.display = 'block';
            imagenGuardada.style.margin = '0 auto';
        };

    });

    // Función para capturar las coordenadas y calcular el movimiento
    function moverRata(ev) {
        if (isDragging) {
            var currentX = ev.clientX; // Nueva posición en X
            var currentY = ev.clientY; // Nueva posición en Y
    
            // Calcula el movimiento
            var moveX = currentX - initialX; // Movimiento horizontal
            var moveY = currentY - initialY; // Movimiento vertical
    
            // Obtener el valor actual de background-position
            var contenedorStyle = window.getComputedStyle(contenedor);
            var focoStyle = window.getComputedStyle(foco);
    
            // Obtener el valor de background-position para el contenedor
            var contenedorBgPosition = contenedorStyle.backgroundPosition.split(' ');
            var focoBgPosition = focoStyle.backgroundPosition.split(' ');
    
            // Convertir a enteros los valores de background-position (en caso de que haya unidades de medida como 'px')
            var contenedorPosX = parseInt(contenedorBgPosition[0], 10);
            var contenedorPosY = parseInt(contenedorBgPosition[1], 10);
    
            var focoPosX = parseInt(focoBgPosition[0], 10);
            var focoPosY = parseInt(focoBgPosition[1], 10);
    
            // Sumar el movimiento (moveX y moveY) a las posiciones actuales
            // de esta forma el movimiento del ratón es seguido por la imagen dando efecto de arrastre
            contenedorPosX -= -moveX;
            contenedorPosY -= -moveY;
    
            focoPosX -= -moveX;
            focoPosY -= -moveY;
    
            // Aplicar la nueva posición al background del contenedor y del foco
            contenedor.style.backgroundPosition = `${contenedorPosX}px ${contenedorPosY}px`;
            foco.style.backgroundPosition = `${focoPosX}px ${focoPosY}px`;
    
            // Actualizar la posición inicial para el siguiente movimiento
            initialX = currentX;
            initialY = currentY;
        }
    }

    // Función que maneja el aumento y disminución del tamaño del foco
    function manejarEscala() {
        // Factor de escala (cuánto aumenta o disminuye el foco por cada movimiento de la rueda)
        let scaleFactor; // Aumentar o disminuir 10 píxeles por cada movimiento de la rueda
    
        // Función que se ejecuta cuando se mueve la rueda del ratón
        contenedor.addEventListener("wheel", function(ev) {
            ev.preventDefault(); // Evita el comportamiento por defecto (desplazamiento de la página)
    
            // Detecta si la rueda se mueve hacia arriba (aumentar) o hacia abajo (disminuir)
            scaleFactor = ev.deltaY < 0 ? 10 : -10;
    
            // Calcula la nueva escala para el ancho y alto en relación con el tamaño inicial
            let newWidth = currentWidth + scaleFactor;
            let newHeight = currentHeight + scaleFactor;

            // Obtener el tamaño del contenedor
            let contenedorWidth = contenedor.offsetWidth;
    
            // Asegúrate de que el nuevo tamaño sea válido (ni menor que 200 ni mayor que el ancho del contenedor)
            if (newWidth >= 200 && newWidth <= contenedorWidth) {
                // Si el nuevo tamaño es válido, aplica el cambio de tamaño
                foco.style.width = newWidth + "px";
                foco.style.height = newHeight + "px";

                // Ajustar la posición (top y left) para mantener el foco centrado después del cambio de tamaño
                let currentTop = parseInt(window.getComputedStyle(foco).top, 10);
                let currentLeft = parseInt(window.getComputedStyle(foco).left, 10);
                foco.style.top = (currentTop - (scaleFactor / 2)) + "px";
                foco.style.left = (currentLeft - (scaleFactor / 2)) + "px";

                // Actualizar currentWidth y currentHeight con el nuevo tamaño
                currentWidth = newWidth;
                currentHeight = newHeight;
    
                // Ajustar el background-position en relación con la diferencia de escala
                let focoBgPosition = window.getComputedStyle(foco).backgroundPosition.split(' ');
                let zoomPosX = parseInt(focoBgPosition[0], 10) + scaleFactor / 2;
                let zoomPosY = parseInt(focoBgPosition[1], 10) + scaleFactor / 2;
    
                // Aplicar la nueva posición al background del foco
                foco.style.backgroundPosition = `${zoomPosX}px ${zoomPosY}px`;
            } else {
                console.log("El tamaño no es válido. El foco no se redimensionará.");
            }
        });
    }
    // Llama a la función de manejo de escala
    manejarEscala();
});

