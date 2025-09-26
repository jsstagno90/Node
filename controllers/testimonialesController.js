import { Testimoniales } from '../models/testimoniales.js';

const guardarTestimonial = async (req, res) => {
    const { nombre, correo, mensaje } = req.body || {};
    const errores = [];

    // Validación de campos
    if (!nombre || nombre.trim() === '') errores.push({ mensaje: 'El nombre está vacío' });
    if (!correo || correo.trim() === '') errores.push({ mensaje: 'El correo está vacío' });
    if (!mensaje || mensaje.trim() === '') errores.push({ mensaje: 'El mensaje está vacío' });

    console.log('req.body ->', req.body);
    console.log('Errores ->', errores);

    // Si hay errores, renderizamos la vista con los errores
    if (errores.length > 0) {
        return res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje
        });
    } else {
        try {
            await Testimoniales.create({ nombre, correo, mensaje });
            console.log('Formulario guardado correctamente');
        } catch (error) {
            console.log('Error al guardar el testimonial:', error);
            return res.render('testimoniales', {
                pagina: 'Testimoniales',
                errores: [{ mensaje: 'Ocurrió un error al guardar el testimonial.' }],
                nombre,
                correo,
                mensaje
            });

        }

        // Guardamos el testimonial en la base de datos

    }

    // Redirigimos con query para mostrar mensaje de éxito sin reenvío de formulario
    res.redirect('/testimoniales?exito=1');
}

    export { guardarTestimonial };
