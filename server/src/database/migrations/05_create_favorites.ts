import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary();

    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .integer('teacher_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .timestamp('created_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();
  });
}

export async function down(knex: knex) {
  return knex.schema.dropTable('favorites');
}
