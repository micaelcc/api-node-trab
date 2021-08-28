import express, {Request, Response} from 'express';
import {routes} from './routes';
import createConnection from './database'
import cors from 'cors';
class App{
    public readonly server: express.Application;

    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
        this.database();
    }

    middlewares(): void{
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes(): void{
        this.server.use(routes);
    }
    
    database() : void{
        createConnection();
    }


}

export {App}