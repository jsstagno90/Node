import express from 'express';

const router = express.Router();

router.get('/inicio',(req, res) => {
    res.render('inicio')
})


router.get('/nosotros',(req, res) => {

    const viajes = "Viaje a alemania"


    res.render('nosotros', {
       viajes
    })
})





export default router;