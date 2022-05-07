import { WorkingTimeService } from './../../modules/workingTime/workingTime.service';
import {
    WorkingTimeType,
    ChangeWorkingTimeInput,
    CreateWorkingTimeInput,
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
    async renameWorkingTime(@Arg('renameWorkingTimeInput') renameWorkingTimeInput: RenameWorkingTimeInput): Promise<boolean> {
        return this.workingTimeService.renameWorkingTime(renameWorkingTimeInput);
    }


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

    // @Mutation(() => [WorkingTimeType])
    // async searchWorkingTime(
    //     @Arg('searchWorkingTime') searchWorkingTime: SearchWorkingTime
    // ): Promise<any> {
    //     console.log(searchWorkingTime)
    //     return this.workingTimeService.getAllWorkingTimes(searchWorkingTime);
    // }





}
