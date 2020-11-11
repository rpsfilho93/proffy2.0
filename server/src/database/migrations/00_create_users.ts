import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('avatar');
    table.string('whatsapp');
    table.string('bio');
    table.string('email').notNullable();
    table.string('password').notNullable();
  });
}

export async function down(knex: knex) {
  return knex.schema.dropTable('users');
}
