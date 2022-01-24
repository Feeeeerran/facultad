// Pasos en el algoritmo de k-means
//  1. Inicia: se escogen el numero de k grupos y se establecen k centroides
//  2. Se asignan objetos a los centroides (objetos = datos)
//  3. Se actualizan los centroides
let centroidesArr = [];

// Funcion para calcular la posicion de los centroides (solo incialmente)
// Pusheamos los centroides al dataset  de kMdata --> kMdata.datasets.push({...})
function centroides(array,i) {
    let sumX = 0;
    let sumY = 0

    for (point of array) {
        sumX += point.x;
        sumY += point.y;
    }

    let xPos = sumX/array.length;
    let yPos = sumY/array.length;
    let pos = {
        x:xPos,
        y:yPos
    }


    kMdata.datasets[i+4] = {
        data:[pos],
        backgroundColor: colors[i],
        pointRadius:10
    }

    centroidesArr.push(pos)
}

// Y ahora la funcion la cual predice que tipo de dato es
// Donde se calculan las distancias del nuevo punto a los centroides
// luego se establece a que dataset pertenece (predice) y finalmente se actualizan los centroides


function kMeans(spot,sets) {
    // Tomamos el array de centroides y buscamos el mas cercano al punto
    // Para ello tomamos el punto a agregar y buscamos la menor distancia cuadratica

    let tipo = 0;
    dMin = distCuadratica(spot,centroidesArr[0])
    for (let i=1;i<centroidesArr.length;i++) {
        d = distCuadratica(spot,centroidesArr[i]);
        if (d<dMin) {
            tipo = i;
            dMin = d;
        }
    }

    // Una vez encontrado el centroide (encontramos la clasificacion) podemos devolver a que clase pertenece por el numero de tipo
    //  0: tornillo
    //  1: clavo
    //  2: arandela
    //  3: tuerca

    // Pero antes se pushea la data al chart y se actualizan los centroides
    sets[tipo].push(spot);

    centroides(sets[tipo],tipo);

    return [sets,tipo];

}




function distCuadratica(P1,P2) {
    dx = Math.abs(P2.x-P1.x);
    dy = Math.abs(P2.y-P1.y);

    return Math.sqrt(dx**2 + dy**2);
}





// function k_means(k,dataset,umbral = 1) {
//     // INICIALIZANDO ///////////////////////////////////////////
//     // Los centroides seran los primeros puntos en saltos de 3
//     let centroides = [];
//     for (let i=0;i<dataset.length;i+=3) {
//         centroides.push(dataset[i])
//     }
    

//     // BUCLE ///////////////////////////////////////////
//     // Bucle a iterar hasta minimizar el umbral
//     flag = true;
//     var sets;
//     while (flag) {
//         // Asignamos los puntos a los centroides, es decir que encontramos las menores distancias y clasificamos los puntos en k arrays (objetos es un array de arrays)
//         sets = [];
//         for (cant in centroides) {
//             sets.push(new Array());
//         }

//         for (let point of dataset) {
//             distancias = [];
//             for (centroide of centroides) {
//                 distancias.push(distCuadratica(point,centroide));
//             }

//             let it = 0;
//             let min = distancias[it];
//             for (let i=1;i<distancias.length;i++) {
//                 if (distancias[i] < min) {
//                     min = distancias[i];
//                     it = i;
//                 }
//             }

//             sets[it].push(point)
//         }
//         console.log(sets)

//         // Re-ubicamos los centroides según los grupos
//         let it = 0;
//         for (set of sets) {
//             let sumX = 0;
//             let sumY = 0;
//             for (point of set) {
//                 sumX += point.x;
//                 sumY += point.y;
//             }

//             centroides[it].x = sumX/set.length;
//             centroides[it].y = sumY/set.length;
//             it++;
//         }

//         umbral--;
//         if (umbral == 0) {
//             flag = false; 
//         }

//     }

//     // DATOS PARA EL CHART.JS /////////////////////////////////////////////////
//     dataChart = [];
//     it = 1;
//     for (set of sets) {
//         dataChart.push(
//             {
//                 label:`Data ${it}`,
//                 data: set,
//                 backgroundColor: colors[it-1]
//             },{
//                 label:`Centroide ${it}`,
//                 data:[centroides[it-1]],
//                 backgroundColor: colors[it-1],
//                 pointRadius:10
//             }
//         )
//         it++;
//     }

//     return dataChart
// }
