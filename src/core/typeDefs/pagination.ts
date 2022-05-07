import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class Pagination {
  @Field(() => Number, { defaultValue: 10 })
  limit = 10;

  @Field(() => Number, { defaultValue: 0 })
  offset = 0;
}
