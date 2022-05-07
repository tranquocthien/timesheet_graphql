import { Knex } from 'knex';

export interface IKnexConfig {
  [key: string]: Knex.Config;
}

const config: Knex.Config = {
  client: process.env.DATABASE_CLIENT || 'pg',

  connection: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: Number(process.env.DATABASE_PORT) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },

  debug: ['development', 'test'].includes(
    process.env.NODE_ENV || 'development'
  ),
  useNullAsDefault: true,

  pool: {
    min: 0,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    directory: 'migrations',
    loadExtensions: ['.js', '.ts'],
  },
  seeds: {
    directory: 'seeds',
    loadExtensions: ['.js', '.ts'],
    timestampFilenamePrefix: true,
  },
};

const devConfig: Knex.Config = {
  ...config,
  migrations: {
    tableName: 'migrations',
    directory: 'migrations',
    loadExtensions: ['.js', 'd.ts'],
  },
  seeds: {
    directory: 'seeds',
    loadExtensions: ['.js', 'd.ts'],
  },
};

const configs: IKnexConfig = {
  development: devConfig,
  local: config,
  staging: devConfig,
  production: devConfig,
};

export default configs;
