////////////////////////////////  ALGORITMO A* //////////////////////////////////

// Datos de grilla
var columnas = 25;
var filas = 20;




var grilla = new Array(columnas);


// Para hacer una grilla en dos dimensiones (matriz = grilla) hago que cada elemento del array tenga un array dentro de el
// De esta manera consigo una matriz a la que accedo con dos parámetros
for (var i = 0;i < columnas; i++) {
    grilla[i] = new Array(filas);
}


for (var i = 0; i < columnas; i++) {
    for (var j = 0;j < filas; j++) {
        grilla [j][i] = new Nodo(i,j);
    }
}

// Añadimos obstaculos a la grilla
for (var i = 7; i >=0; i--) {
    grilla[i][5].muro = true;

    grilla[15-i][9].muro = true;
    grilla[15][9-i].muro=true;

    grilla[filas-1-i][20].muro = true;
}

// Elegimos de forma aleatoria muros en la grilla
// for (var i = 0; i < columnas; i++) {
//     for (var j = 0;j < filas; j++) {
//         if (Math.random()<0.1) {
//             grilla [j][i].muro = true;
//         }
//     }
// }
///////////////////////////////////////////////////////////



// Determino cuales son los nodos de inicio y de fin
var inicio = grilla [0][0];
var fin = grilla [filas-1][columnas-1];

// Nos aseguramos de que los nodos de inicio y fin no sean muros
inicio.muro = false;
fin.muro = false;


// Tenemos que tener en cuenta que cuando inicia el algoritmo, vamos seleccionando nodos, del mismo calculamos
// el valor de f = g + h, (por eso el objeto nodo).
// Para no repetir los nodos por los que pasamos, creamos dos sets, el set abierto y el set cerrado, en este caso
// los sets serán listas, lista abierta y lista cerrada
// En la lista abierta colocamos los nodos que no hemos resuelto
// En la lista cerrada los que hemos resuelto
// De esta manera el algoritmo sigue solo si la lista abierta tiene elementos a resolver, y finalizará
// cuando el mismo llegue a destino o no existan más nodos posibles (lista abierta vacia)
listaAb = new Array;
listaCerr = new Array;

// Al iniciar el algoritmo, el primer nodo a evaluar es el nodo inicial
listaAb.push(inicio);
var path = new Array



for (var i = 0; i < columnas; i++) {
    for (var j = 0;j < filas; j++) {
        grilla [j][i].addNodosH(grilla);
    }
}





// Funciones de la libreria P5 para dibujar
// La función draw() dibuja sobre el html de forma iterativa por cada cambio que suceda en la página, por que lo que nos servirá de bucle
// para encontrar las posibilidades que necesitemos

function setup() {
    createCanvas(1200, 600);
}



