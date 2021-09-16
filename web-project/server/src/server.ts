import express from 'express';
import routes from './routes';

//Instacio a aplicacao
const app = express();

//middleware
app.use(express.json()); //bodyparser

//routes
app.use(routes);

//levanta aplicacao
app.listen(3000, () => {
    console.log('Running in port 3000');

})
