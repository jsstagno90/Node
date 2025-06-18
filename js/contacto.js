document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnEnviar = document.querySelector('#btnEnviar');

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    function validar(e) {
        eliminarAlerta(e.target);

        // Validar que no esté vacío
        if (e.target.value.trim() === '') {
            mostrarAlerta(e.target, 'Este campo es obligatorio');
            e.target.style.borderColor = 'red';
            return;
        }

        // Validar el email con regex
        if (e.target.id === 'email' && !esEmailValido(e.target.value)) {
            mostrarAlerta(e.target, 'Email no válido');
            e.target.style.borderColor = 'red';
            return;
        }

        e.target.style.borderColor = ''; // Está todo bien

        // Guardar el valor en el objeto email
        email[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(email); // para debug
        
           // Guardar el valor en el objeto email
    email[e.target.name] = e.target.value.trim().toLowerCase();
    console.log(email); // para debug

    comprobarCampos(); // 🔥 Acá llamás a la función que habilita el botón
    }

    function esEmailValido(valor) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(valor);
    }

    function mostrarAlerta(input, mensaje) {
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('error');
        error.style.color = 'red';
        error.style.fontSize = '12cpx';
        error.style.marginTop = '5px';
        input.parentElement.appendChild(error);
    }

    function eliminarAlerta(input) {
        const alerta = input.parentElement.querySelector('.error');
        if (alerta) {
            alerta.remove();
        }
    }

    function comprobarCampos() {
    if (email.email !== '' && email.asunto !== '' && email.mensaje !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('opacity-50');
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('opacity-50');
    }
}

});