function draw() {
    background(255)
    inicio.show(color(0,255,0))
    // Entramos a evaluar siempre que tengamos un elmento dentro de la lista abierta
    if (listaAb.length > 0) {

        // Genero una variable para el nodo seleccionado
        nodoSel = 0;

        // Itero dentro de la lista abierta empezando del primer elemento para encontrar el de menor f
        for (var i = 0; i < listaAb.length; i++) {
            if (listaAb[i].f < listaAb[nodoSel].f) {
                nodoSel = i;
            }
        }

        actual = listaAb[nodoSel];

        // Ahora que tenemos seleccionado un nodo (actual = nos paramos en el), lo quitamos de la lista abierta y lo pasamos
        // a la lista cerrada
        delArr(listaAb,actual);
        listaCerr.push(actual);


        // Ahora tenemos que evaluar los nodos hijos del nodo actual

        // Empezamos con el coste g, sabemos que por cada movimiento el costo es de uno y se incrementa cuando nos trasladamos
        // de nodo en nodo. Entonces podemos generar un "mapa" iterado con el for para que g incremente segun se aleja del inicio
        var listaNodos = actual.nodosH;
        for (var i = 0; i < listaNodos.length; i++) {
            var nodoH = listaNodos[i];

            // No nos interesa (no es eficiente) recalcular los valores de f = g + h para nodos que ya hemos visitado, entonces
            // aseguramos que los nodos hijo a evaluar no esté en la lista cerrada
            if (!listaCerr.includes(nodoH) && !nodoH.muro) {
                var G = actual.g + 1;


                // En caso de que el nodo esté por evaluarse (dentro de la lista abierta) y en la lista el g es más grande que el g que se evalua
                // es decir, es más costoso en la lista y evaluandolo el costo es menor, entonces le doy ese valor de G para que el algoritmo
                // "fluya" en esa direccion y sea más eficiente
                if (listaAb.includes(nodoH)) {
                    if (G < nodoH.g) {
                        nodoH.g = G;
                    }
                } else {
                    nodoH.g = G;
                    listaAb.push(nodoH);
                }

                // Calculando la heurística y f
                nodoH.h = heurist(nodoH,fin);
                nodoH.f = nodoH.g + nodoH.h;


                // Para establecer el camino que vamos a recorrer segun el menor valor de f, entonces si me quedo con un nodo de bajo coste
                // necesito saber de que nodo ha salido
                nodoH.anterior = actual;

            }
        }

        // En caso de que el algoritmo llegue a la meta, finaliza
        if (actual === fin) {
            console.log("Al fin dio mio");
            noLoop();
        }

    } else {
        console.log("No hay caso mi amigo");
        noLoop();
    }

    
    // Coloreando los bloques

    for (var i = 0; i < columnas; i++) {
        for (var j = 0; j < filas; j++) {
            grilla[j][i].show(color(255));
        }
    }


    fin.show(color(255,0,0))
    
    for (var i = 0; i < listaAb.length; i++) {
        listaAb[i].show(color(40, 255, 191))
    }

    for (var i = 0; i < listaCerr.length; i++) {
        listaCerr[i].show(color(255, 72, 72))
    }

    for (var i = 0; i < columnas; i++) {
        for (var j = 0;j < filas; j++) {
            if (grilla [j][i].muro == true) {
                grilla [j][i].show(color(34, 40, 49))
            }
        }
    }



    path = [];
    path.push(actual);
    while (actual.anterior) {
        path.push(actual.anterior)
        actual = actual.anterior;
    }

    for (var i = 0; i < path.length; i++) {
        path[i].show(color(221, 255, 0))
    }
    
}








// Función constructora de los nodos como objetos
function Nodo(i,j) {
    this.x = i;     // para conocer donde se ubica cada nodo
    this.y = j;     // x = columna y = fila (cartesianos)
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.anterior = undefined;
    this.nodosH = [];
    this.muro = false;


    this.addNodosH = function(grilla) {
        var x = this.x;
        var y = this.y;
        if (y < filas-1) {
            this.nodosH.push(grilla[y+1][x])
        }

        if (y > 0 ) {
            this.nodosH.push(grilla[y-1][x])
        }

        if (x < columnas-1) {
            this.nodosH.push(grilla[y][x+1])
        }

        if (x > 0) {
            this.nodosH.push(grilla[y][x-1])
        }
    }

    this.show = function(col) {

        // Reescalando los valores de cada nodo según el ancho del canvas (P5 determina el ancho y alto con las variables width y height)
        var ancho = width/columnas;
        var alto = height/filas;


        fill(col);
        strokeWeight(0);
        stroke(100);
        rect(this.x*ancho,this.y*alto,ancho,alto);
        // La funcion rect me genera un rectangulo donde
            // los primeros dos parámetros indican la posicion en px
            // los dos que le siguen dan el alto y ancho
            // tener en cuenta que en el setup hago un *50, entonces alto = ancho = ancho total en px / cantidad de columnas o filas
            // que es igual a cant. col * 50 / cant. col = 50
    }
}


// Funcion para eliminar un elemento específico de una lista
function delArr(arr,elem) {
    for (var i = arr.length-1; i >= 0; i--) {
        if (arr[i] === elem) {
            arr.splice(i,1);
        }
    }
}


// La libreria P5 me da una funcion para calcular la distancia entre dos puntos en un plano
function heurist(a,b) {
    var dX = Math.abs(a.x - b.x);
    var dY = Math.abs(a.y - b.y);

    var d = dX + dY;;
    return d;
}