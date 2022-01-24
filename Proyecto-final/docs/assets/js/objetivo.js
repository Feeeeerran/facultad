// DE LA SECCION OBJETIVO /////////////////////
// Se toman 3 canvas, entonces trabajamos todo con un array excepto la carga de la imagen, que sera la misma para todos los canvas

let objetivoImg = new Image();
objetivoImg.crossOrigin = 'anonymous'
objetivoImg.src = 'assets/img/db/tornillo2.jfif';


// Tomando el canvas donde se va a mostrar + el contexto de renderizacion
let objetivoCanvas = [];
let objetivoCanvas_ctx = [];
for (let i=0;i<3;i++) {
    objetivoCanvas.push(document.getElementById(`objetivoBinarizado${i+1}`));
    objetivoCanvas_ctx.push(objetivoCanvas[i].getContext('2d'));

    // Para que aparezca toda la imagen en el canvas, uso el alto y ancho del canvas del DOM
    objetivoCanvas_ctx[i].canvas.width = objetivoCanvas_ctx[i].canvas.clientWidth;
    objetivoCanvas_ctx[i].canvas.height = objetivoCanvas_ctx[i].canvas.clientHeight;

}


// Una vez cargada la imagen podemos meter la misma en el canvas (renderizar)
objetivoImg.addEventListener("load",()=> {
    let it = 0;
    for (ctx of objetivoCanvas_ctx) {
        ctx.drawImage(objetivoImg,0,0,objetivoCanvas[it].width,objetivoCanvas[it].height)
        it++;
    }


    // Para lograr buenos datos a la hora de calcular los momentos, se aplican los filtros en el siguiente orden:
    //      1. Desenfoque
    //      2. Deteccion de bordes ()
    //      3. Binarizacion de la imagen

    // Desenfoque
    escalaGrises(objetivoCanvas_ctx[0])
    
    //Desenfoque + deteccion de bordes
    escalaGrises(objetivoCanvas_ctx[1])
    maskApp(objetivoCanvas_ctx[1],mascaras[1]);


    //Desenfoque + deteccion de bordes + binarizacion
    escalaGrises(objetivoCanvas_ctx[2])
    maskApp(objetivoCanvas_ctx[2],mascaras[1]);
    binarizar(objetivoCanvas_ctx[2],200)
    maskApp(objetivoCanvas_ctx[2],mascaras[3])


})