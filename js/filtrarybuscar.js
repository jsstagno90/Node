//Variables
const resultado = document.querySelector('#resultado');

//Eventos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos()
})

//Funciones
function mostrarAutos (){
    autos.forEach(autos => {
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
          ${autos.marca}  
        `


        //insertar en el html
        resultado.appendChild(autoHTML)
    })
}