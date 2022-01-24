// Script del proceso de obtencion de datos de la base de datos
// Ahora tenemos que sacar imagenes y contextos de 12 elementos, los cuales guardaremos todos en arrays
const cant = 12;


let procesoImg = []; 
// Generando los objetos img
for (let i=0;i<cant;i++) {
    procesoImg[i] = new Image();
    procesoImg[i].crossOrigin = 'anonymous'
}


// Asignando los .src de cada elemento

// Tornillos 
for (let i=0;i<3;i++) {
    procesoImg[i].src = `assets/img/db/${nombres[0]}${i+1}.jfif`
}

// Clavos 
for (let i=0;i<3;i++) {
    procesoImg[i+3].src = `assets/img/db/${nombres[1]}${i+1}.jfif`
}

// Arandelas 
for (let i=0;i<3;i++) {
    procesoImg[i+6].src = `assets/img/db/${nombres[2]}${i+1}.jfif`
}

// Tuercas 
for (let i=0;i<3;i++) {
    procesoImg[i+9].src = `assets/img/db/${nombres[3]}${i+1}.jfif`
}


// Ahora tomamos los canvas del dom y sacamos el context
let procesoCanvas = [];
let procesoCtx = [];

for (let i=0;i<cant;i++) {
    procesoCanvas[i] = document.getElementById(`db${i+1}`)
    procesoCtx[i] = procesoCanvas[i].getContext('2d')
    // Para renderizar en todo el canvas
    procesoCtx[i].canvas.width = procesoCtx[i].canvas.clientWidth
    procesoCtx[i].canvas.height = procesoCtx[i].canvas.clientHeight

    let ancho = procesoCanvas[i].clientWidth;
    let alto = procesoCanvas[i].clientHeight;

    // Y ya de paso pasamos la img
    procesoImg[i].addEventListener('load',()=> {
        procesoCtx[i].drawImage(procesoImg[i],0,0,ancho,alto)

        // Una vez cargada la imagen, aplicamos los filtros y binarizamos

        // Cambio a escala de grises
        escalaGrises(procesoCtx[i])
        // Desenfoque Gaussiano
        maskApp(procesoCtx[i],mascaras[1]);
        // Binarizacion
        binarizar(procesoCtx[i],200);
        // realce de bordes 3x3
        maskApp(procesoCtx[i],mascaras[3]);


        // escalaGrises(procesoCtx[i])
        // maskApp(procesoCtx[i],mascaras[0])
        // binarizar(procesoCtx[i],180)

        // Calculamos el momento
        let punto = momento(procesoCtx[i])

        // Graficamos en el chart correspondiente
        // Para el caso de la seccion proceso:
        //      el chart es procesoChart
        //      y la data se pushea en procesoArray (array con 4 arrays)

        // Igualmente tenemos que detallar los labels para cada uno, por lo tanto
        if (i>=0 && i<=2) {
            // Tornillos
            procesoArray[0].push(punto)
        } else if (i>=3 && i<=5) {
            // Clavos
            procesoArray[1].push(punto)
        } else if (i>=6 && i<=8) {
            // Arandelas
            procesoArray[2].push(punto)
        } else if (i>=9 && i<=11) {
            // Tuercas
            procesoArray[3].push(punto)
        }


        procesoChart.update()

    })
}




