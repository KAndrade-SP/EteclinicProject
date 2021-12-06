import express from 'express';

//Importando rotas
import routes from './routes.js';

const app = express(); //Instanciando o express
app.use(express.json()); //Utilizando a função para poder trabalhar com JSON

app.use('/', routes); //Redireciona para o arquivo de rotas ao chegar na /

app.listen(3333, () => {
    console.log('Server Online')
});