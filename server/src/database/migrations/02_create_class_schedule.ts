import Knex from 'knex';

// criando tabela
export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        // horario das aulas
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        // criando relacionamento com a aula do professor
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
}
// excluindo tabela
export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
}