/*
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Juego de adivina el numero'        Aqui seleccionamos a un elemento/etiqueta                                               del html, para inlcuirle un texto.

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Inserta un numero del 1 al 10';
*/
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosGenerados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento,texto){ //Esta funcion fue creada desde el documento JS
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() { //Aqui declaramos una funcion, que fue creada en el HTML.
    let intentoUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (intentoUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el numero secreto en ${intentos} ${(intentos == 1) ? "intento" : "intentos"}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (intentoUsuario > numeroSecreto) {
            asignarTextoElemento('p','El numero secreto es menor.');
        } else {
            asignarTextoElemento('p','El numero secreto es mayor.');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.getElementById('valorUsuario').value = '';
    return;
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    //Si ya se generaron todos los numeros entonces se reinicia el juego
    if (listaNumerosGenerados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se llego al numero maximo');
        document.getElementById('intentar').setAttribute('disabled',true);
        document.getElementById('valorUsuario').setAttribute('disabled',true);
    } else {
        //si el numero generado ya esta en la lista
        if (listaNumerosGenerados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        }else {
            listaNumerosGenerados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego de adivina el numero.');
    asignarTextoElemento('p', `Inserta un numero del 1 al ${numeroMaximo}.`);
    numeroSecreto = generarNumeroSecreto()
    intentos = 1;
}

function reiniciarJuego() {
    //Limpiar caja
    limpiarCaja();
    //Reiniciar el mensaje inicial de intervalos
    //Generar nuevamente el numero aleatorio
    //Reiniciar el contador
    condicionesIniciales();
    //Deshabilitar el boton de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

condicionesIniciales();