import db from '../../db';

export interface IUser {
  id: number;
  uid: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  username: string;
  role: string;
  created_by: string;
  active: boolean;
  avatar: string;
  age: number;
  address: string;
}

const UserModel = db<IUser>('users');
export default UserModel;
