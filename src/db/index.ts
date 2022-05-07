import { Knex, knex } from 'knex';
import { dataConfig } from '../core/configs';

const db: Knex = knex(dataConfig);

export default db;
