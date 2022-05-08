import { WorkingTimeRepo } from './workingTimeRepo';
import { ListWorkingTimesQuery, SearchWorkingTime } from '../../core/typeDefs/listWorkingTimes';
import { HttpStatus, InvalidInputError } from '../../core/constants/errors';
import { Inject, Service } from 'typedi';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash'
import WorkingTimeModel, { IWorkingTime } from '../../core/models/workingTimeModel';
import {
    CreateWorkingTimeInput,
    ChangeWorkingTimeInput,
    WorkingTimeType,
    RenameWorkingTimeInput,
    EditWorkingTimeInput
} from './../../core/typeDefs/workingTimeTypes';
import { ERROR_CODE } from '../../core/constants/errorMessage';

@Service()
export class WorkingTimeService {
    constructor(
        @Inject()
        private readonly workingTimeRepo: WorkingTimeRepo,
    ) { }


    async createWorkingTime(createWorkingTimeInput: CreateWorkingTimeInput): Promise<WorkingTimeType> {
        const working_time_id = uuid()
        const { user_email, working_time_name } = createWorkingTimeInput;
        const check_in: string = "08:00";
        const check_out: string = "18:00";
        const lunchbreak_start: string = "12:00";
        const lunchbreak_end: string= "13:30";

        const status: boolean = false;

        const newWorkingTime = await this.workingTimeRepo.addNew(
            working_time_id,
            working_time_name, user_email, 
            status,
            check_in,
            check_out,
            lunchbreak_start,
            lunchbreak_end
            );
        console.log(newWorkingTime[0]);
        return newWorkingTime[0];
    }

    async updateWorkingTimeStatus(working_time_id: string, status: boolean) {
        const existingWorkingTime = await this.workingTimeRepo.getByWorkingTimeId(working_time_id);
        if(!existingWorkingTime){
            throw new InvalidInputError(ERROR_CODE.WORKING_TIME_NOT_FOUND);
        }
        await this.workingTimeRepo.updateStatus(working_time_id, status)
        return true;
    }

    async renameWorkingTime(renameWorkingTimeInput: RenameWorkingTimeInput): Promise<boolean> {
        const { working_time_id, new_name } = renameWorkingTimeInput
        const existingWorkingTime = await this.workingTimeRepo.getByWorkingTimeId(working_time_id);
        if(!existingWorkingTime){
            throw new InvalidInputError(ERROR_CODE.WORKING_TIME_NOT_FOUND);
        }
        let result = await this.workingTimeRepo.updateName(working_time_id, new_name);
        return result
    }

    async getListWorkingTimes(listWorkingTimes: ListWorkingTimesQuery): Promise<WorkingTimeType[]> {
        const limit = listWorkingTimes.limit ? Number(listWorkingTimes.limit) : 10;
        const offset = listWorkingTimes.offset ? Number(listWorkingTimes.offset) : 0;

        const result = await WorkingTimeModel.clone().select('*').limit(limit).offset(offset)
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

    async editWorkingTime(editWorkingTimeInput: EditWorkingTimeInput): Promise<WorkingTimeType>{
        console.log(editWorkingTimeInput)
        const existingWorkingTime = await this.workingTimeRepo.getByWorkingTimeId(editWorkingTimeInput.working_time_id);
        if(!existingWorkingTime){
            throw new InvalidInputError(ERROR_CODE.WORKING_TIME_NOT_FOUND);
        }
         let result = await this.workingTimeRepo.updateWorkingTimeByWorkingTimeId(editWorkingTimeInput)
         return result[0]
    }

}
