'use strict';

class API {

    constructor(apikey) {
        
        this.apikey = apikey;
    }

    // obtener todas las monedas
    async obtenerMonedasAPI() {

        // URL
        const URL = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;
        
        // fetch a la API
        const urlObtenerMonedas = await fetch(URL);

        // respuesta en json y la retornamos
        const monedas = await urlObtenerMonedas.json();
        return monedas;
    }

    async obtenerMoneda(moneda, criptomoneda) {

        const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apikey}`;

        // consultar el rest api
        const urlConvertida = await fetch(URL);

        // respuesta en json
        const resultado = await urlConvertida.json();
        return resultado;
    }
}