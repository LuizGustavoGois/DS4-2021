import { Router } from 'express';
import AuthController from './src/controllers/AuthController';

const routes = Router();

//AUTH
routes.use('/auth')
    .post('/signup', AuthController.create)
    .post('signin', AuthController.validate);
    


export default routes;

