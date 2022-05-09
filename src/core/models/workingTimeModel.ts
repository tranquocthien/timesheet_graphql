import db from '../../db';

export interface IWorkingTime {
  id: number;
  uid: string;
  name: string;
  userId: number;
  status: boolean;

  monday: {
    checkIn: string;
    checkOut: string;
    lunchBreakStart: string;
    lunchBreakEnd: string;
    flexibleTime: number;
    isOpen: boolean;
  };
  tuesday: {
    checkIn: string;
    checkOut: string;
    lunchBreakStart: string;
    lunchBreakEnd: string;
    flexibleTime: number;
    isOpen: boolean;
  };
  wednesday: {
    checkIn: string;
    checkOut: string;
    lunchBreakStart: string;
    lunchBreakEnd: string;
    flexibleTime: number;
    isOpen: boolean;
  };
  thursday: {
    checkIn: string;
    checkOut: string;
    lunchBreakStart: string;
    lunchBreakEnd: string;
    flexibleTime: number;
    isOpen: boolean;
  };
  friday: {
    checkIn: string;
    checkOut: string;
    lunchBreakStart: string;
    lunchBreakEnd: string;
    flexibleTime: number;
    isOpen: boolean;
  };
  saturday: {
    checkIn: string;
    checkOut: string;
    lunchBreakStart: string;
    lunchBreakEnd: string;
    flexibleTime: number;
    isOpen: boolean;
  };
  sunday: {
    checkIn: string;
    checkOut: string;
    lunchBreakStart: string;
    lunchBreakEnd: string;
    flexibleTime: number;
    isOpen: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const WorkingTimeModel = db<IWorkingTime>('workingTimes');
export default WorkingTimeModel;
