import db from '../../db';

export interface IWorkingTimeDetail {
    id: number;
    working_time_id: string,
    working_time_name: string
    status: boolean;
    created_at: Date;
    updated_at?: Date;
}

const WorkingTimeModel = db<IWorkingTimeDetail>('working_time_detail');
export default WorkingTimeModel;
