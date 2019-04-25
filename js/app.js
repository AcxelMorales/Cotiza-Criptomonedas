'use strict';

const UI = new Interfaz();

// leer <form> para validar campos
const form = document.getElementById('formulario');

// agregamos el listener
form.addEventListener('submit', e => {

    e.preventDefault();

    // leemos los campos
    const moneda = document.getElementById('moneda');
    const monedaSelect = moneda.options[moneda.selectedIndex].value;
    
    const criptomoneda = document.getElementById('criptomoneda');
    const criptomonedaSelect = criptomoneda.options[criptomoneda.selectedIndex].value;

    // comprobar que no esten vacios
    if (monedaSelect === '' || criptomonedaSelect === '') {
        // arrojar un error
        UI.mostrarMensaje('LLena los campos adecuadamente', 'alert bg-danger text-center');
    } else {
        // consultar la api
        _API.obtenerMoneda(monedaSelect, criptomonedaSelect)
        .then(resp => UI.mostrarCotizacion(resp.RAW, monedaSelect, criptomonedaSelect))
        .catch(err => console.log(err));
    }
});