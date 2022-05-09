import RoleModel from '../../core/models/roleModel';
import { Service } from 'typedi';
import { IRole } from 'src/core/models/roleModel';

@Service()
export class RoleService {
  async getById(id: number): Promise<IRole | undefined> {
    return RoleModel.clone().where('id', id).first();
  }

  async getByUid(uid: string): Promise<IRole | undefined> {
    return RoleModel.clone().where('uid', uid).first();
  }

  async getByName(name: string): Promise<IRole | undefined> {
    return RoleModel.clone().where('name', name).first();
  }
}
