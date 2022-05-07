import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments(); //id` int unsigned not null auto_increment primary key,
    table.uuid('uid').unique().notNullable();
    table.string('email', 100).unique().notNullable();
    table.string('password', 100).notNullable();
    table.timestamps(true, true);
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.raw('DROP TABLE users CASCADE');
}
