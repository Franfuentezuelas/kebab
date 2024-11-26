// window.addEventListener("load", function() {
// const data=[];
// const labels=[];
// const colors=[];

// const ctx = document.getElementById('myChart');

// async function ventas() {
//     var peticion = await fetch('https://www.mykebab.com/pedido/kebabsCuenta');
//     var objeto = await peticion.json();
//     objeto.forEach(kebab => {
//         data.push(kebab.cantidad);
//         labels.push(kebab.nombre);
//     }
//     );
// }

//     ventas().then(function() {
//     new Chart(ctx, {
//       type: 'bar', //doughnut, bar
//       data: {
//         labels: labels,
//         datasets: [{
//           label: 'Unidades Vendidas',
//           data: data,
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         },
//         responsive:true,
//         maintainAspectRatio:false,

//       }
//     });
//     });
//     const boton = document.getElementById('botonGrafico');
//     boton.addEventListener('click', function() {
//       var grafico = document.getElementById('ajustarGrafico');
//       var barras = document.getElementById('myChart');
//       grafico.classList.toggle('graficoNoVisto');
//       grafico.classList.toggle('graficoVisto');
//       barras.classList.toggle('graficoNoVisto');
      
//       this.classList.toggle('graficoMarcado');
//       this.classList.toggle('graficoDesmarcado');
//     });
// }); 


window.addEventListener("load", function () {
  const data = [];
  const labels = [];
  const imagenes = [];

  const ctx = document.getElementById('myChart');

  async function ventas() {
    const peticion = await fetch('https://www.mykebab.com/pedido/kebabsCuenta');
    const objeto = await peticion.json();
    objeto.forEach(kebab => {
      data.push(kebab.cantidad);
      labels.push(kebab.nombre);
      imagenes.push(`./imagenes/${kebab.foto}`);
    });
    console.log(imagenes);
  }

  ventas().then(async function () {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Precargar imágenes
    const images = await Promise.all(imagenes.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.error(`Error al cargar la imagen: ${src}`);
          resolve(null); // Resolver con null en caso de error
        };
      });
    }));

    // Crear el gráfico
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Unidades Vendidas',
          data: data,
          backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo invisible
          borderColor: 'rgba(0, 0, 0, 0)', // Borde invisible
          borderWidth: 0 // Sin borde
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      },
      plugins: [{
        id: 'customBarBackground',
        beforeDraw: (chart) => {
          const { ctx, chartArea: { left, top, width, height }, scales: { x, y } } = chart;

          chart.data.datasets.forEach((dataset) => {
            dataset.data.forEach((value, index) => {
              const barWidth = x.getPixelForTick(index + 1) - x.getPixelForTick(index);
              const xPosition = x.getPixelForValue(index) - barWidth / 2;

              // Calcular posición inicial y altura de la barra
              const yBasePosition = y.getPixelForValue(0); // Línea base del eje Y
              const yValuePosition = y.getPixelForValue(value); // Altura de la barra
              const barHeight = yBasePosition - yValuePosition; // Diferencia entre base y valor

              // Dibujar la imagen si existe
              if (images[index]) {
                ctx.drawImage(
                  images[index],
                  xPosition,
                  yValuePosition, // Comienza en la altura exacta
                  barWidth,
                  barHeight // Tamaño proporcional a la barra
                );
              }
            });
          });
        }
      }]
    });
  });
  const boton = document.getElementById('botonGrafico');
  boton.addEventListener('click', function() {
    var grafico = document.getElementById('ajustarGrafico');
    var barras = document.getElementById('myChart');
    grafico.classList.toggle('graficoNoVisto');
    grafico.classList.toggle('graficoVisto');
    barras.classList.toggle('graficoNoVisto');
    
    this.classList.toggle('graficoMarcado');
    this.classList.toggle('graficoDesmarcado');
  });
});
