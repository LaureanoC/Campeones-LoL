var botonBuscar = document.querySelector("#boton-comparar");
const TotalCampeones = 4-1; //Total - 1 para los arrays
const TotalFrases = 2-1; //Total -1 para las frases
botonBuscar.addEventListener("click", function(){

    var xhr = new XMLHttpRequest;
    xhr.open("GET","https://raw.githubusercontent.com/LaureanoC/Campeones-LoL/master/campeones/campeones.json");
    
    xhr.addEventListener("load",function(){
    
    var campeones = xhr.responseText; 
    campeones = JSON.parse(campeones);
    

    var posicionCampeon = aleatorio(TotalCampeones);  // De campeones
    var posicionFrase= aleatorio(1);                // Cantidad de frases
    

    posicionarAleatoriamente(campeones);
    devolverFraseActual();
    cambiarFraseActual(campeones,posicionCampeon,posicionFrase);
    cambiarNombreBoton(campeones,posicionCampeon, posicionFrase);
 
    })
    
    xhr.send();

});

function aleatorio(n){

    return Math.round(Math.random()*n);

}

function posicionarAleatoriamente(campeones){

    var lista = [];
    for(i=0; i<=TotalCampeones; i++){

        lista.push(campeones[i].nombre);

    }
//Me desordena la lista.
    lista = lista.sort(function(){
        return Math.random() - 0.5
    })

    return lista;

}

function cambiarFraseActual(campeones,pcamp,pfrase){

    var parrafo = document.querySelector("#frase-campeon");

    var fraseActual = devolverFraseActual();
    console.log("Frase actual: " + fraseActual);
    var fraseSiguiente = campeones[pcamp].frases[pfrase];


    if(fraseActual != fraseSiguiente){
        console.log("Son diferentes -> " + fraseActual + "  " + fraseSiguiente);
        parrafo.innerHTML = fraseSiguiente;
        
    }
    else {
        console.log("Son iguales -> "+ fraseActual + " " + fraseSiguiente);
        fraseSiguiente = cambiarFraseActual(campeones,pcamp,aleatorio(TotalFrases));
    }

}

function devolverFraseActual(){

    var parrafo = document.querySelector("#frase-campeon");
    return parrafo.innerHTML

}

function devolverArrayDeTres(opciones,opcionCorrecta){

    if(opciones.indexOf(opcionCorrecta)>=4){

        opciones = opciones.slice(0,3);
        opciones.push(opcionCorrecta);
        console.log(opciones);
        return opciones;
    }
    else {

        return opciones;
    }

}

function cambiarNombreBoton(campeones,pcamp,pfrase){

    botones = document.querySelectorAll("#boton-campeon");


    var fraseCampeon = campeones[pcamp].frases[pfrase];
    var nombreCampeon = campeones[pcamp].nombre;

    console.log(campeones[pcamp].nombre + ": " + fraseCampeon);

    opciones = posicionarAleatoriamente(campeones);

    console.log(opciones.indexOf(nombreCampeon));

    console.log(opciones);

    opciones = devolverArrayDeTres(opciones, nombreCampeon);

    for (i=0; i<botones.length; i++){

        botones[i].innerHTML = opciones[i];
        
    }

}

