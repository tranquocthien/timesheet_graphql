import db from '../../db';

export interface IWorkingTime {
    id: number;
    working_time_id: string,
    working_time_name: string,
    user_email: string,
    status: boolean;

    monday: {
        check_in: string,
        check_out: string,
        lunchbreak_start: string,
        lunchbreak_end: string,
        is_open: boolean
    },
    tuesday: {
        check_in: string,
        check_out: string,
        lunchbreak_start: string,
        lunchbreak_end: string,
        is_open: boolean
    },
    wednesday: {
        check_in: string,
        check_out: string,
        lunchbreak_start: string,
        lunchbreak_end: string,
        is_open: boolean
    },
    thursday: {
        check_in: string,
        check_out: string,
        lunchbreak_start: string,
        lunchbreak_end: string,
        is_open: boolean
    },
    friday: {
        check_in: string,
        check_out: string,
        lunchbreak_start: string,
        lunchbreak_end: string,
        is_open: boolean
    },
    saturday: {
        check_in: string,
        check_out: string,
        lunchbreak_start: string,
        lunchbreak_end: string,
        is_open: boolean
    },
    sunday: {
        check_in: string,
        check_out: string,
        lunchbreak_start: string,
        lunchbreak_end: string,
        is_open: boolean
    }
}

const WorkingTimeModel = db<IWorkingTime>('working_time');
export default WorkingTimeModel;
