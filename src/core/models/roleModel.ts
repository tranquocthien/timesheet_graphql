import db from '../../db';

export enum RoleName {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
}

export interface IRole {
  id: number;
  uid: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

const RoleModel = db<IRole>('roles');
export default RoleModel;
