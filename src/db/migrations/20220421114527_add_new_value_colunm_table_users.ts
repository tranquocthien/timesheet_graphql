import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
  const listId = await knex('users').select('id');
  for (const item of listId) {
    await knex('users')
      .update({
        username: faker.unique(faker.name.firstName),
        role: 'USER',
        created_by: uuidv4(),
        active: true,
        avatar: faker.image.avatar(),
        age: faker.datatype.number({ max: 50 }),
        address: faker.address.cityName(),
        updated_at: new Date(),
      })
      .where('id', item.id);
  }
}

export async function down(knex: Knex): Promise<void> {
  //TOD Drop column here
}
