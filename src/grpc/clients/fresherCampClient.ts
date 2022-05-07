import * as grpc from '@grpc/grpc-js';
import { project_user } from '../protos/fresherCampUser';
import { fresherCampConfig } from '../config';
import { Service } from 'typedi';

@Service()
export default class FresherCampClient {
  private client;
  constructor() {
    this.client = new project_user.UserClient(
      `${fresherCampConfig.host}:${fresherCampConfig.port}`,
      grpc.credentials.createInsecure()
    );
  }

  async getRoles(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = new project_user.GetRoleRequest();
      JSON.stringify;
      this.client.GetRole(request, (err, roles) => {
        if (err) {
          reject(err);
        }
        if (roles) {
          resolve(
            Array.from(roles.mapUidUserName, (item) => ({
              key: item[0],
              label: item[1],
            }))
          );
        }
      });
    });
  }
}
