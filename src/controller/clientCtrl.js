import express from 'express';
import { body, validationResult } from 'express-validator'
import { cpf } from 'cpf-cnpj-validator'

import db from '../service/clientService.js'

const router = express.Router();

//------Métodos da tabela de clientes:
router.post('/', [
    body('zip_code').isLength({min: 8, max: 8}).withMessage('CEP inválido'),
    body('zip_code').isNumeric().withMessage('Insira um valor numérico de CEP'),
    body('street').isLength({min: 1}).withMessage('Endereço vazio'),
    body('number').isLength({min: 1}).withMessage('Número de endereço vazio'),
    body('district').isLength({min: 1}).withMessage('Bairro vazio'),
    body('city').isLength({min: 1}).withMessage('Cidade vazia'),
    body('clientName').isLength({min: 1}).withMessage('Nome vazio'),
    body('clientEmail').isEmail().withMessage('Insira um e-mail válido'),
    body('state').custom((state) => {
        const stateAllow = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 
        'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'];

        if (!stateAllow.includes(state)) {
            return Promise.reject('UF informado inválido.');
        }
        return true;
    }),
    body('cpf').custom((cpfInput) => {
        const checkCPF = cpf.isValid(cpfInput);

        if (!checkCPF) {
            return Promise.reject('CPF informado inválido.');
        }
        return true;
    })
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    try {
        await db.insertClient(req.body);
        res.status(201).send({message: 'Cliente cadastrado com sucesso!'});
        
    } catch(err) {
        res.status(500).send({message: `Houve um erro ao cadastrar. ${err}`});
    }
});

//Método de atualização de dados de cliente
router.put('/', [
    body('zip_code').isLength({min: 8, max: 8}).withMessage('CEP inválido'),
    body('zip_code').isNumeric().withMessage('Insira um valor numérico de CEP'),
    body('street').isLength({min: 1}).withMessage('Endereço vazio'),
    body('number').isLength({min: 1}).withMessage('Número de endereço vazio'),
    body('district').isLength({min: 1}).withMessage('Bairro vazio'),
    body('city').isLength({min: 1}).withMessage('Cidade vazia'),
    body('clientName').isLength({min: 1}).withMessage('Nome vazio'),
    body('clientEmail').isEmail().withMessage('Insira um e-mail válido'),
    body('state').custom((state) => {
        const stateAllow = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 
        'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'];

        if (!stateAllow.includes(state)) {
            return Promise.reject('UF informado inválido.');
        }
        return true;
    }),
    body('cpf').custom((cpfInput) => {
        const checkCPF = cpf.isValid(cpfInput);

        if (!checkCPF) {
            return Promise.reject('CPF informado inválido.');
        }
        return true;
    })
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    try {
        await db.updateClient(req.body);
        res.status(201).send({message: 'Cliente atualizado com sucesso!'});
        
    } catch(err) {
        res.status(500).send({message: `Houve um erro ao atualizar. ${err}`});
    }
});

//Método de desativação de dados de cliente
router.delete('/:cpf', [], async (req, res) => {
    try {
        await db.deleteClient(req.params);
        res.status(201).send({message: 'Cliente desativado com sucesso!'});
        
    } catch(err) {
        res.status(500).send({message: `Houve um erro ao desativar. ${err}`});
    }
});

export default router;