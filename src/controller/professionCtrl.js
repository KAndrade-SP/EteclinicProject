import express from 'express';
import { body, validationResult } from 'express-validator'

import db from '../service/professionService.js'

const router = express.Router();

//------Métodos da tabela de profissões:
router.post('/', [
    body('name_profession').isLength({min: 1}).withMessage('Nome vazio'),
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    try {
        await db.insertProfession(req.body);
        res.status(201).send({message: 'Profissão cadastrada com sucesso!'});
        
    } catch(err) {
        res.status(500).send({message: `Houve um erro ao cadastrar. ${err}`});
    }

});

router.put('/', [
    body('name_profession').isLength({min: 1}).withMessage('Nome vazio'),
], async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    try {
        await db.updateProfession(req.body);
        res.status(201).send({message: 'Profissão atualizada com sucesso!'});
        
    } catch(err) {
        res.status(500).send({message: `Houve um erro ao atualizar. ${err}`});
    }
});

router.delete('/:name_profession', [], async (req, res) => {
    try {
        await db.deleteProfession(req.params);
        res.status(201).send({message: 'Profissão desativada com sucesso!'});
        
    } catch(err) {
        res.status(500).send({message: `Houve um erro ao desativar. ${err}`});
    }
});

export default router;