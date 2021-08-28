import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import {promisify} from 'util';
import authConf from '../config/auth'
require('dotenv').config();

export default async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader)
        return res.status(401).json({error: 'Token not found.'});

    const [, token] = authHeader.split(' ');
    
    try{
        const decoded = await promisify(jwt.verify)(token, String(authConf.secret));
        return next();
    }catch(err){
        return res.status(401).json({error: 'Token invalid'});
    }
}