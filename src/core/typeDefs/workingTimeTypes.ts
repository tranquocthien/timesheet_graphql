import { DATE } from '@faker-js/faker/definitions/date';
import { IsDate, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { IUser } from '../models/userModel';
import { IWorkingTime } from '../models/workingTimeModel';
import { RoleType } from './roleTypes';


@ObjectType()
export class TimeType {
    @Field()
    check_in!: string;

    @Field()
    check_out!: string;

    @Field()
    lunchbreak_start!: string;

    @Field()
    lunchbreak_end!: string;

    @Field()
    is_open!: boolean;

}


@InputType()
export class CreateWorkingTimeInput {

    @Field(() => String)
    @IsNotEmpty()
    working_time_name!: string;

    @Field(() => String)
    @IsNotEmpty()
    user_email!: string;


}

@InputType()
export class RenameWorkingTimeInput {

    @Field(() => ID)
    @IsNotEmpty()
    working_time_id!: string;

    @Field(() => String)
    @IsNotEmpty()
    new_name!: string;

}


@InputType()
export class InputTimeType {
    @Field()
    check_in!: string;

    @Field()
    check_out!: string;

    @Field()
    lunchbreak_start!: string;

    @Field()
    lunchbreak_end!: string;

    @Field()
    is_open!: boolean;

}

@InputType()
export class EditWorkingTimeInput {

    @Field(() => ID)
    @IsNotEmpty()
    working_time_id!: string;

    @Field((type) => InputTimeType, { nullable: true })
    monday?: InputTimeType;

    @Field(() => InputTimeType, { nullable: true })
    tuesday?: InputTimeType;

    @Field(() => InputTimeType, { nullable: true })
    wednesday?: InputTimeType;

    @Field(() => InputTimeType, { nullable: true })
    thursday?: InputTimeType;

    @Field(() => InputTimeType, { nullable: true })
    friday?: InputTimeType;

    @Field(() => InputTimeType, { nullable: true })
    saturday?: InputTimeType;

    @Field(() => InputTimeType, { nullable: true })
    sunday?: InputTimeType;

}



@InputType()
export class ChangeWorkingTimeInput {

    @Field(() => ID)
    @IsNotEmpty()
    working_time_id!: string;

    @Field(() => Date)
    @IsNotEmpty()
    check_in!: Date;

    @Field(() => Date)
    check_out?: Date;

}

@ObjectType()
export class WorkingTimeType {

    @Field(() => ID)
    working_time_id!: string;

    @Field(() => String)
    @IsEmail()
    working_time_name!: string;

    @Field(() => String)
    @IsNotEmpty()
    user_email!: string;

    @Field()
    status: boolean;

    @Field(() => TimeType)
    monday: TimeType;

    @Field(() => TimeType)
    tuesday: TimeType;

    @Field(() => TimeType)
    wednesday: TimeType;

    @Field(() => TimeType)
    thursday: TimeType;

    @Field(() => TimeType)
    friday: TimeType;

    @Field(() => TimeType)
    saturday: TimeType;

    @Field(() => TimeType)
    sunday: TimeType;

    constructor(workingTime: IWorkingTime) {
        this.working_time_id = workingTime.working_time_id,
            this.working_time_name = workingTime.working_time_name;
        this.user_email = workingTime.user_email,
            this.status = workingTime.status,
            this.monday = workingTime.monday,
            this.tuesday = workingTime.tuesday,
            this.wednesday = workingTime.wednesday,
            this.thursday = workingTime.thursday,
            this.friday = workingTime.friday,
            this.saturday = workingTime.saturday,
            this.sunday = workingTime.sunday
    }
}
