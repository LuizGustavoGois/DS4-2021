import express from 'express';
import { createConnection } from 'typeorm';
import routes from './routes';

import dotenv from 'dotenv';

//carrega variaveis de ambiente
dotenv.config();

//pega a porta de variavel de ambiente
const PORT = process.env.PORT || 3000;

//Instacio a aplicacao
const app = express();

//middleware
app.use(express.json()); //bodyparser

//routes
app.use(routes);


createConnection().then(connection => {

    //levanta aplicacao
    app.listen(PORT, () => {
        console.log(`Running in port ${PORT}`);
    })

}).catch(error => {
    console.log('Ops', error);
})
