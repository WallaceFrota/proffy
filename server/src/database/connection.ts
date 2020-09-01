import knex from 'knex';
import path from 'path';

// conexão
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    // especifico para sqlite
    useNullAsDefault: true,
});

// exportando banco
export default db;