import { viaje } from '../models/Viaje.js'
import { Testimoniales } from '../models/testimoniales.js'

const paginaInicio = async (req, res) => {

    // consultar 3 viajes del modelo viaje
    const promiseDB = [];

    promiseDB.push(viaje.findAll({ limit: 6 }));
    promiseDB.push(Testimoniales.findAll({ limit: 6 }));
    try {
        const resultado = await Promise.all(promiseDB)
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
    } catch (error) {
        console.log(error)
    }

}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}

const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimoniales.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaViajes = async (req, res) => {
    // Consultar BD
    const viajes = await viaje.findAll(); // <- aquí usamos await
    console.log(viajes); // ahora sí ves los datos
    res.render('viajes', {
        pagina: 'Proximos viajes',
        viajes,
    });
}

const paginaDetalleViaje = async (req, res) => {
    const { viaje: slug } = req.params;

    try {
        const resultado = await viaje.findOne({ where: { slug } });

        res.render('Viaje', {
            pagina: 'Informacion de viaje',
            resultado,
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaTestimoniales,
    paginaViajes,
    paginaDetalleViaje
}