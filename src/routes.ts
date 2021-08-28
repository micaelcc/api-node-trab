import {Router} from 'express';
import {Request, Response} from 'express';

import {UserController} from './controllers/UserController';
import {LinkController} from './controllers/LinksController';
import {SessionsController} from './controllers/SessionsController';

import auth from './middlewares/auth'

const sessionsController = new SessionsController();
const usersController = new UserController();
const linksController = new LinkController();

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({message: 'Servidor rodando'})
});

routes.post('/users', usersController.store);

routes.delete('/users', auth, usersController.destroy);

routes.post('/links', linksController.store);

routes.delete('/links', auth, linksController.destroy);

routes.get('/:nickname', usersController.getLinks);

routes.get('/links', linksController.getAll);


routes.post('/sessions', sessionsController.login);

export {routes}