import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('workingTimes', (table: Knex.TableBuilder) => {
    table.increments();
    table.string('uid', 50).unique().notNullable();
    table.string('name').notNullable();
    table.integer('userId').references('users.id').notNullable();
    table.boolean('status').notNullable();
    table.json('monday');
    table.json('tuesday');
    table.json('wednesday');
    table.json('thursday');
    table.json('friday');
    table.json('saturday');
    table.json('sunday');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
