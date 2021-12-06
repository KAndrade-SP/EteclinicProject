import express from 'express';

import db from '../service/loginService.js'
import { generatedPassword, generatedToken, sendEmail } from '../helpers/userFeatures.js';

const router = express.Router();

router.post('/', async (req, res) => {  

    const {userEmail, password} = req.body;

    try {

        const userFind = await db.login(userEmail, password);

        if (userFind.length > 0) {
        
            const {id_login, usuario} = userFind[0]
            const token = generatedToken(id_login, usuario);

            res.status(200).send({message: 'Login efetuado com sucesso!', token});

        } else {
            res.status(401).send({message: 'Login incorreto'})
        }
    
    } catch(err) {
        res.status(500).send({message: 'Internal Server Error'});
    } 

});

router.post('/reset', async (req, res) => {

    const {userEmail} = req.body;
    const newPasswd = generatedPassword();

    try {

        await db.changePassword(newPasswd, userEmail);

        sendEmail(userEmail, 'João', newPasswd);

        res.status(200).send({message: 'Senha alterada com sucesso, cheque seu e-mail.'});
        
    } catch(err) {
        res.status(500).send({message: 'Internal Server Error'});
    }
   
});

export default router;