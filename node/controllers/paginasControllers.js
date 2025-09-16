import {viaje} from '../models/Viaje.js'

const paginaInicio = (req, res) => {
    res.render('inicio', {
        pagina : 'Inicio'
    })
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}

const paginaTestimoniales = (req, res) => {
    res.render('testimoniales', {
        pagina: 'Testimoniales'
    })
}


const paginaViajes = async(req, res) => {
    // Consultar BD
    const viajes = await viaje.findAll(); // <- aquí usamos await
    console.log(viajes); // ahora sí ves los datos
    res.render('viajes', {
        pagina: 'Proximos viajes',
        viajes,
    });
}

const paginaDetalleViaje = async (req, res) =>{
    const { viaje: slug } = req.params;

    try {
        const resultado   = await viaje.findOne({where : {slug}});

        res.render('Viaje',{
            pagina: 'Informacion de viaje',
            resultado ,
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