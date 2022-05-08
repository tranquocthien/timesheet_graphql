import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('working_time', (table: Knex.TableBuilder) => {
        table.increments();
        table.string('working_time_id', 50).unique().notNullable();
        table.string('working_time_name').notNullable();
        table.string('user_email').notNullable();
        table.boolean('status').notNullable();
        table.json("monday");
        table.json("tuesday");
        table.json("wednesday");
        table.json("thursday");
        table.json("friday");
        table.json("saturday");
        table.json("sunday");
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
}

