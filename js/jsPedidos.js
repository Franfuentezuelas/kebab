window.addEventListener("load", function() {
    // Obtén el contenedor del carrito y el contador
    
    LogadoOK();

    // Configurar actualización automática cada 30 segundos
    setInterval(LogadoOK, 30000);
});

async function LogadoOK() {
    var logado=false;
    await fetch('https://www.mykebab.com/usuario/nombre')
        .then(response => response.text())
        .then(usuario => {
            //console.log(usuario);
            if (usuario != "") {
                logado=true;
            }
            console.log("Cargando...");
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
    await fetch('https://www.mykebab.com/pedido/pedidos')
        .then(response => response.text())
        .then(pedidos => {
            //console.log(pedidos);
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
        fetch('https://www.mykebab.com/pedido/pedidos'),
        fetch('https://www.mykebab.com/pedido/plantilla')
    ])
    .then(([pedidosResponse, plantillaResponse]) => {
        // Procesar las respuestas de ambas peticiones
        return Promise.all([
            pedidosResponse.json(),
            plantillaResponse.text()
        ]);
    })
    .then(([pedidos, plantilla]) => {
        //console.log(pedidos);
        // Verificar si los pedidos no están vacíos
        if (pedidos !== "") {
            console.log("todo ha llegado correcto");
            var seccion = document.getElementsByTagName("section")[0];
            seccion.innerHTML = "";
            var div = document.createElement("div");
            div.innerHTML = plantilla;
            var tbody = div.getElementsByTagName("tbody")[0];
            pedidos.forEach(pedido => {
                // console.log(pedido);
                // console.log(pedido.id);
                // console.log(pedido.importe);
                // console.log(pedido.fecha);
                // console.log(pedido.direccion);
                // console.log(pedido.estado);
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
                estado.value = pedido.estado;
                estado.numero=pedido.id;

                estado.addEventListener("click", function() {
                        console.log("Estado de pedido: " + this.value);
                        console.log(this.numero);
                        console.log(this.value);

                        // Realizar petición para actualizar el estado del pedido
                        
                         fetch('https://www.mykebab.com/pedido/actualizarPedido', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: this.numero, // Asegúrate de que 'this.numero' contiene un valor válido
                                estado: this.value // Asegúrate de que 'this.value' contiene un valor válido
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log("Estado actualizado correctamente:", data);
                            LogadoOK(); // Recargar datos
                            
                        })
                        .catch(error => {
                            console.error("Error al actualizar el estado del pedido:", error);
                        });
                  
                    
                    

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

