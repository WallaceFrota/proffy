import {Request, Response} from 'express';
import db from '../database/connection';

export default class ConnectionController {
    // listar todas as conexões
    async index(request: Request, response: Response) {
        // total de conexões da tabela connections
        const totalConnections = await db('connections').count('* as total');

        // pegando a coluna total
        const { total } = totalConnections[0];

        // retorno
        return response.json({ total });
    }
    // criar conexão
    async create(request: Request, response: Response) {
        const {user_id} = request.body;

        await db('connections').insert({
            user_id,
        });

        // retorno
        return response.status(201).send();
    }
}