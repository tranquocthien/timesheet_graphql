import configs, { IKnexConfig } from '../../db/knexfile';

const databaseConfig: IKnexConfig = configs;
const environment: string = process.env.NODE_ENV || 'development';

export const dataConfig = databaseConfig[environment];
