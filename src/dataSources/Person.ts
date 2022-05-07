import { RESTDataSource } from 'apollo-datasource-rest';
import { Service } from 'typedi';
@Service()
export class PersonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_PERSON_URL;
  }

  async getPerson() {
    const data = await this.get('');
    return data.results;
  }
}
export default PersonAPI;
