import {
  Arg,
  Args,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from 'type-graphql';
import {
  CreateUserInput,
  LoginInput,
  RegisterUser,
  UpdateUserInput,
  UserType,
} from '../typeDefs/userTypes';
import { UserService } from '../../modules/user/userService';
import { Service } from 'typedi';
import { SearchUser } from '../typeDefs/listUsers';
import { PersistedQueryNotFoundError } from 'apollo-server-errors';
import { RoleService } from '../../modules/role/roleService';
import { RoleType } from '../typeDefs/roleTypes';
import { KeyMapUserType } from '../typeDefs/fresherCampTypes';
import FresherCampClient from '../../grpc/clients/fresherCampClient';
import { AuthToken } from '../typeDefs/authType';

@Service()
@Resolver((of) => UserType)
export class UserResolver implements ResolverInterface<UserType> {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly fresherCampClient: FresherCampClient
  ) {}

  @Query(() => Number)
  async totalUsers(): Promise<number> {
    return this.userService.countUser();
  }

  @Query(() => [UserType])
  async users(@Args() searchUser?: SearchUser): Promise<UserType[]> {
    return this.userService.getAllUsers(searchUser);
  }

  @Query(() => UserType)
  async user(@Arg('uid', () => ID) uid: string): Promise<UserType> {
    const user = await this.userService.getByUid(uid);
    if (!user) throw PersistedQueryNotFoundError;
    return user;
  }

  @Mutation(() => UserType)
  async createUser(
    @Arg('createUserInput') createUserInput: CreateUserInput
  ): Promise<UserType> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserType)
  async updateUser(
    @Arg('uid', () => ID) uid: string,
    @Arg('updateUserInput') updateUserInput: UpdateUserInput
  ): Promise<UserType> {
    return this.userService.updateUser(uid, updateUserInput);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('uid') uid: string): Promise<boolean> {
    return this.userService.deleteUser(uid);
  }

  @FieldResolver()
  @Query((type) => RoleType)
  async role(@Root() user: UserType): Promise<RoleType> {
    const role = await this.roleService.getByUid(user.roleId);
    return new RoleType(role);
  }

  @Query(() => [KeyMapUserType]!)
  async fresherCampUsers(): Promise<any[]> {
    return this.fresherCampClient.getRoles();
  }

  @Mutation(() => AuthToken)
  async register(
    @Arg('registerUser') registerUser: RegisterUser
  ): Promise<AuthToken> {
    return this.userService.registerUser(registerUser);
  }

  @Mutation(() => AuthToken)
  async login(@Arg('login') loginInput: LoginInput): Promise<AuthToken> {
    return this.userService.login(loginInput);
  }
}
