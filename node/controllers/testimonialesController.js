// controllers/testimonialesController.js

const guardarTestimonial = (req, res) => {
    // Desestructuramos req.body de manera segura
    const { nombre, correo, mensaje } = req.body || {};
    const errores = [];

    // Validación segura
    if (!nombre || nombre.trim() === '') errores.push({ mensaje: 'El nombre está vacío' });
    if (!correo || correo.trim() === '') errores.push({ mensaje: 'El correo está vacío' });
    if (!mensaje || mensaje.trim() === '') errores.push({ mensaje: 'El mensaje está vacío' });

    // Siempre imprimimos lo recibido y los errores en la terminal
    console.log('req.body ->', req.body);
    console.log('Errores ->', errores);

    if (errores.length > 0) {
        // Renderizamos la vista con los errores si faltan campos
        return res.render('testimoniales', { 
            pagina: 'Testimoniales', 
            errores, 
            nombre, 
            correo, 
            mensaje 
        });
    }

    // Si todo está completo
    console.log('Formulario recibido correctamente', req.body);

    // Renderizamos la vista con mensaje de éxito
    res.render('testimoniales', { 
        pagina: 'Testimoniales', 
        exito: '¡Gracias por enviar tu testimonial!' 
    });
};

export { guardarTestimonial };
