// Una vez binarizadas las imagenes, podemos calcular los momentos 

// En este archivo se tiene la funcion con todo el calculo de los momentos de hu, empezando con los momentos espaciales, luego los momentos centrales y finalmente los momentos invariantes o momentos de Hu

// Para caclular, el script procede
//  1. Entra el ctx
//  2. Sacamos la info
//  3. Convertimos los datos de 255 a 1 (y los 0 continuan siendo 0)
//  4. Se hacen los calculos



// ****************************
// OBTENCION DE LOS MOMENTOS
// Para sacar las caracteristicas de las img necesito obtener informacion, ordenarla y encontrar un patron, para ello hago uso de los momentos de una imagen

// Momento de imagen es cierto promedio ponderado particular de las intensidades de los píxeles de una imagen; o también una función de tales momentos.
// ****************************

function momento(ctx) {
    let ancho = ctx.canvas.width;
    let alto = ctx.canvas.height;

    let imgData = ctx.getImageData(0,0,ancho,alto);
    let data = imgData.data;

    
    // Para usar la funcion, el ctx ya tiene que estar binarizado, peeero siguen habiendo 3 valores iguales por pixel, por ende en el array I guardaremos como unos y ceros la informacion dada por el ctx
    let I = [];
    for (let i=0;i<data.length;i+=4) {
        if (data[i] == 0) {
            I.push(0);
        } else {
            I.push(1)
        }
    }

    // MOMENTOS ESPACIALES

    // Si mis canvas son de 300x150 entonces tengo un array de 45000 elementos
    // Para iterar en un array unidimensional como si fuera una matriz, uso:
    // x + (y * ancho) --> me devuelve el indice de la posicion en el array unidimensional
    let Me = [[0,0,0],[0,0,0],[0,0,0]];
    // proceso de sumatorias
    for (let p=0;p<3;p++) {
        for (let q=0;q<3;q++) {
            for (let x=0;x<ancho;x++) {
                for (let y=0;y<alto;y++) {
                    Me[p][q] = Me[p][q] + (x**p)*(y**q)*(I[x+(y*ancho)])
                }
            }
        }
    }


    // Area y centroides
    // let area = Me[0][0];
    // let xc = Me[1][0]/ Me[0][0];
    // let yc = Me[0][1]/ Me[0][0];

    // console.log(`tipo ${tipo}`)
    // console.log(`Area = ${area}`)
    // console.log(`xc = ${xc}`)
    // console.log(`yc = ${yc}`)
    
    // MOMENTOS CENTRALES (de segundo orden)
    // Podemos obtener los momentos centrales a partir de los momentos espaciales
    let Mc = [[0,0,0],[0,0,0],[0,0,0]];
    // Calculos a partir del los momentos espaciales
    Mc[0][0] = Me[0][0];
    Mc[0][1] = 0;
    Mc[1][0] = 0;
    Mc[2][0] = Me[2][0] - (((Me[1][0])**2)/(Me[0][0]));
    Mc[1][1] = Me[1][1] - ((Me[1][0]*Me[0][1])/(Me[0][0]));
    Mc[0][2] = Me[0][2] - (((Me[0][1])**2)/(Me[0][0]));


    // MOMENTOS NORMALES
    let Mn = [[0,0,0],[0,0,0],[0,0,0]];
    // proceso de sumatorias
    for (let i=0;i<3;i++) {
        for (let j=0;j<3;j++) {
            // 1 + (i+j)/2
            let aux = 1 + (i+j)*0.5;
            Mn[i][j] = ((Mc[i][j])/((Mc[0][0])**aux))
        }
    }
   
    // MOMENTOS INVARIANTES DE HU

    // Para nuestro momento de orden tres, sacamos los dos primeros momentos momentos invariantes dados por la operacion de la diagonal en la matriz de momentos normales

    h1 = Mn[2][0] + Mn[0][2];
    h2 = ((Mn[2][0] - Mn[0][2])**2) + 4*(Mn[1][1]**2)

    
    // Hacemos un raturn en formato de punto en 2d par poder graficar
    return {
        x:1/h1,
        y:1/h2
    }

}