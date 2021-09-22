import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { sign } from 'jsonwebtoken';


require('dotenv').config();


class AuthController {

    public async create(request: Request, response: Response) {

        try {

            //Instancia um repository da classe User 
            const repository = getRepository(User);

            //Cria uma instancia de user a partir do json request.body
            const user = repository.create(request.body);

            //Insiro a instacia criada no banco 
            const created = await repository.save(user);

            //Retorno o objeto inserido 
            return response.status(201).json (created);
           
        } catch (error) {
            return response.json(error);
        }
    }

    public async validate(request: Request, response: Response){

        try {

            //To-do pegar ussuario e senha do request body
            const {username, password} = request.body;

            //Instacio repository da classe User
            const repository = getRepository(User);

            //To-do validar o usuario
            let foundUser = await repository.findOne({email: username}); //select * from user where email = 'xpto'

            //To-do se inválido, devolver "usuario invalido"
            if (!foundUser) {
                return response.status(403).json({message: 'auth-invalid-user'})   
            }

            //To-do validar a senha / Se senha invalida responder 'senha invalida'
            if (foundUser.password != password) {
                return response.status(403).json({message: 'auth-invalid-password'})  
            }

            //To-do Se usuario e senha corretor "devolver um token"  (JWT)
            const payload = {user: foundUser};
            const cryptoKey = process.env.CRYPTO_KEY as string;
            const token = sign(payload, cryptoKey, {
                expiresIn: '1h'
            })

            return response.json({token: token})

             
        } catch (error) {
            return response.json(error);
            
        }
    }
}

export default new AuthController();