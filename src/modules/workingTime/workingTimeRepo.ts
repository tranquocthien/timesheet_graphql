import { SearchWorkingTime } from './../../core/typeDefs/listWorkingTimes';
import { HttpStatus, InvalidInputError } from '../../core/constants/errors';
import { Service } from 'typedi';
import WorkingTimeModel, {
  IWorkingTime,
} from '../../core/models/workingTimeModel';
import {
  WorkingTimeType,
  EditWorkingTimeInput,
} from './../../core/typeDefs/workingTimeTypes';

@Service()
export class WorkingTimeRepo {
  constructor() {}

  async getById(id: number): Promise<any | undefined> {
    return WorkingTimeModel.clone().where('id', id).first();
  }

  async getByUid(id: string): Promise<any | undefined> {
    return WorkingTimeModel.clone().where('uid', id).first();
  }

  async addNew(
    uid: string,
    name: string,
    userId: number,
    status: boolean,
    checkIn: string,
    checkOut: string,
    lunchBreakStart: string,
    lunchBreakEnd: string,
    flexibleTime: number
  ) {
    return await WorkingTimeModel.clone()
      .insert({
        uid,
        name,
        userId,
        status,
        monday: {
          checkIn: checkIn,
          checkOut: checkOut,
          lunchBreakStart: lunchBreakStart,
          lunchBreakEnd: lunchBreakEnd,
          flexibleTime: flexibleTime,
          isOpen: true,
        },
        tuesday: {
          checkIn: checkIn,
          checkOut: checkOut,
          lunchBreakStart: lunchBreakStart,
          lunchBreakEnd: lunchBreakEnd,
          flexibleTime: flexibleTime,
          isOpen: true,
        },
        wednesday: {
          checkIn: checkIn,
          checkOut: checkOut,
          lunchBreakStart: lunchBreakStart,
          lunchBreakEnd: lunchBreakEnd,
          flexibleTime: flexibleTime,
          isOpen: true,
        },
        thursday: {
          checkIn: checkIn,
          checkOut: checkOut,
          lunchBreakStart: lunchBreakStart,
          lunchBreakEnd: lunchBreakEnd,
          flexibleTime: flexibleTime,
          isOpen: true,
        },
        friday: {
          checkIn: checkIn,
          checkOut: checkOut,
          lunchBreakStart: lunchBreakStart,
          lunchBreakEnd: lunchBreakEnd,
          flexibleTime: flexibleTime,
          isOpen: true,
        },
        saturday: {
          checkIn: checkIn,
          checkOut: checkOut,
          lunchBreakStart: lunchBreakStart,
          lunchBreakEnd: lunchBreakEnd,
          flexibleTime: flexibleTime,
          isOpen: false,
        },
        sunday: {
          checkIn: checkIn,
          checkOut: checkOut,
          lunchBreakStart: lunchBreakStart,
          lunchBreakEnd: lunchBreakEnd,
          flexibleTime: flexibleTime,
          isOpen: false,
        },
      })
      .returning('*');
  }

  async updateStatus(id: string, status: boolean) {
    return await WorkingTimeModel.clone().where('uid', '=', id).update({
      status: status,
      updatedAt: new Date(),
    });
  }

  async updateWorkingTimeByUid(editWorkingTimeInput: EditWorkingTimeInput) {
    return await WorkingTimeModel.clone()
      .where('uid', '=', editWorkingTimeInput.uid)
      .update({
        monday: editWorkingTimeInput.monday,
        tuesday: editWorkingTimeInput.tuesday,
        wednesday: editWorkingTimeInput.wednesday,
        thursday: editWorkingTimeInput.thursday,
        friday: editWorkingTimeInput.friday,
        saturday: editWorkingTimeInput.saturday,
        sunday: editWorkingTimeInput.sunday,
        updatedAt: new Date(),
      })
      .returning('*');
  }

  async searchWorkingTimes(
    hasFilter: any,
    limit: number,
    offset: number,
    sort: string,
    order: string | undefined,
    searchWorkingTime: SearchWorkingTime
  ) {
    const workingTimes = WorkingTimeModel.clone()
      .select('*')
      .limit(limit)
      .offset(offset)
      .orderBy(`${sort}`, `${order}`);
    if (
      hasFilter &&
      searchWorkingTime.keyword &&
      searchWorkingTime.keyword.trim() !== '' &&
      searchWorkingTime.searchOn
    ) {
      const likeWhere = searchWorkingTime.searchOn
        .map((field) => `${field} LIKE ?`)
        .join(' OR ');
      const searchKeywork = ['%', searchWorkingTime.keyword.trim(), '%'].join(
        ''
      );
      const bindings = searchWorkingTime.searchOn.map(() => searchKeywork);
      workingTimes.whereRaw(likeWhere, bindings);
    }
    return workingTimes.then((result) => {
      return result.map((item) => {
        console.log(item);
        return new WorkingTimeType(item);
      });
    });
  }

  async updateName(id: string, name: string): Promise<boolean> {
    return await WorkingTimeModel.clone().where('uid', '=', id).update({
      name: name,
      updatedAt: new Date(),
    });
  }
}
