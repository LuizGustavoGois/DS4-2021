import { Router } from 'express';
import AuthController from './controllers/AuthController';

const routes = Router();

//AUTH
routes
    .post('/auth/signup', AuthController.create)
    .post('/auth/signin', AuthController.validate);
    


export default routes;

