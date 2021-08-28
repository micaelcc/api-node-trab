import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepositories';
import bcrypt from 'bcryptjs';
import { LinksRepository } from '../repositories/LinksRepositories';
export {Request, Response} from 'express';

class UserController{
    async store(req: Request, res: Response){
        const {nickname, email, password} = req.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const userExists = await usersRepository.findOne({where: [
                {nickname},
                {email}
        ]});

        if(userExists)
            return res.status(400).json({error: 'User already exists.'});

        const password_hash = await bcrypt.hash(password, 8);

        const user = await usersRepository.create({
            nickname,
            email,
            password_hash
        });

        await usersRepository.save(user);

        return res.status(201).json({id: user.id, nickname: user.nickname});
    }

    async getAll(req: Request, res: Response){
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find();

        return res.json(users);
    }

    async getLinks(req: Request, res: Response){
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({where: {nickname: req.params.nickname}});

        if(!user)
            return res.status(400).json({error: 'user not exists'});

        const linksRepository = getCustomRepository(LinksRepository);
        const linksUser = await linksRepository.find({where: {userId: user.id}});

        return res.status(200).json(linksUser);
    }

    async destroy(req: Request, res: Response){
        const usersRepository = getCustomRepository(UsersRepository);

        await usersRepository.delete(req.body.id);

        return res.status(201).json({message: "user removed."});
        
    }
}

export {UserController}