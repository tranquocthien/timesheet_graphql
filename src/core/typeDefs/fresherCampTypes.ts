import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class KeyMapUserType {
  @Field(() => String)
  key!: string;

  @Field(() => String)
  label!: string;
}
