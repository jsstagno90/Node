// Variables
const formulario = document.querySelector('#formlocal');
const listaTweet = document.querySelector('#lista-tweet');
let tweets = [];

// Ejecutar al cargar la página
eventListeners();

function eventListeners() {
    // Al enviar el formulario
    formulario.addEventListener('submit', agregarTweet);

    // Cuando carga el DOM, cargar desde localStorage
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        mostrarTweets();
    });
}

// Agrega el tweet
function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector('#tweetlocal').value.trim();

    if (tweet === '') {
        alert('El tweet no puede estar vacío');
        return;
    }

    // Crear objeto tweet con id único
    const tweetObj = {
        id: Date.now(),
        texto: tweet
    };

    // Agregar al array
    tweets.push(tweetObj);

    // Mostrar en pantalla
    mostrarTweets();

    // Guardar en localStorage
    sincronizarStorage();

    // Limpiar el textarea
    formulario.reset();
}

// Muestra los tweets
function mostrarTweets() {
    // Limpiar HTML anterior
    limpiarHTML();

    tweets.forEach(tweet => {
        const li = document.createElement('li');
        li.textContent = tweet.texto;
        li.classList.add('tweet');

        // Botón eliminar
        const btnEliminar = document.createElement('a');
        btnEliminar.textContent = ' X';
        btnEliminar.href = '#';
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.style.color = 'red';
        btnEliminar.style.marginLeft = '10px';

        // Acción eliminar
        btnEliminar.onclick = () => {
            borrarTweet(tweet.id);
        };

        li.appendChild(btnEliminar);
        listaTweet.appendChild(li);
    });
}

// Elimina un tweet por id
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    mostrarTweets();
    sincronizarStorage();
}

// Guarda en localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Limpia el contenido de la lista
function limpiarHTML() {
    while (listaTweet.firstChild) {
        listaTweet.removeChild(listaTweet.firstChild);
    }
}
