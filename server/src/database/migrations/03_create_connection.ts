import Knex from 'knex';

// criando tabela verificando se houve conexão com o professor
export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        // quando que houve a conexão
        table.timestamp('created_at')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    })
}
// excluindo tabela
export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}