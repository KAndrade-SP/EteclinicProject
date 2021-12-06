import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next) {

    const secret = '$dinheiro$'

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({message: 'Token não informado'});
    }

    const parts = authHeader.split(' ');
    if (parts.length != 2) {
        return res.status(401).send({message: 'Token inválido'});
    }

    const [scheme, token] = parts;

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: 'Usuário não autenticado no sistema'});
        }

        return next();
    });
    
}

export {verifyJWT};