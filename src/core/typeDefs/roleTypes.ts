import { Field, ID, Int, ObjectType } from 'type-graphql';
import { IRole } from '../models/roleModel';
import { UserType } from './userTypes';

@ObjectType()
export class RoleType {
  @Field(() => ID)
  uid!: string;

  @Field()
  name!: string;

  @Field(() => [UserType!])
  users!: UserType[];

  @Field(() => Int)
  totalUsers = 0;

  constructor(role?: IRole) {
    if (role) {
      this.uid = role.uid;
      this.name = role.name;
    }
  }
}
