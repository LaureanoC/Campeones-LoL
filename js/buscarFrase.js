var xhr = new XMLHttpRequest;
var TotalCampeones = 31-1; // Total - 1   ->  11 KowMaw
var TotalFrases = 4-1; //Total -1 para las frases
var puntajeAcertado = 0;
var puntajeErrado = -1;   

xhr.open("GET","https://raw.githubusercontent.com/LaureanoC/Campeones-LoL/master/campeones/campeones.json");
    
xhr.addEventListener("load",function(){
    
    var campeones = xhr.responseText;
    console.log(typeof campeones);
    console.log(campeones);
    campeones = JSON.parse(campeones);
    console.log(campeones); 

// Ya cargué todos los objetos compeones



//Cambio de frase al hacer click en "Siguiente"

    var botonBuscar = document.querySelector("#boton-comparar");
    botonBuscar.addEventListener("click", function(){
    var posicionCampeon = aleatorio(TotalCampeones);  // De campeones
    var posicionFrase= aleatorio(TotalFrases);                // Cantidad de frases
    cambiarFraseActual(campeones,posicionCampeon,posicionFrase);
    cambiarNombreBoton(campeones,posicionCampeon, posicionFrase);

    });


    //Escoger la opcion correcta

    var botones = document.querySelector(".container-boton");

    botones.addEventListener("click",function(event){

    var botonOpcion = document.querySelectorAll("#boton-campeon");
    

    console.log(this.textContent);

    opciones = devolverOpcionActual();

    var fraseActual = devolverFraseActual();
    
    var nombre = buscarFraseConNombre(fraseActual,campeones);

    console.log(botonOpcion[0]);
    console.log(botonOpcion[0].textContent);
    console.log("Esta es la frase actual: " + fraseActual + "  " + nombre);
    console.log(event.target.textContent);

   

    if(event.target.textContent == nombre){

    console.log("Has acertado");
    puntajeAcertado = sumarContador(puntajeAcertado);
    var posicionCampeon = aleatorio(TotalCampeones);  // De campeones
    var posicionFrase= aleatorio(TotalFrases);                // Cantidad de frases
    cambiarFraseActual(campeones,posicionCampeon,posicionFrase);
    cambiarNombreBoton(campeones,posicionCampeon, posicionFrase);

    }
    else {

    puntajeErrado = sumarErrados(puntajeErrado);

    }


    console.log(opciones);


});


});

xhr.send();


function sumarErrados(puntajeErrado){

    puntajeErrado = puntajeErrado + 1; 
    var puntoErrado = document.querySelector(".puntoErrado");
    puntoErrado.innerHTML = ("Errados:  " + puntajeErrado);
    return puntajeErrado


}

function sumarContador(puntajeAcertado){

    puntajeAcertado = puntajeAcertado + 1; 
    var puntoAcertado = document.querySelector(".puntoAcertado");
    puntoAcertado.innerHTML = ("Acertados:  " + puntajeAcertado);
    return puntajeAcertado


}

//Esta funcion primero para cada campeon itera todas sus frases y la compara con al frase actual

function buscarFraseConNombre(fraseActual,campeon){

    for(i=0;i<campeon.length;i++){

        for(j=0; j<campeon[i].frases.length; j++){

            console.log("Nombre: " + campeon[i].nombre + " frase: " + campeon[i].frases[j]);
            
            if(campeon[i].frases[j] == fraseActual){

                console.log("ACA ESTA LA FRASE ACTUAL: " + campeon[i].frases[j]);
                
                return campeon[i].nombre;

            }

        }

    }
    
}

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
    console.log(nombreCampeon);

    console.log(opciones);

    opciones = devolverArrayDeTres(opciones, nombreCampeon);

    for (i=0; i<botones.length; i++){

        botones[i].innerHTML = opciones[i];
        
    }

}

