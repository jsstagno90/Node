//Variables
const resultado = document.querySelector('#resultado');
const marca = document.querySelector("#marca");
const modelo = document.querySelector("#modelo");
const year = document.querySelector("#year");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const precio = document.querySelector("#precio");
const color = document.querySelector("#color");


//Eventos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos() //muestra los autos

    llenarSelect()
})

//Funciones
function mostrarAutos (){
    autos.forEach(autos => {
        const {marca, modelo, year, puertas, transmision, precio, color } = autos;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
      ${marca}  ${year} - ${modelo} - Puertas: ${puertas} - ${transmision} - $${precio} - ${color}
        `


        //insertar en el html
        resultado.appendChild(autoHTML)
    })
}


// genera los años del select