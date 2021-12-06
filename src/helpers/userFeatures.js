import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { config } from './smtp.js'

const transport = nodemailer.createTransport(config);

function generatedPassword() {

    const key = (Math.random() + 1).toString(36).substring(2);
    const newPasswd = key
    .replace('n', '@')
    .replace('w', '!')
    .replace('i', '#')
    .replace('t', '$')
    .replace('a', '*')

    return newPasswd;
};

function generatedToken(id_login, usuario) {

    const secret = '$dinheiro$';

    return jwt.sign({infoUser: {
        id_login, 
        usuario
    }}, secret, {expiresIn: 60 * 60 * 5});
};

function sendEmail(email, name, password) {

    transport.sendMail({
        subject: 'Redefinição de senha - Eteclinic',
        from: 'Suporte Eteclinic <eteclinic@gmail.com>',
        to:  email,
        html: 
        `
            <html>
                <body>
                    <p>Olá, ${name}! Tudo bem?</p>
                    <br>
                    <p>Você solicitou uma redefinição de senha para acesso ao nosso site.</p>
                    <br>
                    <p>Sua nova senha é: <strong>${password}</strong></p>
                </body
            </html>
        `
    })
}

export {generatedPassword , generatedToken, sendEmail}; //Exportação nomeada