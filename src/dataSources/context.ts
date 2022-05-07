import { PersonAPI } from './Person';

export interface Context {
  dataSources: {
    personAPI: PersonAPI;
  };
}
