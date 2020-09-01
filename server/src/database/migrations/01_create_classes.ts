import Knex from 'knex';

// criando tabela
export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        // criando campo matéria do professor e custo
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        // criando relacionamento com usuário
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
}
// excluindo tabela
export async function down(knex: Knex) {
    return knex.schema.dropTable('classes');
}