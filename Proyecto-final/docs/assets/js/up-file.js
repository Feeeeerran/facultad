// En este archivo
//  1. Se carga la imagen al canvas
//  2. Se aplican los filtros
//  3. Se obtienen los momentos
//  4. Se "pushean" al json
//  5. Luego se llama a una funcion actualizar que recargue los charts

// Tomamos los elementos del DOM
let inputBtn = document.querySelector(".upFoto input");
let upFotoImg = document.getElementById("preVisual")
let upFotoCanvas = document.getElementById("upFoto-canvas");
let upFotoCtx = upFotoCanvas.getContext("2d");


// Se añade el evento al input
inputBtn.addEventListener("change", upLoad)
// Funcion para tomar la img del input y cargar al canvas (loadToCanvas)
function upLoad(e) {
    if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();


        reader.onload = function (e) {
            
            // Cargamos el src a la img para previsualizar
            upFotoImg.src = e.target.result;
            upFotoImg.crossOrigin = "anonymous";

            // Una vez se carga la imagen, llamamos a la funcion que carga todo al canvas
            upFotoImg.addEventListener("load",loadToCanvas)
            
            


        };
        
        reader.readAsDataURL(e.target.files[0]);
    }
}

function loadToCanvas() {
    let ancho = upFotoCtx.canvas.clientWidth;
    let alto = upFotoCtx.canvas.clientHeight;

    upFotoCtx.canvas.width = ancho;
    upFotoCtx.canvas.height = alto;

    upFotoCtx.drawImage(upFotoImg,0,0,ancho,alto)

    // Una vez cargada en el canvas, se aplican los filtros
    // Cambio a escala de grises
    escalaGrises(upFotoCtx)
    // Desenfoque Gaussiano
    maskApp(upFotoCtx,mascaras[1]);
    // Binarizacion
    binarizar(upFotoCtx,150);
    // realce de bordes 3x3
    maskApp(upFotoCtx,mascaras[3]);



    // Ahora se ejecutan los algoritmos kmeans y knn respectivamente
    kMeans_AddChart(upFotoCtx);
    knn_AddChart(upFotoCtx);

}

