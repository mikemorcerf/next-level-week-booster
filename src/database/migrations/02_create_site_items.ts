import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('site_items', table => {
    table.increments('id').primary();
    table.integer('site_id')
      .notNullable()
      .references('id')
      .inTable('sites');

    table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('items');
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('site_items');
}