import { IsEnum } from 'class-validator';
import { ArgsType, Field, registerEnumType } from 'type-graphql';
import { Pagination } from './pagination';

enum SortableUserColumns {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  EMAIL = 'email',
  UID = 'uid',
}

enum Order {
  DESC = 'DESC',
  ASC = 'ASC',
}

enum SearchableColumns {
  EMAIL = 'email',
  USER_NAME = 'username',
}

registerEnumType(SortableUserColumns, {
  name: 'SortableUserColumns',
  description: 'The sortable of user table columns',
});

registerEnumType(Order, {
  name: 'Order',
  description: 'Query order value',
});

registerEnumType(SearchableColumns, {
  name: 'SearchableColumns',
  description: 'The user columns can search on',
});

@ArgsType()
export class SearchUser extends Pagination {
  @Field({ nullable: true })
  keyword?: string;

  @Field((type) => [SearchableColumns], {
    defaultValue: [SearchableColumns.EMAIL],
  })
  searchOn?: [string];

  @Field((type) => SortableUserColumns, {
    defaultValue: SortableUserColumns.UPDATED_AT,
  })
  @IsEnum(SortableUserColumns)
  sort?: SortableUserColumns;

  @Field((type) => Order, { defaultValue: Order.DESC })
  @IsEnum(Order)
  order?: Order;
}
