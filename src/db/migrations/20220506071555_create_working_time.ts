import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('working_time', (table: Knex.TableBuilder) => {
        table.increments();
        table.string('working_time_id', 50).unique().notNullable();
        table.string('working_time_name').notNullable();
        table.string('email').notNullable();
        table.boolean('status').notNullable();
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
}

