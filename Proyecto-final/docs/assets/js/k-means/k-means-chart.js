// CHART.JS /////////////////////////////////////////////////
// En este archivo se llama al k-means y se genera la gráfica

// Primero se obtienen los datos del .json 
let kMdata;
let kMconfig;
let kMdataset;
let kMchart;





// Traemos la informacion del archivo de data-img.json
fetch("assets/js/data/data-img.json")
.then(res => res.json())
.then((data) => {
    
    // El array con los datos separados (training set)
    kMdataset = data;

    // /////////////////// CHART ///////////////////
    // Una vez conseguidos el array de datos, podemos hacer la secuencia para graficar
    kMdata = {
        datasets: [
            {
                label: nombres[0],
                data: kMdataset[0],
                backgroundColor: colors[0],
                pointRadius: 5
            }, {
                label: nombres[1],
                data: kMdataset[1],
                backgroundColor: colors[1],
                pointRadius: 5
            }, {
                label: nombres[2],
                data: kMdataset[2],
                backgroundColor: colors[2],
                pointRadius: 5
            }, {
                label: nombres[3],
                data: kMdataset[3],
                backgroundColor: colors[3],
                pointRadius: 5
            }
        ]
    };


    // Ahora se generan las posiciones de los centroides (solo inicial)
    for (let i=0;i<data.length;i++) {
        centroides(data[i],i);
    }

    // Config --> no se cambia
    kMconfig = {
        type: 'scatter',
        data: kMdata,
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
    kMchart = new Chart(
        document.querySelector('#kMeansChart'),
        kMconfig
    );
    

})


// Cuando se carga la imagen con los filtros, podemos calcular el momento de la misma, la cual nos dara los puntos para ubicarlos en la grafica y proceder a aplicar el algoritmo que querramos

// El context donde esta la info esta guardado en 
// upFotoCtx



function kMeans_AddChart(ctx) {
    let nuevoP = momento(ctx);
    let R = kMeans(nuevoP,kMdataset)
    kMdataset = R[0];
    let predict = R[1];

    // Actualizamos el chart
    kMchart.update()


    // Mostrar el resultado en el DOM
    let showRes = document.querySelector('.kMeans p');
    showRes.textContent = `Clasificado como ¡${nombres[predict]}!`;
    showRes.style.color = colors[predict]

}


