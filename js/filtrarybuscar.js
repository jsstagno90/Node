
const resultado = document.querySelector("#resultado");
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const max = new Date().getFullYear();
const min = max - 10;


const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: ''
};


document.addEventListener('DOMContentLoaded', () => {
  llenarSelect();

});

marca.addEventListener('change', e => { 
  datosBusqueda.marca = e.target.value; 
  filtrarAuto(); 
});
year.addEventListener('change', e => { 
  datosBusqueda.year = parseInt(e.target.value) || ''; 
  filtrarAuto(); 
});
minimo.addEventListener('change', e => { 
  datosBusqueda.minimo = parseInt(e.target.value) || ''; 
  filtrarAuto(); 
});
maximo.addEventListener('change', e => { 
  datosBusqueda.maximo = parseInt(e.target.value) || ''; 
  filtrarAuto(); 
});
puertas.addEventListener('change', e => { 
  datosBusqueda.puertas = parseInt(e.target.value) || ''; 
  filtrarAuto(); 
});
transmision.addEventListener('change', e => { 
  datosBusqueda.transmision = e.target.value; 
  filtrarAuto(); 
});
color.addEventListener('change', e => { 
  datosBusqueda.color = e.target.value; 
  filtrarAuto(); 
});



function llenarSelect() {
  for(let i = max; i >= min; i--) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

function limpiarHTML() {
  while(resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function mostrarAutos(autos) {
  limpiarHTML();

  autos.forEach(auto => {
    const {marca, modelo, year, puertas, transmision, precio, color} = auto;
    const autoHTML = document.createElement('p');
    autoHTML.textContent = `${marca} ${year} - ${modelo} - Puertas: ${puertas} - ${transmision} - $${precio} - ${color}`;
    resultado.appendChild(autoHTML);
  });
}

function filtrarAuto() {
  const resultadoFiltrado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if(resultadoFiltrado.length) {
    mostrarAutos(resultadoFiltrado);
  } else {
    limpiarHTML();
    const noResultado = document.createElement('p');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
  }
}

function filtrarMarca(auto) {
  if(datosBusqueda.marca) return auto.marca === datosBusqueda.marca;
  return true;
}

function filtrarYear(auto) {
  if(datosBusqueda.year) return auto.year === datosBusqueda.year;
  return true;
}

function filtrarMinimo(auto) {
  if(datosBusqueda.minimo) return auto.precio >= datosBusqueda.minimo;
  return true;
}

function filtrarMaximo(auto) {
  if(datosBusqueda.maximo) return auto.precio <= datosBusqueda.maximo;
  return true;
}

function filtrarPuertas(auto) {
  if(datosBusqueda.puertas) return auto.puertas === datosBusqueda.puertas;
  return true;
}

function filtrarTransmision(auto) {
  if(datosBusqueda.transmision) return auto.transmision === datosBusqueda.transmision;
  return true;
}

function filtrarColor(auto) {
  if(datosBusqueda.color) return auto.color === datosBusqueda.color;
  return true;
}

function mostrarAutos(autos) {
  limpiarHTML();

  if (autos.length === 0) {
    const noResultado = document.createElement('p');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
    return;
  }


  const tabla = document.createElement('table');
  tabla.style.width = '100%';
  tabla.style.borderCollapse = 'collapse';


  const thead = document.createElement('thead');
  const encabezadoFila = document.createElement('tr');

  const columnas = ['Marca', 'Modelo', 'Año', 'Puertas', 'Transmisión', 'Precio', 'Color'];

  columnas.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    th.style.border = '1px solid black';
    th.style.padding = '8px';
    th.style.backgroundColor = '#f2f2f2';
    th.style.textAlign = 'left';
    encabezadoFila.appendChild(th);
  });

  thead.appendChild(encabezadoFila);
  tabla.appendChild(thead);


  const tbody = document.createElement('tbody');

  autos.forEach(auto => {
    const fila = document.createElement('tr');


    const marcaTd = document.createElement('td');
    marcaTd.textContent = auto.marca;
    marcaTd.style.border = '1px solid black';
    marcaTd.style.padding = '8px';

    const modeloTd = document.createElement('td');
    modeloTd.textContent = auto.modelo;
    modeloTd.style.border = '1px solid black';
    modeloTd.style.padding = '8px';

    const yearTd = document.createElement('td');
    yearTd.textContent = auto.year;
    yearTd.style.border = '1px solid black';
    yearTd.style.padding = '8px';

    const puertasTd = document.createElement('td');
    puertasTd.textContent = auto.puertas;
    puertasTd.style.border = '1px solid black';
    puertasTd.style.padding = '8px';

    const transmisionTd = document.createElement('td');
    transmisionTd.textContent = auto.transmision;
    transmisionTd.style.border = '1px solid black';
    transmisionTd.style.padding = '8px';

    const precioTd = document.createElement('td');
    precioTd.textContent = `$${auto.precio.toLocaleString()}`;
    precioTd.style.border = '1px solid black';
    precioTd.style.padding = '8px';

    const colorTd = document.createElement('td');
    colorTd.textContent = auto.color;
    colorTd.style.border = '1px solid black';
    colorTd.style.padding = '8px';

    // Añadir celdas a la fila
    fila.appendChild(marcaTd);
    fila.appendChild(modeloTd);
    fila.appendChild(yearTd);
    fila.appendChild(puertasTd);
    fila.appendChild(transmisionTd);
    fila.appendChild(precioTd);
    fila.appendChild(colorTd);

    tbody.appendChild(fila);
  });

  tabla.appendChild(tbody);
  resultado.appendChild(tabla);
}


const btnLimpiar = document.querySelector('#btn-limpiar');


btnLimpiar.addEventListener('click', () => {

  marca.value = '';
  year.value = '';
  minimo.value = '';
  maximo.value = '';
  puertas.value = '';
  transmision.value = '';
  color.value = '';


  datosBusqueda.marca = '';
  datosBusqueda.year = '';
  datosBusqueda.minimo = '';
  datosBusqueda.maximo = '';
  datosBusqueda.puertas = '';
  datosBusqueda.transmision = '';
  datosBusqueda.color = '';


  limpiarHTML();
});


function mostrarAutos(autos) {
  limpiarHTML();

  if (autos.length === 0) {
    const noResultado = document.createElement('p');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
    return;
  }

  const tabla = document.createElement('table');
  tabla.style.width = '100%';
  tabla.style.borderCollapse = 'collapse';

  const thead = document.createElement('thead');
  const encabezadoFila = document.createElement('tr');
  const columnas = ['Marca', 'Modelo', 'Año', 'Puertas', 'Transmisión', 'Precio', 'Color'];

  columnas.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    th.style.border = '1px solid black';
    th.style.padding = '8px';
    th.style.backgroundColor = '#f2f2f2';
    th.style.textAlign = 'left';
    encabezadoFila.appendChild(th);
  });

  thead.appendChild(encabezadoFila);
  tabla.appendChild(thead);

  const tbody = document.createElement('tbody');

  autos.forEach(auto => {
    const fila = document.createElement('tr');

    const marcaTd = document.createElement('td');
    marcaTd.textContent = auto.marca;
    marcaTd.style.border = '1px solid black';
    marcaTd.style.padding = '8px';

    const modeloTd = document.createElement('td');
    modeloTd.textContent = auto.modelo;
    modeloTd.style.border = '1px solid black';
    modeloTd.style.padding = '8px';

    const yearTd = document.createElement('td');
    yearTd.textContent = auto.year;
    yearTd.style.border = '1px solid black';
    yearTd.style.padding = '8px';

    const puertasTd = document.createElement('td');
    puertasTd.textContent = auto.puertas;
    puertasTd.style.border = '1px solid black';
    puertasTd.style.padding = '8px';

    const transmisionTd = document.createElement('td');
    transmisionTd.textContent = auto.transmision;
    transmisionTd.style.border = '1px solid black';
    transmisionTd.style.padding = '8px';

    const precioTd = document.createElement('td');
    precioTd.textContent = `$${auto.precio.toLocaleString()}`;
    precioTd.style.border = '1px solid black';
    precioTd.style.padding = '8px';

    const colorTd = document.createElement('td');
    colorTd.textContent = auto.color;
    colorTd.style.border = '1px solid black';
    colorTd.style.padding = '8px';

    fila.appendChild(marcaTd);
    fila.appendChild(modeloTd);
    fila.appendChild(yearTd);
    fila.appendChild(puertasTd);
    fila.appendChild(transmisionTd);
    fila.appendChild(precioTd);
    fila.appendChild(colorTd);

    tbody.appendChild(fila);
  });

  tabla.appendChild(tbody);
  resultado.appendChild(tabla);
}
