import { SearchWorkingTime } from '../../core/typeDefs/listWorkingTimes';
import { HttpStatus, InvalidInputError } from '../../core/constants/errors';
import { Service } from 'typedi';
import WorkingTimeModel, { IWorkingTime } from '../../core/models/workingTimeModel';
import { AuthenticationService } from '../../core/auth/authService';
import { RoleService } from '../role/roleService';
import {
    CreateWorkingTimeInput,
    ChangeWorkingTimeInput,
    WorkingTimeType
} from './../../core/typeDefs/workingTimeTypes';
import { ERROR_CODE } from '../../core/constants/errorMessage';
import { isUUID } from 'class-validator';

@Service()
export class WorkingTimeRepo {
    constructor(
    ) { }

    async getById(id: number): Promise<any | undefined> {
        return WorkingTimeModel.clone().where('id', id).first();
    }

    async getByUid(uid: string): Promise<any | undefined> {
        return WorkingTimeModel.clone().where('uid', uid).first();
    }

    async addNew(working_time_id: string, working_time_name: string, email: string, status: boolean) {
        return await WorkingTimeModel.clone()
            .insert({
                working_time_id,
                working_time_name,
                email,
                status
            })
            .returning('*');
    }

    async updateStatus(id: string, status: boolean) {
        return await WorkingTimeModel.clone()
            .where('working_time_id', '=', id)
            .update({
                status: status
            });
    }


    async updateName(id: string, working_time_name: string) {
        return await WorkingTimeModel.clone()
            .where('working_time_id', '=', id)
            .update({
                working_time_name:working_time_name
            });
    }


    // async changeWorkingTime(name: string, uid: string, email: string, check_in: Date, check_out: Date): Promise<any> {
    //     return await WorkingTimeModel.clone()
    //         .where('uid', '=', uid)
    //         .update({
    //             check_in: check_in,
    //             check_out: check_out
    //         });
    // }

    // async getAllWorkingTimes(limit: number, offset: number, sort: string, keyword: string, searchOn: any){

    //     const workingTimes = await WorkingTimeModel.clone()
    //       .select()
    //       .offset(offset)
    //       .limit(limit)
    //     if (keyword && keyword.trim() !== '' && searchOn) {
    //       const likeWhere = searchOn.map((field) => `${field} LIKE ?`).join(' OR ');
    //       const searchKeywork = ['%', keyword, '%'].join('');
    //       const bindings = searchOn.map(() => searchKeywork);

    //       workingTimes.whereRaw(likeWhere, bindings);
    //     }

    // }

    async changeStatus() {

    }
}
