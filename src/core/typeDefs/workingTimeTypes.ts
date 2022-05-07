import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { IUser } from '../models/userModel';
import { IWorkingTime } from '../models/workingTimeModel';
import { RoleType } from './roleTypes';

@InputType()
export class CreateWorkingTimeInput {

    @Field(() => String)
    @IsNotEmpty()
    working_time_name!: string;

    @Field(() => String)
    @IsNotEmpty()
    email!: string;

}

@InputType()
export class RenameWorkingTimeInput {

    @Field(() => ID)
    @IsNotEmpty()
    working_time_id!: string;

    @Field(() => String)
    @IsNotEmpty()
    newName!: string;

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
    email!: string;

    @Field()
    status: boolean;


    constructor(workingTime: IWorkingTime) {
        this.working_time_id = workingTime.working_time_id,
        this.working_time_name = workingTime.working_time_name;
        this.email = workingTime.email,
        this.status = workingTime.status
    }
}
