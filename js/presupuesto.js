class Presupuesto {
  #presupuesto;
  #restante;

  constructor(monto) {
    this.#presupuesto = Number(monto);
    this.#restante = Number(monto);
  }

  get presupuesto() {
    return this.#presupuesto;
  }

  get restante() {
    return this.#restante;
  }

  set presupuesto(valor) {
    this.#presupuesto = Number(valor);
  }

  set restante(valor) {
    this.#restante = Number(valor);
  }

  restarGasto(cantidad) {
    this.#restante -= Number(cantidad);
  }

  sumarGasto(cantidad) {
    this.#restante += Number(cantidad);
  }
}

const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
const totalSpan = document.querySelector('#total');
const restanteSpan = document.querySelector('#restante');

let presupuesto;
let gastos = [];

document.addEventListener('DOMContentLoaded', function() {
  cargarDatos();

  if (!presupuesto) {
    pedirPresupuesto();
  } else {
    actualizarPresupuestoDOM();
    mostrarGastos();
  }

  formulario.addEventListener('submit', agregarGasto);
  crearBotonCambiarPresupuesto();
});

function pedirPresupuesto() {
  let presupuestoUsuario;

  do {
    presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');
    if (presupuestoUsuario === null) {
      window.location.reload();
    }
  } while (!presupuestoUsuario || isNaN(presupuestoUsuario) || Number(presupuestoUsuario) <= 0);

  presupuesto = new Presupuesto(presupuestoUsuario);
  gastos = [];

  guardarDatos();
  actualizarPresupuestoDOM();
}

function crearBotonCambiarPresupuesto() {
  const btnCambiarPresupuesto = document.createElement('button');
  btnCambiarPresupuesto.textContent = 'Cambiar presupuesto';
  btnCambiarPresupuesto.style.margin = '15px 0';
  btnCambiarPresupuesto.style.padding = '10px 15px';
  btnCambiarPresupuesto.style.cursor = 'pointer';

  formulario.parentElement.insertBefore(btnCambiarPresupuesto, formulario);

  btnCambiarPresupuesto.addEventListener('click', () => {
    const nuevoPresupuesto = prompt('Ingresa el nuevo presupuesto:');

    if (!nuevoPresupuesto || isNaN(nuevoPresupuesto) || Number(nuevoPresupuesto) <= 0) {
      alert('Presupuesto inválido.');
      return;
    }

    presupuesto.presupuesto = Number(nuevoPresupuesto);
    presupuesto.restante = Number(nuevoPresupuesto);
    gastos = [];

    guardarDatos();
    actualizarPresupuestoDOM();
    mostrarGastos();
    formulario.reset();
  });
}

function actualizarPresupuestoDOM() {
  totalSpan.textContent = presupuesto.presupuesto.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  restanteSpan.textContent = presupuesto.restante.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (presupuesto.restante < 0) {
    restanteSpan.style.color = 'red';
  } else {
    restanteSpan.style.color = 'green';
  }
}

function agregarGasto(e) {
  e.preventDefault();

  const nombreGasto = document.querySelector('#gasto').value.trim();
  const precioStr = document.querySelector('#cantidad').value.trim();
  const unidadesStr = document.querySelector('#cantidad-unidades')?.value.trim() || '1';

  if (nombreGasto === '' || precioStr === '' || isNaN(precioStr) || Number(precioStr) <= 0) {
    alert('Por favor ingresa un nombre y un precio válido.');
    return;
  }

  let unidades = Number(unidadesStr);
  if (isNaN(unidades) || unidades <= 0) {
    unidades = 1;
  }

  const precioUnitario = Number(precioStr);
  const total = precioUnitario * unidades;

  const gasto = {
    id: Date.now(),
    nombre: nombreGasto,
    precioUnitario,
    unidades,
    total
  };

  gastos.push(gasto);
  presupuesto.restarGasto(total);
  guardarDatos();
  actualizarPresupuestoDOM();
  mostrarGastos();
  formulario.reset();
}

function mostrarGastos() {
  gastoListado.innerHTML = '';

  gastos.forEach(gasto => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${gasto.nombre}</strong> - 
      ${gasto.unidades} unidad${gasto.unidades > 1 ? 'es' : ''} × 
      $${gasto.precioUnitario.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} = 
      <strong>$${gasto.total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
    `;

    const btnBorrar = document.createElement('button');
    btnBorrar.textContent = 'X';
    btnBorrar.style.marginLeft = '10px';
    btnBorrar.style.backgroundColor = '#e74c3c';
    btnBorrar.style.color = 'white';
    btnBorrar.style.border = 'none';
    btnBorrar.style.borderRadius = '3px';
    btnBorrar.style.cursor = 'pointer';
    btnBorrar.style.height = '20px';
    btnBorrar.style.padding = '2px 6px';
    btnBorrar.style.lineHeight = '16px';
    btnBorrar.style.fontSize = '12px';

    btnBorrar.onclick = () => borrarGasto(gasto.id);

    li.appendChild(btnBorrar);
    gastoListado.appendChild(li);
  });
}

function borrarGasto(id) {
  const gastoIndex = gastos.findIndex(g => g.id === id);
  if (gastoIndex !== -1) {
    presupuesto.sumarGasto(gastos[gastoIndex].total);
    gastos.splice(gastoIndex, 1);

    guardarDatos();
    actualizarPresupuestoDOM();
    mostrarGastos();
  }
}

function guardarDatos() {
  localStorage.setItem('presupuesto', JSON.stringify({
    presupuesto: presupuesto.presupuesto,
    restante: presupuesto.restante
  }));
  localStorage.setItem('gastos', JSON.stringify(gastos));
}

function cargarDatos() {
  const presuGuardado = localStorage.getItem('presupuesto');
  const gastosGuardados = localStorage.getItem('gastos');

  if (presuGuardado) {
    const objPresu = JSON.parse(presuGuardado);
    presupuesto = new Presupuesto(objPresu.presupuesto);
    presupuesto.restante = objPresu.restante;
  } else {
    presupuesto = null;
  }

  gastos = gastosGuardados ? JSON.parse(gastosGuardados) : [];
}
