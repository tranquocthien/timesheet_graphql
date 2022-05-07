import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('roles', (table) => {
    table.increments(); //id` int unsigned not null auto_increment primary key,
    table.uuid('uid').unique().notNullable();
    table.string('name', 100).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  //TODO do drop roles table here
}
