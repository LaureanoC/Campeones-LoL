var botonBuscar = document.querySelector("#boton-comparar");

botonBuscar.addEventListener("click", function(){

    var xhr = new XMLHttpRequest;
    xhr.open("GET","https://raw.githubusercontent.com/LaureanoC/Campeones-LoL/master/campeones/campeones.json");
    
    xhr.addEventListener("load",function(){
    
    console.log(xhr.responseText);
    var campeones = xhr.responseText;
    campeones = JSON.parse(campeones);
    console.log(campeones);
    
    
    })
    
    xhr.send();
});