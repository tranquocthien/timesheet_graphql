import { HttpStatus, InvalidInputError } from '../../core/constants/errors';
import { Service } from 'typedi';
import WorkingTimeModel, { IWorkingTime } from '../../core/models/workingTimeModel';
import { AuthenticationService } from '../../core/auth/authService';
import { RoleService } from '../role/roleService';
import {
    CreateWorkingTimeInput,
    ChangeWorkingTimeInput,
    WorkingTimeType,
    EditWorkingTimeInput
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

    async addNew(working_time_id: string, 
        working_time_name: string, 
        user_email: string, 
        status: boolean, 
        check_in: string,
        check_out: string,
        lunchbreak_start: string,
        lunchbreak_end: string
        ) {
        return await WorkingTimeModel.clone()
            .insert({
                working_time_id,
                working_time_name,
                user_email,
                status,
                monday: {
                    check_in: check_in,
                    check_out: check_out,
                    lunchbreak_start: lunchbreak_start,
                    lunchbreak_end: lunchbreak_end,
                    is_open: true
                },
                tuesday: {
                    check_in: check_in,
                    check_out: check_out,
                    lunchbreak_start: lunchbreak_start,
                    lunchbreak_end: lunchbreak_end,
                    is_open: true
                },
                wednesday: {
                    check_in: check_in,
                    check_out: check_out,
                    lunchbreak_start: lunchbreak_start,
                    lunchbreak_end: lunchbreak_end,
                    is_open: true
                },
                thursday: {
                    check_in: check_in,
                    check_out: check_out,
                    lunchbreak_start: lunchbreak_start,
                    lunchbreak_end: lunchbreak_end,
                    is_open: true
                },
                friday: {
                    check_in: check_in,
                    check_out: check_out,
                    lunchbreak_start: lunchbreak_start,
                    lunchbreak_end: lunchbreak_end,
                    is_open: true
                },
                saturday: {
                    check_in: check_in,
                    check_out: check_out,
                    lunchbreak_start: lunchbreak_start,
                    lunchbreak_end: lunchbreak_end,
                    is_open: false
                },
                sunday: {
                    check_in: check_in,
                    check_out: check_out,
                    lunchbreak_start: lunchbreak_start,
                    lunchbreak_end: lunchbreak_end,
                    is_open: false
                }

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

    async updateWorkingTimeByWorkingTimeId(editWorkingTimeInput: EditWorkingTimeInput){
        return await WorkingTimeModel.clone()
        .where('working_time_id', '=', editWorkingTimeInput.working_time_id)
        .update({
            monday: editWorkingTimeInput.monday,
            tuesday: editWorkingTimeInput.tuesday,
            wednesday: editWorkingTimeInput.wednesday,
            thursday: editWorkingTimeInput.thursday,
            friday: editWorkingTimeInput.friday,
            saturday: editWorkingTimeInput.saturday,
            sunday: editWorkingTimeInput.sunday
        });

    }


    async updateName(id: string, working_time_name: string) {
        return await WorkingTimeModel.clone()
            .where('working_time_id', '=', id)
            .update({
                working_time_name: working_time_name
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


    async changeStatus() {

    }
}
