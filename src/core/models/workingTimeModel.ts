import db from '../../db';

export interface IWorkingTime {
    id: number;
    working_time_id: string,
    working_time_name: string,
    email: string,
    status: boolean;
    created_at: Date;
    updated_at?: Date;
}

const WorkingTimeModel = db<IWorkingTime>('working_time');
export default WorkingTimeModel;
