window.addEventListener("load", function() {
    // Obtén el contenedor del carrito y el contador
    console.log("Cargando...");
    LogadoOK();
});

async function LogadoOK() {
    var logado=false;
    await fetch('http://www.mykebab.com/usuario/nombre')
        .then(response => response.text())
        .then(usuario => {
            console.log(usuario);
            if (usuario != "") {
                logado=true;
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
    if(logado){
        Pedidos();
    }
}

async function Pedidos() {
    var pedidos=false;
    await fetch('http://www.mykebab.com/pedido/pedidos')
        .then(response => response.text())
        .then(pedidos => {
            console.log(pedidos);
            if (pedidos != "") {
                pedidos=true;
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
    if(pedidos){
        Pedidos();
    }
}

function Pedidos() {
    // Realizar ambas peticiones simultáneamente utilizando Promise.all
    Promise.all([
        fetch('http://www.mykebab.com/pedido/pedidos'),
        fetch('http://www.mykebab.com/pedido/plantilla')
    ])
    .then(([pedidosResponse, plantillaResponse]) => {
        // Procesar las respuestas de ambas peticiones
        return Promise.all([
            pedidosResponse.json(),
            plantillaResponse.text()
        ]);
    })
    .then(([pedidos, plantilla]) => {
        console.log(pedidos);
        // Verificar si los pedidos no están vacíos
        if (pedidos !== "") {
            console.log("todo ha llegado correcto");
            var seccion = document.getElementsByTagName("section")[0];
            seccion.innerHTML = "";
            var div = document.createElement("div");
            div.innerHTML = plantilla;
            var tbody = div.getElementsByTagName("tbody")[0];
            pedidos.forEach(pedido => {
  
                var tr = document.createElement("tr");
                var id = document.createElement("td");
                id.innerHTML = ""+pedido.id;
                tr.appendChild(id);
                var importe = document.createElement("td");
                importe.innerHTML = ""+pedido.importe;
                tr.appendChild(importe);
                var fecha = document.createElement("td");
                fecha.innerHTML = (""+pedido.fecha.date).slice(0, 19);
                tr.appendChild(fecha);
                var direccion = document.createElement("td");
                direccion.innerHTML = ""+pedido.direccion;
                tr.appendChild(direccion);
                var estado = document.createElement("td");
                estado.classList.add("estado");
                estado.classList.add(pedido.estado);
                estado.innerHTML = ""+pedido.estado;
                estado.addEventListener("click", function() {
                    console.log("Estado de pedido: " + estado.classList.value);
                });
                tr.appendChild(estado);
                tbody.appendChild(tr);
            });
            
            seccion.appendChild(div);
            // Otros pasos según sea necesario
        } else {
            console.log("No se encontraron pedidos.");
        }
    })
    .catch(error => {
        console.error("Error en las solicitudes:", error);
    });
}

