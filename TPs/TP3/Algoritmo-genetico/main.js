///////////////// Resolución al ejercicio 9 del TP3 de IA ////////////////

// El AG es una búsqueda estocástica que combina dos estados padres
// Los AG comienzan con un conjunto de k estados generados aleatoriamente, llamados población
// Los estados corresponden a individuos

// En la producción de la siguiente generación de estados, para cada estado se calcula la función de idoneidad.
// Una función de idoneidad debería devolver valores más altos para estados mejores.

// La combinación de individuos se realiza mediante operadores de cruce.
//      • El operador básico es el cruce por un punto:
//      • Se elige aleatoriamente un punto de la codificación.
//      • Los descendientes se crean cruzando las cadenas paternales en el punto de cruce.

// La mutación consiste en cambiar el signo de cada bit (si se trata con una cadena binaria) con cierta probabilidad






// Peso máximo finito
var Pc = 1000;

// Vector de beneficios y de pesos
var b = [100,50,115,25,200,30,40,100,100,100];
var w = [300,200,450,145,664,90,150,335,401,395];
// Cada posicion de los vectores está asociado al nº de bloque x (de 0 a 9 tenemos 10 bloques)

// La idea es seccionar aleatoriamente la cantidad de bloques y evaluar segun la funcion de ideonidad 
// Mi funcion de ideonidad evalua que:
//      No se sobrepasen los 1000
//      Se tenga el maximo valor de beneficio


var init = 1;
var final = [];

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Con estas iteraciones lo que hace este codigo por ahora es elegir un set de elecciones aleatorias y hacer un stack
// Falta definir la funcion de ideonidad, generar mas de un stack (hacer dos) e ir combinando posibilidades

for (var i=0;i<init;i++) {
    var wT = 0;
    var bb = 0;
    var set = new Array;


    var b = [100,50,115,25,200,30,40,100,100,100];
    var w = [300,200,450,145,664,90,150,335,401,395];

    while (wT <= Pc) {
        var sel = random(10);
        if (!set.includes(sel)) {
            wT += w[sel];
            if (wT >= Pc) break;
            bb += b[sel];
            set.push(sel);
        }
    }
    
}

console.log(sumaW(set));





// La funcion pick es una funcion recursiva que guarda o memoriza estados
// function pick(elem, memo = {}) {
//     var ideonidad = Object.values(memo);
    
//     var sumI = 0;
//     var sumW = 0;
//     for (var i = 0;i<ideonidad.length;i++) {
//         sum =+ ideonidad[i]
        
//     }


//     // if (Object.values(memo))
// }


function random(num) {
    return Math.floor(Math.random()*num)
    // funcion que me devuelve un numero aleatorio entre 0 y num
}

function sumaW(arr) {
    var suma =[0,0];
    for (var i=0;i<arr.length;i++) {
        console.log(suma)
        suma[0] += w[arr[i]];
        suma[1] += b[arr[i]];
    }

    var memo = {
        beneficio: suma[1],
        WTotal: suma[0],
        set: arr
    };
    return memo;
}

// function setup() {
//     createCanvas(550, 350);
// }


// function draw() {
//     background(255);
// }