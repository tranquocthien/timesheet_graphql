import { AWSProvider } from './providers/awsProvider';
import { ILog } from './ logInterface';
import { readFileSync } from 'fs';
const providerType: string = process.env.LOG_PROVIDER_TYPE as string;
const config = readFileSync('./credential.txt', {
  encoding: 'utf8',
  flag: 'r',
});

let Logger: ILog;
switch (providerType) {
  case 'aws':
    Logger = new AWSProvider(JSON.parse(config));
    break;
}

export { Logger };
