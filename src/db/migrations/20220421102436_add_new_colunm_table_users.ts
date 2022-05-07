import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.string('username', 50).unique();
    table.string('role');
    table.string('created_by');
    table.boolean('active');
    table.string('avatar');
    table.integer('age');
    table.string('address');
  });
}

export async function down(knex: Knex): Promise<void> {
  //TODO drop columns here
}
