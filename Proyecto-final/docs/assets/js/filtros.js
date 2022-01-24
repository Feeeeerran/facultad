// Filtros para las imagenes
// Las siguientes funciones se aplican sobre los ctx, al igual que la funcion de binarizacion

// Para tratar un array unidimensional como bidimensional
// indice = x * (y + ancho)
function getIndice(x,y,w) {
    return x + (y*w)
}



// Deteccion de bordes
// [-1, -1, -1, -1, 8, -1, -1, -1, -1];
// [0, -1, 0, -1, 5, -1, 0, -1, 0];


//Desenfoques 
// [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9]
// [1/16, 1/8, 1/16, 1/8, 1/4, 1/8, 1/16, 1/8, 1/16]
const mascaras = [];
mascaras[0] = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9]
mascaras[1] = [1/16, 1/8, 1/16, 1/8, 1/4, 1/8, 1/16, 1/8, 1/16]
mascaras[2] = [-1, -1, -1, -1, 8, -1, -1, -1, -1]
mascaras[3] = [0, -1, 0, -1, 5, -1, 0, -1, 0]


// ESCALA DE GRISES ///////////////////////////
function escalaGrises(ctx) {
    // Array para devolver el escalado a gris
    // let dataGris = [];

    // Obtenemos el objeto imgData del context con el metodo getImageData()
    imgData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height)
    data = imgData.data;
    
    for (let i=0;i<data.length;i+=4) {
        let media = (data[i] + data[i+1] + data[i+2])/3;

        data[i] = media;
        data[i+1] = media;
        data[i+2] = media;
        // dataGris.push(media);
    }

    ctx.putImageData(imgData,0,0)
    // return dataGris;
}

// BINARIZACION ////////////////////////////////
function binarizar(ctx,umbral) {
    // Asignamos un array para devolver la binarizacion y poder sacar los momentos
    let dataBin = [];

    // Obtenemos el objeto imgData del context con el metodo getImageData()
    imgData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height)
    data = imgData.data;
    
    for (let i=0;i<data.length;i+=4) {
        let media = (data[i] + data[i+1] + data[i+2])/3;
        // (media > umbral) ? media=0 : media=255;
        (media > umbral) ? media=255 : media=0;

        data[i] = media;
        data[i+1] = media;
        data[i+2] = media;
        
        dataBin.push(media);
    }

    // Para hacer el putImageData si o si tiene que colocarse un objeto del tipo imageData, por eso no se coloca directamente el array data
    ctx.putImageData(imgData,0,0)


    return dataBin;
}


// APLICACION DE MASCARA 3X3 //////////////////////////
// Funcion a la cual se le da por parametro el ctx para renderizar y la mascara a aplicar
function maskApp(ctx,mask) {
    // Obtenemos el objeto imgData del context con el metodo getImageData()
    imgData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height)
    data = imgData.data;

    let ancho = ctx.canvas.width;
    let alto = ctx.canvas.height;

    // Array donde se genera la imagen con la mascara aplicada
    let dataN = [];
    let copiaData = {...data}

    for (dato in copiaData) {
        dataN.push(copiaData[dato])
    }

    // Data es un array unidimensional de longitud alto*ancho*4 --> donde 4 son los elementos (capas) RGBA, entonces a la hora de aplicar la mascara tengo que tener en cuenta que cada pixel del ctx en realidad son 4 elementos del array de data
    // El siguiente bucle recorre de a 4 elementos
    // El problema surge cuando al momento de aplicar la mascara, obtenga la matriz cuadrada de la capa para poder realizar la sumatoria
    for (let x=1;x<ancho-1;x++) {
        for (let y=1;y<alto-1;y++) {
            // Multiplicamos el indice * 4 para sacar la posicion de cada capa
            let index = getIndice(x,y,ancho)*4;

            // Ahora tengo que obtener la matriz cuadrada alrededor del pixel nucleo
            // Defino una matriz general con 3 elementos, los cuales seran los arrays de 8 elementos con los datos de los pixeles vecinos
            let M = [[],[],[]];
            // Tomo a j como la posicion por encima del pixel nucleo, que sera y-1, entonces partiendo desde x-1 y j = y-1, recorro a lo largo de x, luego, sumo uno a j, y recorro nuevamente
            let j = y-1;
            let init = getIndice(x-1,j,ancho)*4;

            // Recolecto los datos de los pixeles vecinos
            for (let m=0;m<3;m++) {
                for (let n=0;n<12;n+=4) {
                    M[0].push(data[init+n])
                    M[1].push(data[init+n+1])
                    M[2].push(data[init+n+2])
                }
                // Actualizo para la siguiente pasada
                j++;
                init = getIndice(x-1,j,ancho)*4;
            }

            

            // Aplicamos la mascara
            let sum = [];
            for (array of M) {
                let suma = 0;
                for (let i=0;i<array.length;i++) {
                    suma += array[i] * mask[i];
                }
                sum.push(suma);
            }

            // Debug
            // if (x==2 && y==2) {
            //     console.log(sum)
            // }

            // Aplicamos los cambios al nuevo array (para no sustituir mientras se barre la img)
            dataN[index] = sum[0]
            dataN[index+1] = sum[1]
            dataN[index+2] = sum[2]
        }
    }

    // Finalmente reemplazamos la nueva capa en data
    for (let i=0;i<dataN.length;i+=4) {
        data[i] = dataN[i];
        data[i+1] = dataN[i+1];
        data[i+2] = dataN[i+2];
    }

    ctx.putImageData(imgData,0,0)
}







// REALCE DE BORDES ///////////////////////////
// El ctx tiene que venir en escala de grises asi funciona mejor
// function bordes(ctx) {
//     // Obtenemos el objeto imgData del context con el metodo getImageData()
//     imgData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height)
//     data = imgData.data;

//     let ancho = ctx.canvas.width; 
//     let alto = ctx.canvas.height;

//     console.log(alto)
//     console.log(ancho)


//     // Saco una capa --> significativa
//     let capas = Object.assign({}, data);
//     let capa = [];
//     for (let i=0;i<data.length;i+=4) {
//         capa.push(capas[i]);
//     }

//     // console.log(data)
//     // console.log(capas)
//     // console.log(capa)

//     // Matriz mascara para aplicar el filtro
//     // let mascara = [-1, -1, -1, -1, 8, -1, -1, -1, -1];
//     let mascara = [0, -1, 0, -1, 5, -1, 0, -1, 0];
//     // let mascara = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9];
//     let it = 0;
//     for (let x=0;x<ancho;x++) {
//         for (let y=0;y<alto;y++) {
//             if ((x!=0 && x!=ancho-1) && (y!=0 && y!=alto-1)) {
//                 let i = getIndice(x,y,ancho)
//                 let pos = [x,y];
//                 // Se aplica la mascara que devuelve hace un return del nucleo
//                 nucleo = maskApp(capa,pos,mascara,ancho)
//                 data[i] = nucleo;
//                 data[i+1] = nucleo;
//                 data[i+2] = nucleo;
//                 data[i+3] = 255;
//             }
            
//         }
//     }


//     // Para hacer el putImageData si o si tiene que colocarse un objeto del tipo imageData, por eso no se coloca directamente el array data
//     ctx.putImageData(imgData,0,0)
// }


