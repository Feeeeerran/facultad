///////////////// Resolución al ejercicio 8 del TP3 de IA ////////////////
// Ideas para mejorar el algoritmo:
//  Ahora no se me ocurre ninguna pero en algun futuro, Ferran si ves esto miralo de nuevo


// Inicializamos los nodos (deignamos la cantidad de nodos, en nuestro caso son 17 --> de la A a la Q)
var lista = [];
var colores = [1,2,3,4,5,6,7]; // 7 colores para usar

for (var i=0; i<17; i++) {
    lista[i]=new Nodo((i+10).toString(36).toUpperCase());
    lista[i].pos.toUpperCase();
}





// Ahora relacionamos los nodos vecinos (a mano no me queda de otra y los colocamos en el canvas)
// Nodo A --> B
lista[0].nodosV = [lista[1]];
lista[0].x = 90;
lista[0].y = 70;

// Nodo B --> A C
lista[1].nodosV = [lista[0],lista[2]];
lista[1].x = 155;
lista[1].y = 50;

// Nodo C --> B D Q
lista[2].nodosV = [lista[1],lista[3],lista[16]];
lista[2].x = 160;
lista[2].y = 110;

// Nodo D --> C E F G H I Q
lista[3].nodosV = [lista[2],lista[4],lista[5],lista[6],lista[7],lista[8],lista[16]];
lista[3].x = 160;
lista[3].y = 180;

// Nodo E --> D F
lista[4].nodosV = [lista[3],lista[5]];
lista[4].x = 80;
lista[4].y = 180;

// Nodo F --> E D G
lista[5].nodosV = [lista[3],lista[4],lista[6]];
lista[5].x = 85;
lista[5].y = 240;

// Nodo G --> F D H
lista[6].nodosV = [lista[3],lista[5],lista[7]];
lista[6].x = 160;
lista[6].y = 260;

// Nodo H --> D G I J
lista[7].nodosV = [lista[3],lista[6],lista[8],lista[9]];
lista[7].x = 250;
lista[7].y = 270;

// Nodo I --> D G H J L P
lista[8].nodosV = [lista[3],lista[6],lista[7],lista[9],lista[11],lista[15]];
lista[8].x = 250;
lista[8].y = 200;

// Nodo J --> H I K 
lista[9].nodosV = [lista[7],lista[8],lista[10]];
lista[9].x = 330;
lista[9].y = 270;

// Nodo K --> J L M
lista[10].nodosV = [lista[9],lista[11],lista[12]];
lista[10].x = 400;
lista[10].y = 260;

// Nodo L --> I K M N
lista[11].nodosV = [lista[8],lista[10],lista[12],lista[13]];
lista[11].x = 380;
lista[11].y = 200;

// Nodo M --> K L
lista[12].nodosV = [lista[10],lista[11]];
lista[12].x = 450;
lista[12].y = 210;

// Nodo N --> L O P
lista[13].nodosV = [lista[11],lista[14],lista[15]];
lista[13].x = 380;
lista[13].y = 145;

// Nodo O --> N P Q
lista[14].nodosV = [lista[13],lista[15],lista[16]];
lista[14].x = 340;
lista[14].y = 110;

// Nodo P --> I N O Q
lista[15].nodosV = [lista[8],lista[13],lista[14],lista[16]];
lista[15].x = 290;
lista[15].y = 150;

// Nodo Q --> C D O P
lista[16].nodosV = [lista[2],lista[3],lista[14],lista[15]];
lista[16].x = 230;
lista[16].y = 100;



// Ahora el algoritmo
var init = 8; // Podemos definir por donde queremos que empiece a colorear
openSet = new Array;
openSet.push(lista[init]);




// Iteracion para colorear todos los nodos uno a uno
for (var i = 0;i <lista.length;i++) {
    var sel = 0;
    for (var j = 0;j<openSet.length;j++) {
        if (openSet[sel].cantRest<=openSet[j].cantRest) {
            sel = j;
        }
    }

    var actual = openSet[sel];
    var actualVec = openSet[sel].nodosV;

    // Añadimos color
    for (var c = 0;c<colores.length;c++) {
        if (!actual.colorRest.includes(c)) {
            actual.color = c;
            actual.check = true;
            // Le decimos a los nodos vecinos que el color del nodo actual es un color restringido
            for (var x=0;x<actualVec.length;x++) {
                if (actualVec[x].check == false) {
                    actualVec[x].colorRest.push(c);
                    actualVec[x].cantRest=+1;
                    if(!openSet.includes(actualVec[x])) {
                        openSet.push(actualVec[x])
                    }
                    
                    
                }
            }
            break;
        }
    }
    
    // Hasta este punto hemos:
    //      1- Detectado dentro del openSet cual nodo tiene mas restricciones
    //      2- Declaramos el nodo con mas restricciones como el actual y su lista de nodos vecinos como actualVec
    //      3- Coloreamos el nodo actual
    //      4- A los nodos vecinos les decimos que el color del nodo actual es un color restringido en ellos
    //      5- Sumamos +1 a la cantidad de restricciones de ese nodo
    //      6- Metemos los nodos vecinos dentro del openSet para evaluar

    // Ahora solo tenemos que sacar el nodo actual del openSet y volver a evaluar
    delArray(openSet,actual);
}

////////////////////////////////////////////////////////////////////////////
// Ahora por el html mostramos cual es el nodo más restringido y el menos restringido
var selA = 0;
var selB = 0;
for (var i=0; i<lista.length;i++) {
    if (lista[selA].nodosV.length<lista[i].nodosV.length) {
        selA = i;
    }

    if (lista[selB].nodosV.length>lista[i].nodosV.length) {
        selB = i;
    }
}

var masR = lista[selA];
var menosR = lista[selB];

var primerP = document.getElementById("nodoMasRest");
var segundoP = document.getElementById("nodoMenosRest");

primerP.textContent="El nodo más restringido es: "+masR.pos;
segundoP.textContent="El nodo menos restringido es: "+menosR.pos;
////////////////////////////////////////////////////////////////////////////



function setup() {
    createCanvas(550, 350);
    colores = [
        [249, 65, 68],
        [39, 125, 161],
        [67, 170, 139],
        [249, 199, 79],
        [243, 114, 44],
        [87, 117, 144],
        [77, 144, 142],
    ]
}


function draw() {
    background(255);

    for (var i=0;i<lista.length;i++) {
        lista[i].lines()
    }
    for (var i=0;i<lista.length;i++) {
        lista[i].show()
    }
    
}



function Nodo(letra) {
    this.pos = letra;
    this.color = undefined;
    this.cantRest = 0;
    this.colorRest = [];
    this.nodosV = [];
    this.check = false;

    this.show = function() {
        fill(color(colores[this.color]));
        circle(this.x,this.y,50);

        fill(0)
        text(this.pos,this.x-5,this.y+5)
    }

    this.lines = function() {
        for (var j=0;j<this.nodosV.length;j++) {
            line(this.x,this.y,this.nodosV[j].x,this.nodosV[j].y);
        }
    }


}

function delArray(arr,e) {
    for (var i = arr.length-1; i >= 0; i--) {
        if (arr[i] === e) {
            arr.splice(i,1);
        }
    }
}
