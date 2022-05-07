import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
export async function seed(knex: Knex): Promise<void> {
  await knex('roles').del();
  const data = [
    {
      uid: uuidv4(),
      name: 'ADMIN',
    },
    {
      uid: uuidv4(),
      name: 'SUPER_ADMIN',
    },
    {
      uid: uuidv4(),
      name: 'USER',
    },
  ];
  await knex('roles').insert(data);
}
