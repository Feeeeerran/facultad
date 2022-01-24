// Pasos en el algoritmo k-nn
//  1. Se determina un nuevo punto
//  2. Se buscan los k vecinos mas cercanos (por distancia cuadratica)
//  3. Entre tales vecinos se ubican los tipos
//  4. El nuevo punto sera del tipo que predomine en esos k vecinos mas cercanos

function Kspot(pos,tipo,d) {
    this.pos = pos;
    this.tipo = tipo;
    this.d = d;
}


function knn(spot,sets,k) {
    // Dado el array sets que contiene a todos los puntos (ordenados en distintos array) instancio objetos de la clase Kspot
    // Entonces para un nuevo punto (spot) calculo la distancia cuadratica a cada punto ya existente y lo guardo como la propiedad d
    // Luego se ordenan todos estos puntos en base a la distancia y se seleccionan los k con menor valor de d

    // Empezamos instanciando los objetos
    let spots = [];
    let i = 0;
    for (array of sets) {
        for (punto of array) {
            // Se calcula la distancia cuadratica al punto
            dis = distCuadratica(spot,punto);

            spots.push(new Kspot(
                punto,
                i,
                dis
            ))
        }
        i++;
    }

    
    // Ahora ordenamos de menor a mayor distancia cada punto
    spots.sort((a,b)=>{
        return a.d - b.d;
    })
    
    // Ahora nos quedamos con los k mas cercanos y ademas segun un array llamado sel guardamos la cantidad de puntos por tipo que hay en los k mas cercanos
    let cercanos = [];
    let sel = new Array(sets.length);
    sel.fill(0);
    for (let i=0;i<k;i++) {
        cercanos.push(spots[i]);
        sel[spots[i].tipo] += 1;
    }    
    
    // Finalmente evaluamos cual es el tipo mas predominante

    let selTipo = 0;
    for (let i=0;i<sets.length;i++) {
        if (selTipo < sel[i]) {
            selTipo = i;
        }
    }

    // Pusheamos al chart con knnData.datasets[x].data donde x es el tipo de dato (indice)
    sets[selTipo].push(spot)
    return [sets,selTipo]

}