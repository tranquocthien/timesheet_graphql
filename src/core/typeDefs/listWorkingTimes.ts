import { IsEnum } from 'class-validator';
import { ArgsType, Field, registerEnumType } from 'type-graphql';
import { Pagination } from './pagination';

enum SearchableColumns {
    WORKING_TIME_NAME = 'working_time_name',
    EMAIL = 'email'
}

enum Order {
    DESC = 'DESC',
    ASC = 'ASC',
}

// enum SortableWorkingTimeColumns {
//     WORKING_TIME_NAME = 'working_time_name',
//     EMAIL = 'email',
//     STATUS = 'status',
//     CREATED_AT = 'created_at'
// }

@ArgsType()
export class ListWorkingTimesQuery extends Pagination {

}


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
        defaultValue: [SearchableColumns.WORKING_TIME_NAME],
    })
    searchOn?: [string];

    @Field((type) => Order, { defaultValue: Order.DESC })
    @IsEnum(Order)
    order?: Order;
}
