import {UsersRepository} from '../repositories/UsersRepositories';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import {Request, Response} from 'express';
import authConf from '../config/auth'
require('dotenv/config');

class SessionsController{
    async login(req: Request, res: Response){
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({
            where:[
                {'email': req.body.email},
                {'nickname': req.body.nickname}
            ]
        });

        if(!user)
            return res.status(400).json({error: "User not exists"});

        const match = await bcrypt.compare(req.body.password, user.password_hash);

       
        if(!match)
            return res.status(400).json({error: "Password do not match"});

        const token = jwt.sign({ id: user.id, nickname: user.nickname }, String(authConf.secret), {
            expiresIn: authConf.expiresIn,
        });

        return res.json({userId: user.id, token});
    }

}

export {SessionsController}
