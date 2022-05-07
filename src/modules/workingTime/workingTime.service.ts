import { WorkingTimeRepo } from './workingTimeRepo';
import { ListWorkingTimesQuery, SearchWorkingTime } from '../../core/typeDefs/listWorkingTimes';
import { HttpStatus, InvalidInputError } from '../../core/constants/errors';
import { Inject, Service } from 'typedi';
import { v4 as uuid } from 'uuid';
import WorkingTimeModel, { IWorkingTime } from '../../core/models/workingTimeModel';
import {
    CreateWorkingTimeInput,
    ChangeWorkingTimeInput,
    WorkingTimeType,
    RenameWorkingTimeInput
} from './../../core/typeDefs/workingTimeTypes';
import { ERROR_CODE } from '../../core/constants/errorMessage';
import { isUUID } from 'class-validator';

@Service()
export class WorkingTimeService {
    constructor(
        @Inject()
        private readonly workingTimeRepo: WorkingTimeRepo,
    ) { }


    async createWorkingTime(createWorkingTimeInput: CreateWorkingTimeInput): Promise<WorkingTimeType> {
        const working_time_id = uuid()
        const { email, working_time_name } = createWorkingTimeInput;
        const status: boolean = false;

        console.log(createWorkingTimeInput);

        const newWorkingTime = await this.workingTimeRepo.addNew(working_time_id, working_time_name, email, status);
        console.log(newWorkingTime[0]);
        return newWorkingTime[0];
    }

    async activeWorkingTime(working_time_id: string) {
        const status: boolean = true
        await this.workingTimeRepo.updateStatus(working_time_id, status)
        return true
    }

    async renameWorkingTime(renameWorkingTimeInput: RenameWorkingTimeInput): Promise<boolean> {
        const { working_time_id, newName } = renameWorkingTimeInput
        await this.workingTimeRepo.updateName(working_time_id, newName)
        return true
    }

    // async changeWorkingTime(changeWorkingTimeInput: ChangeWorkingTimeInput): Promise<WorkingTimeType> {
    //     const existingWorkingTime = await this.workingTimeRepo.getByUid(changeWorkingTimeInput.wt_id);
    //     if (!existingWorkingTime) {
    //         throw new InvalidInputError(ERROR_CODE.WORKING_TIME_NOT_FOUND);
    //     };
    //     return await WorkingTimeModel.clone()
    //         .where('wt_id', '=', changeWorkingTimeInput.wt_id)
    //         .update({
    //             check_in: changeWorkingTimeInput.check_in,
    //             check_out: changeWorkingTimeInput.check_out
    //         });
    // }

    async getListWorkingTimes(listWorkingTimes: ListWorkingTimesQuery): Promise<WorkingTimeType[]> {
        const limit = listWorkingTimes.limit ? Number(listWorkingTimes.limit) : 10;
        const offset = listWorkingTimes.offset ? Number(listWorkingTimes.offset) : 0;

        const result = await WorkingTimeModel.select('*').limit(limit).offset(offset)
        return result
    }

    async searchWorkingTimes(searchWorkingTime: SearchWorkingTime): Promise<WorkingTimeType[]> {

        const hasFilter = searchWorkingTime != null;
        const limit = hasFilter ? Number(searchWorkingTime.limit) : 10;
        const offset = hasFilter ? Number(searchWorkingTime.offset) : 0;
        const order = hasFilter ? searchWorkingTime.order : 'desc';
        const sort = 'created_at';

        const workingTimes = WorkingTimeModel.clone()
            .select('*')
            .limit(limit)
            .offset(offset)
             .orderBy(`${sort}`, `${order}`);
        if (hasFilter && searchWorkingTime.keyword && searchWorkingTime.keyword.trim() !== '' && searchWorkingTime.searchOn) {
            const likeWhere = searchWorkingTime.searchOn.map((field) => `${field} LIKE ?`).join(' OR ');
            const searchKeywork = ['%', searchWorkingTime.keyword.trim(), '%'].join('');
            const bindings = searchWorkingTime.searchOn.map(() => searchKeywork);
            workingTimes.whereRaw(likeWhere, bindings);
        }
          return workingTimes.then((result) => {
            return result.map((item) => {
                console.log(item)
              return new WorkingTimeType(item);
            });
         });
    }

    async changeStatus() {

    }
}
