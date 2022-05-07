import { IsEnum } from 'class-validator';
import { ArgsType, Field, registerEnumType } from 'type-graphql';
import { Pagination } from './pagination';

enum SearchableColumns {
    NAME = 'name',
    UID = 'uid',
    EMAIL = 'email',
    STATUS = 'status',
    CREATED_AT = 'created_at'
}

enum SortableWorkingTimeColumns {
    NAME = 'name',
    EMAIL = 'email',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at',
    STATUS = 'status',
}

@ArgsType()
export class ListWorkingTimesQuery extends Pagination {

}


@ArgsType()
export class SearchWorkingTime extends Pagination {
    @Field({ nullable: true })
    keyword?: string;

    @Field((type) => [SearchableColumns], {
        defaultValue: [SearchableColumns.NAME],
    })
    searchOn?: [string];

    @Field((type) => SortableWorkingTimeColumns, {
        defaultValue: SortableWorkingTimeColumns.UPDATED_AT,
    })
    @IsEnum(SortableWorkingTimeColumns)
    sort?: SortableWorkingTimeColumns;
}
