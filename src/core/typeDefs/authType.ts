import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthToken {
  @Field(() => String)
  accessToken!: string;

  @Field(() => String)
  refreshToken!: string;
}
