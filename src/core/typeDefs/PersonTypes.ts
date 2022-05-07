import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class NameType {
  @Field()
  title!: string;

  @Field()
  first!: string;

  @Field()
  last!: string;
}

@ObjectType()
export class LoginType {
  @Field()
  uuid!: string;

  @Field()
  username!: string;

  @Field()
  salt!: string;

  @Field()
  md5!: string;

  @Field()
  sha1!: string;
}

@ObjectType()
export class PersonType {
  @Field()
  gender!: string;

  @Field(() => NameType)
  name!: NameType;

  @Field()
  email!: string;

  @Field(() => LoginType)
  login!: LoginType;
}
