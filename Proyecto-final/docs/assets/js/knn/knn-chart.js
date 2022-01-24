// CHART.JS /////////////////////////////////////////////////
// En este archivo se llama al k-means y se genera la gráfica

// Primero se obtienen los datos del .json 
let knnData;
let knnConfig;
let knnDataset;
let knnChart;





// Traemos la informacion del archivo de data-img.json
fetch("assets/js/data/data-img.json")
.then(res => res.json())
.then((data) => {
    
    // El array con los datos separados (training set)
    knnDataset = data;

    // /////////////////// CHART ///////////////////
    // Una vez conseguidos el array de datos, podemos hacer la secuencia para graficar
    knnData = {
        datasets: [
            {
                label: nombres[0],
                data: data[0],
                backgroundColor: colors[0],
                pointRadius: 10
            }, {
                label: nombres[1],
                data: data[1],
                backgroundColor: colors[1],
                pointRadius: 10
            }, {
                label: nombres[2],
                data: data[2],
                backgroundColor: colors[2],
                pointRadius: 10
            }, {
                label: nombres[3],
                data: data[3],
                backgroundColor: colors[3],
                pointRadius: 10
            }
        ]
    };



    // Config --> no se cambia
    knnConfig = {
        type: 'scatter',
        data: knnData,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    };

    // SetUp --> Inicia el chart
    knnChart = new Chart(
        document.querySelector('#knnChart'),
        knnConfig
    );
    
    // Pruebas
    let prueba = {
        x:4,
        y:65
    }

    // knnDataset = knn(prueba,knnDataset,3)
    // knnChart.update();


})


// Seleccion del k
const k = 3;

function knn_AddChart(ctx) {
    let nuevoP = momento(ctx);
    let R = knn(nuevoP,knnDataset,k);
    knnDataset = R[0];
    let predict = R[1];
    
    // Actualizamos el chart
    knnChart.update();
    
    // Mostrar el resultado en el DOM
    let showRes = document.querySelector('.knn p');
    showRes.textContent = `Clasificado como ¡${nombres[predict]}!`
    showRes.style.color = colors[predict]


}

