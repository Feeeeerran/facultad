// Config y data del chart para el proceso de la database
// Como tenemos 4 elementos a mostrar, se sigue el siguiente esquema
//   Se genera un array de 4 arrays
//   Cada array corresponde a los elementos a clasificar
//   En este caso son 4 elementos (tornillos,clavos,arandelas y tuercas)
//   Entonces, segun el elemento, se pushea el punto a dicho array   
let procesoArray = [];
for (let i=0;i<4;i++) {
    procesoArray.push(new Array);
}


// Para facilitar el asunto, ya tenemos todo armado desde config para los datasets
const data_proc = {
    datasets: [
        {
            label: nombres[0],
            data: procesoArray[0],
            backgroundColor:colors[0],
            pointRadius:10
        },{
            label: nombres[1],
            data: procesoArray[1],
            backgroundColor:colors[1],
            pointRadius:10
        },{
            label: nombres[2],
            data: procesoArray[2],
            backgroundColor:colors[2],
            pointRadius:10
        },{
            label: nombres[3],
            data: procesoArray[3],
            backgroundColor:colors[3],
            pointRadius:10
        }
    ]
};


const procesoConfig = {
    type: 'scatter',
    data: data_proc,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            }
        },
        // plugins: {
        //     legend:{
        //         labels:{
        //             font: {
        //                 size:30
        //             }
        //         }
        //     }
        // }
    }
};


const procesoChart = new Chart(
    document.getElementById('procesoChart'),
    procesoConfig
);

