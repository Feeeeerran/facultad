// Creando y generando la img a mostrar
let pickerImg = new Image();

pickerImg.crossOrigin = 'anonymous';
pickerImg.src = 'assets/img/img.jpg'

// Tomando el canvas donde se va a mostrar + el contexto de renderizacion
let imgCanvas = document.getElementById("picker-img");
let imgCanvasCtx = imgCanvas.getContext("2d");

// Para que aparezca toda la imagen en el canvas, uso el alto y ancho del canvas del DOM
imgCanvasCtx.canvas.width = imgCanvasCtx.canvas.clientWidth;
imgCanvasCtx.canvas.height = imgCanvasCtx.canvas.clientHeight;

// Una vez cargada la imagen podemos meter la misma en el canvas (renderizar)
pickerImg.addEventListener("load",()=> {
    console.log(pickerImg)
    imgCanvasCtx.drawImage(pickerImg,0,0,imgCanvas.width,imgCanvas.height)
    // pickerData = imgCanvasCtx.getImageData(0,0,imgCanvas.width,imgCanvas.height)
})

// Ahora agregamos el evento de over para obtener la info
// Tomamos los canvas para mostrar
let pickerCanvas = document.getElementById("picker")
let pickerSelectCanvas = document.getElementById("picker-select")

imgCanvas.addEventListener("mousemove",(e)=> {
    // sobre el manejador de eventos podemos capturar las posiciones del mouse sobre el canvas
    let x = e.layerX;
    let y = e.layerY;

    let code = imgCanvasCtx.getImageData(x,y,1,1).data;
    code = `rgb(${code[0]},${code[1]},${code[2]})`
    pickerCanvas.style.backgroundColor = code
})

imgCanvas.addEventListener("click",(e)=> {
    let x = e.layerX;
    let y = e.layerY;

    let code = imgCanvasCtx.getImageData(x,y,1,1).data;
    code = `rgb(${code[0]},${code[1]},${code[2]})`
    pickerSelectCanvas.style.backgroundColor = code

})