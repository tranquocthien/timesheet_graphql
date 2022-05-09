import { Pagination } from './../typeDefs/pagination';
import { WorkingTimeService } from './../../modules/workingTime/workingTime.service';
import {
  WorkingTimeType,
  ChangeWorkingTimeInput,
  CreateWorkingTimeInput,
  EditWorkingTimeInput,
  RenameWorkingTimeInput,
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
import {
  ListWorkingTimesQuery,
  SearchWorkingTime,
} from '../typeDefs/listWorkingTimes';

@Service()
@Resolver((of) => WorkingTimeType)
export class WorkingTimeResolver {
  constructor(private readonly workingTimeService: WorkingTimeService) {}

  @Mutation(() => WorkingTimeType)
  async addNewWorkingTime(
    @Arg('createWorkingTimeInput')
    createWorkingTimeInput: CreateWorkingTimeInput
  ): Promise<WorkingTimeType> {
    return this.workingTimeService.createWorkingTime(createWorkingTimeInput);
  }

  @Mutation(() => Boolean)
  async updateWorkingTimeStatus(
    @Arg('uid') uid: string,
    @Arg('status') status: boolean
  ): Promise<boolean> {
    return this.workingTimeService.updateWorkingTimeStatus(uid, status);
  }

  @Mutation(() => Boolean)
  async renameWorkingTime(
    @Arg('renameWorkingTimeInput')
    renameWorkingTimeInput: RenameWorkingTimeInput
  ): Promise<boolean> {
    return this.workingTimeService.renameWorkingTime(renameWorkingTimeInput);
  }

  @Mutation(() => WorkingTimeType)
  async editWorkingTime(
    @Arg('editWorkingTimeInput') editWorkingTimeInput: EditWorkingTimeInput
  ): Promise<WorkingTimeType> {
    return this.workingTimeService.editWorkingTime(editWorkingTimeInput);
  }

  @Query(() => [WorkingTimeType])
  async listWorkingTimes(
    @Args() listWorkingTimesQuery: ListWorkingTimesQuery
  ): Promise<WorkingTimeType[]> {
    return this.workingTimeService.getListWorkingTimes(listWorkingTimesQuery);
  }

  @Query(() => [WorkingTimeType])
  async searchWorkingTime(
    @Args() searchWorkingTime: SearchWorkingTime
  ): Promise<any> {
    console.log(searchWorkingTime);
    return this.workingTimeService.searchWorkingTimes(searchWorkingTime);
  }
}
