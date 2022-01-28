
function devolverOpcionActual(){
var opcionesBoton = document.querySelectorAll("#boton-campeon");

var opcion = [];
for (i=0; i<opcionesBoton.length; i++){

    opcion.push(opcionesBoton[i].textContent);

}

return opcion
}