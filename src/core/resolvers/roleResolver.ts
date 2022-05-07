import { RoleService } from '../../modules/role/roleService';
import {
  Arg,
  FieldResolver,
  ID,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from 'type-graphql';
import { Service } from 'typedi';
import { InvalidInputError } from '../constants/errors';
import { RoleType } from '../typeDefs/roleTypes';
import { IRole } from '../models/roleModel';
import { UserType } from '../typeDefs/userTypes';
import { UserService } from '../../modules/user/userService';

@Service()
@Resolver((of) => RoleType)
export class RoleResolver implements ResolverInterface<RoleType> {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService
  ) {}

  @Query(() => RoleType)
  async role(@Arg('uid', () => ID) uid: string): Promise<IRole> {
    const role = await this.roleService.getByUid(uid);
    if (!role) throw new InvalidInputError({ uid: 'not found' });

    return role;
  }

  @FieldResolver()
  async users(@Root() role: RoleType): Promise<UserType[] | []> {
    const users = await this.userService.getUsersByRole(role.uid);
    return users.map((user) => new UserType(user));
  }

  @FieldResolver()
  async totalUsers(@Root() role: RoleType): Promise<number> {
    return this.userService.countTotalUsersByRole(role.uid);
  }
}
