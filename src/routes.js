import express from 'express';

import register from './controller/registerCtrl.js'
import client from './controller/clientCtrl.js'
import login from './controller/loginCtrl.js';
import profession from './controller/professionCtrl.js'
import specialist from './controller/specialistCtrl.js'
import image from './controller/imageCtrl.js'

const router = express.Router();

router.use('/login', login);
router.use('/register', register);
router.use('/client', client)
router.use('/profession', profession);
router.use('/specialist', specialist);
router.use('/image', image);

//Tratamento de erro 404
router.use('/*', (req, res) => {
    res.status(404).send({message: 'Caminho não encontrado!'});
});

export default router;