import {Request, Response} from 'express';

import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem  {
    week_day: number;
    from: string;
    to: string;
}
// exportando classe e métodos
export default class ClassesController {
    // listagem de usuários
    async index(request: Request, response: Response) {
        // pegando os filtros repassados
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        // verificando se todos os filtros foram repassados
        if(!week_day || !subject || !time) {
            return response.status(400).json({
                error: "Preencha todos os campos"
            })
        }
        // convertendo horas repassadas em minutos
        const timeInMinutes = convertHoursToMinutes(time);
        
        // realizando a busca da aula e fazendo join com a tabela de usuário
        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
        
    }

    // salvando aulas e usuário
    async create(request: Request, response: Response) {
        // desestruturando dados recebidos
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        // se houver algum erro irá desfazer
        const trx = await db.transaction();
    
        try {
            // salvando dados do usuário no banco
            const insertedUsersId = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
    
            // pegando id do usuário inserido 1º
            const user_id = insertedUsersId[0];
    
            // salvando aula do usuário no banco
            const insertedClassesId = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
    
            // pegando id da aula do usuário inserido
            const class_id = insertedClassesId[0];
    
            // percorrendo schedule para tranformar string de horas em minutos
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHoursToMinutes(scheduleItem.from),
                    to: convertHoursToMinutes(scheduleItem.to),
                };
            })
            // salvando schedule no banco
            await trx('class_schedule').insert(classSchedule);
            
            // antes da resposta / faz todas as alteraçõe ao mesmo tempo
            await trx.commit();
    
            // retorno da postagem com sucesso
            return response.status(201).send();
    
        } catch (err) {
            // desfaz qualquer alteração feita no banco
            await trx.rollback();
            // retornando erro
            return response.status(400).json({
                error: "Unexpected error while creating new class"
            })
        }
    }
}