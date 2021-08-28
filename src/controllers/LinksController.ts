import { getCustomRepository } from 'typeorm';
import { LinksRepository } from '../repositories/LinksRepositories';
import bcrypt from 'bcryptjs';
export {Request, Response} from 'express';

class LinkController{
    async store(req: Request, res: Response){
        const {userId, title, value} = req.body;

        const linksRepository = getCustomRepository(LinksRepository);

        const linkExists = await linksRepository.findOne({where:{
                userId,
                value
        }
        });

        if(linkExists)
            return res.status(400).json({error: 'Link already exists.'});

        const link = await linksRepository.create({
            userId,
            title,
            value
        });

        await linksRepository.save(link);

        return res.status(201).json({id: link.id, link: link.value});
    }

    async getAll(req: Request, res: Response){
        const linksRepository = getCustomRepository(LinksRepository);

        const links = await linksRepository.find();

        return res.json(links);
    }

    async destroy(req: Request, res: Response){
        const linksRepository = getCustomRepository(LinksRepository);

        await linksRepository.delete(req.body.id);

        return res.status(201).json({message: "Link removed."});
        
    }
}

export {LinkController}
