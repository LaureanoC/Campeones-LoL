var botonBuscar = document.querySelector("#boton-comparar");

botonBuscar.addEventListener("click", function(){

    var xhr = new XMLHttpRequest;
    xhr.open("GET","https://raw.githubusercontent.com/LaureanoC/Campeones-LoL/master/campeones/campeones.json");
    
    xhr.addEventListener("load",function(){
    
    var campeones = xhr.responseText;
    campeones = JSON.parse(campeones);
    console.log(campeones);
    console.log(campeones[0].nombre + " Con su frase: " + campeones[0].frases[0]);
    cambiarFrase(campeones,aleatorio(1));
 
    })
    
    xhr.send();

});


function aleatorio(n){

    var numero = Math.round((Math.random()*n));
    return numero;
}


function cambiarFrase(campeon,i,j){

        var parrafo = document.querySelector("#frase-campeon");
        
        parrafo.innerHTML = campeon[i].frases[j] ;
      
    
        
}



