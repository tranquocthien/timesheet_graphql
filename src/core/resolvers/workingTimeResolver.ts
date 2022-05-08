import { Pagination } from './../typeDefs/pagination';
import { WorkingTimeService } from './../../modules/workingTime/workingTime.service';
import {
    WorkingTimeType,
    ChangeWorkingTimeInput,
    CreateWorkingTimeInput,
    EditWorkingTimeInput,
    RenameWorkingTimeInput
} from './../typeDefs/workingTimeTypes';
import {
    Arg,
    Args,
    FieldResolver,
    ID,
    Mutation,
    Query,
    Resolver,
    ResolverInterface,
} from 'type-graphql';
import { Service } from 'typedi';
import { ListWorkingTimesQuery, SearchWorkingTime } from '../typeDefs/listWorkingTimes';

@Service()
@Resolver((of) => WorkingTimeType)
export class WorkingTimeResolver {
    constructor(
        private readonly workingTimeService: WorkingTimeService
    ) { }

    @Mutation(() => WorkingTimeType)
    async addNewWorkingTime(
        @Arg('createWorkingTimeInput') createWorkingTimeInput: CreateWorkingTimeInput
    ): Promise<WorkingTimeType> {
        console.log(createWorkingTimeInput)
        return this.workingTimeService.createWorkingTime(createWorkingTimeInput);
    }

    @Mutation(() => Boolean)
    async activeWorkingTime(@Arg('working_time_id') working_time_id: string): Promise<boolean> {
        return this.workingTimeService.activeWorkingTime(working_time_id);
    }

    @Mutation(() => Boolean)
    async inactiveWorkingTime(@Arg('working_time_id') working_time_id: string): Promise<boolean> {
        return this.workingTimeService.inactiveWorkingTime(working_time_id);
    }

    @Mutation(() => Boolean)
    async renameWorkingTime(@Arg('renameWorkingTimeInput') renameWorkingTimeInput: RenameWorkingTimeInput): Promise<boolean> {
        return this.workingTimeService.renameWorkingTime(renameWorkingTimeInput);
    }

    // @Mutation(() => Boolean)
    // async editWorkingTime(@Arg('editWorkingTimeInput') editWorkingTimeInput: EditWorkingTimeInput): Promise<WorkingTimeType> {
    //     return this.workingTimeService.editWorkingTime(editWorkingTimeInput);
    // }


    // @Mutation(() => WorkingTimeType)
    // async changeWorkingTime(
    //     @Arg('changeWorkingTimeInput') changeWorkingTimeInput: ChangeWorkingTimeInput
    // ): Promise<WorkingTimeType> {
    //     console.log(changeWorkingTimeInput)
    //     return this.workingTimeService.changeWorkingTime(changeWorkingTimeInput);
    // }

    @Query(() => [WorkingTimeType])
    async listWorkingTimes(@Args() listWorkingTimesQuery: ListWorkingTimesQuery): Promise<WorkingTimeType[]> {

        return this.workingTimeService.getListWorkingTimes(listWorkingTimesQuery)
    }

    @Query(() => [WorkingTimeType])
    async searchWorkingTime(
        @Args() searchWorkingTime: SearchWorkingTime
    ): Promise<any> {
        console.log(searchWorkingTime)
        return this.workingTimeService.searchWorkingTimes(searchWorkingTime);
    }

    @Query(() => [WorkingTimeType])
    async listWorkingDays(@Args() pagination: Pagination): Promise<WorkingTimeType[]> {

        return this.workingTimeService.getListWorkingTimes(pagination)
    }





}
