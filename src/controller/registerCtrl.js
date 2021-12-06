import express from 'express';
import { body, validationResult } from 'express-validator'
 
import db from '../service/registerService.js'

const router = express.Router();

//------Métodos da tabela de usuários:

//Essa / significa qualquer coisa que já estiver dentro do /register definido nas routes.
router.post('/', [
    body('email').isEmail().withMessage('Informe um e-mail válido'),
    body('password').isLength({min: 8, max: 15}).withMessage('Informe uma senha com no mínimo 8 caracteres.'), 
    body('password').isNumeric().withMessage('A senha deve ser numérica'),
    body('userName').custom((userName) => {
        if(userName != 'Jubileu') {
            return Promise.reject('Nome de usuário inválido');
        }
        return true;
    })
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    //Para cadastrar informe e-mail, senha e nome de usuário.
    const {email, password, userName} = req.body;  

    try {
        const userEmailDB = await db.checkEmail(email);

        if (userEmailDB.length > 0) return res.status(400).send({message: 'E-mail já cadastrado no sistema'});

        await db.insertUser(email, password, userName); //Passando para registerCtrl, uma props
        res.status(201).send({message: 'Usuário cadastrado com sucesso!'});
        
    } catch(err) {
        res.status(500).send({message: `Houve um erro ao cadastrar. ${err}`});
    }

});

router.put('/', async (req, res) => {
    
    const {email, password, userName} = req.body;  

    try {
        await db.updateUser(email, password, userName);
        res.status(201).send({message: 'Usuário atualizado com sucesso!'});
        
    } catch(err) {
        res.status(500).send({message: `Houve um erro ao atualizar. ${err}`});
    }
});

export default router;