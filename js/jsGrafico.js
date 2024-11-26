window.addEventListener("load", function() {
const data=[];
const labels=[];
const colors=[];

const ctx = document.getElementById('myChart');

async function ventas() {
    var peticion = await fetch('https://www.mykebab.com/pedido/kebabsCuenta');
    var objeto = await peticion.json();
    objeto.forEach(kebab => {
        data.push(kebab.cantidad);
        labels.push(kebab.nombre);
    }
    );
}

    ventas().then(function() {
    new Chart(ctx, {
      type: 'bar', //doughnut, bar
      data: {
        labels: labels,
        datasets: [{
          label: 'Unidades Vendidas',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive:true,
        maintainAspectRatio:false,

      }
    });
    });
}); 


