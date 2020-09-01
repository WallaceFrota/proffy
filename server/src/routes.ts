import express from 'express';

import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionController';

const routes = express.Router();

// instanciando classes
const classesController = new ClassesController();
const connectionController = new ConnectionController();

// rotas
// listagem de users
routes.get('/classes', classesController.index);
// salvando aulas e usuário
routes.post('/classes', classesController.create);
// rota criar conexões
routes.post('/connections', connectionController.create);
// listando total de conexões
routes.get('/connections', connectionController.index);

// exportando rotas
export default routes;