'use strict';

const _API = new API('4ac0373a1dd266396217b550470888b44544f867c85c980aec407d4ef8385e36');

class Interfaz {

    // con las 2 siguientes lineas de código llenamos el select al cargar la página
    // ya que hay una instancia en el archivo app.js
    constructor() { this.init(); }

    init() { this.construirSelect(); }
    
    construirSelect() {

        _API.obtenerMonedasAPI()
        .then(resp => {

            // <select>
            const select = document.getElementById('criptomoneda');
            
            // asi recorremos un objeto
            for (const [key, value] of Object.entries(resp.Data)) {
                // añadir el Symbol y el nombre
                const opcion = document.createElement('option');
                opcion.value = value.Symbol;
                opcion.appendChild(document.createTextNode(value.CoinName));
                select.appendChild(opcion);
            }
        })
        .catch(err => console.log(err));
    }

    mostrarMensaje(mensaje, clase) {

        const div = document.createElement('div');
        div.className = clase;
        div.innerHTML = mensaje;
        
        const mensajes = document.querySelector('.mensajes');
        mensajes.appendChild(div);

        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    mostrarCotizacion(resultado, moneda, criptomoneda) {

        const resultadoAnterior = document.querySelector('#resultado > div');

        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const data = resultado[criptomoneda][moneda];
        let actualizado = new Date(data.LASTUPDATE * 1000).toLocaleDateString('es-MX');
        // construir el template
        let html = `
            <div class="card bg-warning">
                <div class="card-body text-light>
                    <h2 class="card-title">Resultado</h2>
                    <p>El precio de ${data.FROMSYMBOL} a moneda ${data.TOSYMBOL} es de: $${data.PRICE.toFixed(2)}</p>
                    <p>Variación del último día: ${data.CHANGEPCTDAY.toFixed(2)}%</p>
                    <p>Última actualización: ${actualizado}</p>
                </div>
            </div>
        `;

        this.mostrarSpinner('block');

        setTimeout(() => {
            
            document.getElementById('resultado').innerHTML = html;
            this.mostrarSpinner('none');
        }, 3000);
    }

    mostrarSpinner(view) {

        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = view;
    }
}
