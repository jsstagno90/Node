console.log('Iniciando servidor...');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();
const port = process.env.PORT || 4000;


// conectar a base de datos
db.authenticate()
    .then(( ) => console.log('CONECTADO A BASE DE DATOS YES YES'))
    .catch(error => console.log('NO SE CONECTO LPM',error))


//habilitar BUG
app.set('view engine', 'pug');

//Obtener el a;o actual 
app.use((req, res, next)=> {
    const year = new Date();
    res.locals.actualYears = year.getFullYear(); 
    res.locals.nombresitio = 'Agencia de viajes' 
    next();
});

// Definir carpeta publica
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));

//Agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});
