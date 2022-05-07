import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('working_time_detail', (table: Knex.TableBuilder) => {
        table.increments();
        table.string('working_time_detail_id', 50).unique().notNullable();
        table.string('working_time_id', 50).references('working_time.working_time_id');
        table.json('monday');
        table.json('tuesday');
        table.json('wednesday');
        table.json('thursday');
        table.json('friday');
        table.json('saturday');
        table.json('sunday');
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
}

