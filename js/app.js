const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListener();
function cargarEventListener() {
    listaCursos.addEventListener('click', agregarCurso);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
        actualizarContadorCarrito();
        localStorage.removeItem('carrito');
    });

    carrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });
}



// funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    };

    // Verificar si ya existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    
    if (existe) {
        articulosCarrito = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}




// Elimina los cursos del tbody (antes de volver a pintar)
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

 
}

   function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Filtra los que no coincidan con el ID para "eliminar"
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); // Vuelve a mostrar el carrito actualizado
        sincronizarStorage();
    }
}

function carritoHTML() {
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" width="100"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td><span class="cantidad-valor">${curso.cantidad}</span></td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}"> X </a></td>
        `;
        contenedorCarrito.appendChild(row);
    });

    actualizarContadorCarrito(); // <-- Agregá esta línea
    sincronizarStorage();
}

function actualizarContadorCarrito() {
    const contador = document.querySelector('#contador-carrito');
    const totalCantidad = articulosCarrito.reduce((total, curso) => total + curso.cantidad, 0);
    contador.textContent = totalCantidad;
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}