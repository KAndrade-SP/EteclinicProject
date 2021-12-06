import express from 'express';
import multer from 'multer';

import multerConfig from '../middlewares/multer.js'
//import db from '../service/professionService.js'

const router = express.Router();

//------Métodos da tabela de imagens:
router.post('/', multer(multerConfig).single('file'), async (req, res) => {

    const localFile = req.file.path;
    console.log(localFile);

    try {
        res.status(201).send({message: 'Rota de imagens acessada!'});
        
    } catch(err) {
        res.status(500).send({message: `Houve um erro ao acessar. ${err}`});
    }

});

export default router;