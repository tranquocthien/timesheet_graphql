import UserModel, { IUser } from '../../core/models/userModel';
import { Service } from 'typedi';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateUserInput,
  LoginInput,
  RegisterUser,
  UpdateUserInput,
  UserType,
} from '../../core/typeDefs/userTypes';
import { SearchUser } from '../../core/typeDefs/listUsers';
import { ERROR_CODE, ERROR_MESSAGE } from '../../core/constants/errorMessage';
import { AuthenticationService } from '../../core/auth/authService';
import { AuthToken } from 'src/core/typeDefs/authType';
import { RoleService } from '../role/roleService';
import { RoleName } from '../../core/models/roleModel';
import { InvalidEmailError, InvalidInputError, InvalidRoleError } from '../../core/constants/errors';

@Service()
export class UserService {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly roleService: RoleService
  ) { }
  async getAllUsers(searchUser?: SearchUser): Promise<UserType[]> {
    const hasFilter = searchUser != null;
    const limit = hasFilter ? searchUser.limit : 10;
    const offset = hasFilter ? searchUser.offset : 0;
    const order = hasFilter ? searchUser.order : 'desc';
    const sort = hasFilter ? searchUser.sort : 'updated_at';

    const users = UserModel.clone()
      .select()
      .offset(offset)
      .limit(limit)
      .orderBy(`${sort}`, `${order}`);
    if (
      hasFilter &&
      searchUser.keyword &&
      searchUser.keyword.trim() !== '' &&
      searchUser.searchOn
    ) {
      const likeWhere = searchUser.searchOn
        .map((field) => `${field} LIKE ?`)
        .join(' OR ');
      const searchKeywork = ['%', searchUser.keyword, '%'].join('');
      const bindings = searchUser.searchOn.map(() => searchKeywork);

      users.whereRaw(likeWhere, bindings);
    }

    return users.then((result) => {
      return result.map((item) => {
        return new UserType(item);
      });
    });
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserType> {
    const userRole = await this.roleService.getByName(RoleName.USER);
    if (!userRole) throw new InvalidRoleError(ERROR_CODE.ROLE_NOT_FOUND)
    const users = await UserModel.clone()
      .insert({
        email: createUserInput.email,
        password: createUserInput.password,
        uid: uuidv4(),
        role: userRole.uid,
        username: createUserInput.username
      })
      .returning('*');
    return new UserType(users[0]);
  }

  async updateUser(
    uid: string,
    updateUserInput: UpdateUserInput
  ): Promise<UserType> {
    const users = await UserModel.clone()
      .where({ uid: uid })
      .update({
        ...updateUserInput,
        updated_at: new Date(),
      })
      .returning('*');
    return new UserType(users[0]);
  }

  async deleteUser(uid: string): Promise<boolean> {
    await UserModel.clone().where('uid', uid).del();
    return true;
  }

  async getByUid(uid: string): Promise<UserType | null> {
    return UserModel.clone()
      .where('uid', uid)
      .first()
      .then((user) => {
        if (!user) return null;
        return new UserType(user);
      });
  }

  async countUser(): Promise<number> {
    return UserModel.clone()
      .count('email')
      .then((result) => Number(result[0]['count']));
  }

  async getUsersByRole(roleId: string): Promise<IUser[] | []> {
    return UserModel.clone().where('role', roleId).select();
  }

  async countTotalUsersByRole(roleId: string): Promise<number> {
    return UserModel.clone()
      .where('role', roleId)
      .count()
      .then((result) => Number(result[0]['count']));
  }

  async registerUser(registerUser: RegisterUser): Promise<AuthToken> {
    const { email, username, password } = registerUser;
    const existingUser = await UserModel.clone()
      .select()
      .where('email', email)
      .first();
    if (existingUser) throw new InvalidEmailError(ERROR_CODE.EMAIL_IS_IN_USED)
    const userRole = await this.roleService.getByName(RoleName.USER);
    if (!userRole) throw new InvalidRoleError(ERROR_CODE.ROLE_NOT_FOUND)
    const hashPassword = await this.authService.hashPassword(password)
    const user = await UserModel.clone()
      .insert({
        email,
        username,
        password: String(hashPassword),
        uid: uuidv4(),
        role: userRole.uid,
        active: true
      })
      .returning('*');
    return this.authService.createToken(user[0]);
  }

  async login(loginInput: LoginInput): Promise<AuthToken> {
    const { email, password } = loginInput;
    const existingUser = await UserModel.clone()
      .select()
      .where('email', email)
      .first();
    if (!existingUser) throw new InvalidInputError(ERROR_CODE.USER_NOT_FOUND);
    const verifyPassword = await this.authService.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword)
      throw new InvalidInputError(ERROR_CODE.USER_PASSWORD_NOT_MATCH);
    if (!existingUser || existingUser.active === false)
      throw new InvalidInputError(ERROR_CODE.USER_IS_NOT_ACTIVE);
    return this.authService.createToken(existingUser);
  }
}
