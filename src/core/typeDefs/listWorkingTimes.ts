import { IsEnum } from 'class-validator';
import { ArgsType, Field, registerEnumType } from 'type-graphql';
import { Pagination } from './pagination';

enum SearchableColumns {
  NAME = 'name',
  EMAIL = 'email',
}

enum Order {
  DESC = 'DESC',
  ASC = 'ASC',
}

@ArgsType()
export class ListWorkingTimesQuery extends Pagination {}

registerEnumType(SearchableColumns, {
  name: 'SearchableWorkingTimes',
  description: 'The working time columns can search on',
});

registerEnumType(Order, {
  name: 'OrderWorkingTimes',
  description: 'Query order value',
});

@ArgsType()
export class SearchWorkingTime extends Pagination {
  @Field({ nullable: false })
  keyword?: string;

  @Field((type) => [SearchableColumns], {
    defaultValue: [SearchableColumns.NAME],
  })
  searchOn?: [string];

  @Field((type) => Order, { defaultValue: Order.DESC })
  @IsEnum(Order)
  order?: Order;
}
