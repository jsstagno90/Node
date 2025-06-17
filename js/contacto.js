document.addEventListener('DOMContentLoaded', function () {

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    function validar(e) {
        // Eliminar alerta si el campo está correcto
        eliminarAlerta();

        if (e.target.value.trim() === '') {
            mostrarAlerta();
            e.target.style.borderColor = 'red';
        } else {
            console.log('TIENE CONTENIDO');
            e.target.style.borderColor = ''; // Limpia el borde si está correcto
        }
    }

    function mostrarAlerta() {
        // Verificar si ya hay un mensaje
        const alerta = document.querySelector('.error');
        if (!alerta) {
            const error = document.createElement('p');
            error.textContent = 'Complete todos los datos';
            error.classList.add('error');
            error.style.color = 'red';
            error.style.marginTop = '10px';
            formulario.appendChild(error);
        }
    }

    function eliminarAlerta() {
        const alerta = document.querySelector('.error');
        if (alerta) {
            alerta.remove();
        }
    }

});
