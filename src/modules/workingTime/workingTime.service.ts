import { WorkingTimeRepo } from './workingTimeRepo';
import {
  ListWorkingTimesQuery,
  SearchWorkingTime,
} from '../../core/typeDefs/listWorkingTimes';
import { HttpStatus, InvalidInputError } from '../../core/constants/errors';
import { Inject, Service } from 'typedi';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
import WorkingTimeModel, {
  IWorkingTime,
} from '../../core/models/workingTimeModel';
import {
  CreateWorkingTimeInput,
  ChangeWorkingTimeInput,
  WorkingTimeType,
  RenameWorkingTimeInput,
  EditWorkingTimeInput,
} from './../../core/typeDefs/workingTimeTypes';
import { ERROR_CODE } from '../../core/constants/errorMessage';

@Service()
export class WorkingTimeService {
  constructor(
    @Inject()
    private readonly workingTimeRepo: WorkingTimeRepo
  ) {}

  async createWorkingTime(
    createWorkingTimeInput: CreateWorkingTimeInput
  ): Promise<WorkingTimeType> {
    const uid = uuid();
    const userId = isNaN(createWorkingTimeInput.userId)
      ? Number(createWorkingTimeInput.userId)
      : createWorkingTimeInput.userId;
    const name = createWorkingTimeInput.name;
    const checkIn = '08:00';
    const checkOut = '18:00';
    const lunchBreakStart = '12:00';
    const lunchBreakEnd = '13:30';
    const status = false;
    const flexibleTime = 10;

    const newWorkingTime = await this.workingTimeRepo.addNew(
      uid,
      name,
      userId,
      status,
      checkIn,
      checkOut,
      lunchBreakStart,
      lunchBreakEnd,
      flexibleTime
    );
    return newWorkingTime[0];
  }

  async updateWorkingTimeStatus(uid: string, status: boolean) {
    const existingWorkingTime = await this.workingTimeRepo.getByUid(uid);
    if (!existingWorkingTime) {
      throw new InvalidInputError(ERROR_CODE.WORKING_TIME_NOT_FOUND);
    }
    await this.workingTimeRepo.updateStatus(uid, status);
    return true;
  }

  async renameWorkingTime(
    renameWorkingTimeInput: RenameWorkingTimeInput
  ): Promise<boolean> {
    const { uid, newName } = renameWorkingTimeInput;
    const existingWorkingTime = await this.workingTimeRepo.getByUid(uid);
    if (!existingWorkingTime) {
      throw new InvalidInputError(ERROR_CODE.WORKING_TIME_NOT_FOUND);
    }
    const result = await this.workingTimeRepo.updateName(uid, newName);
    return result;
  }

  async getListWorkingTimes(
    listWorkingTimes: ListWorkingTimesQuery
  ): Promise<WorkingTimeType[]> {
    const limit = listWorkingTimes.limit ? Number(listWorkingTimes.limit) : 10;
    const offset = listWorkingTimes.offset
      ? Number(listWorkingTimes.offset)
      : 0;

    const result = await WorkingTimeModel.clone()
      .select('*')
      .limit(limit)
      .offset(offset);
    return result;
  }

  async searchWorkingTimes(
    searchWorkingTime: SearchWorkingTime
  ): Promise<WorkingTimeType[]> {
    const hasFilter = searchWorkingTime != null;
    const limit = hasFilter ? Number(searchWorkingTime.limit) : 10;
    const offset = hasFilter ? Number(searchWorkingTime.offset) : 0;
    const order = hasFilter ? searchWorkingTime.order : 'desc';
    const sort = 'createdAt';

    return await this.workingTimeRepo.searchWorkingTimes(
      hasFilter,
      limit,
      offset,
      sort,
      order,
      searchWorkingTime
    );
  }

  async editWorkingTime(
    editWorkingTimeInput: EditWorkingTimeInput
  ): Promise<WorkingTimeType> {
    console.log(editWorkingTimeInput);
    const existingWorkingTime = await this.workingTimeRepo.getByUid(
      editWorkingTimeInput.uid
    );
    if (!existingWorkingTime) {
      throw new InvalidInputError(ERROR_CODE.WORKING_TIME_NOT_FOUND);
    }
    const result = await this.workingTimeRepo.updateWorkingTimeByUid(
      editWorkingTimeInput
    );
    return result[0];
  }
}
