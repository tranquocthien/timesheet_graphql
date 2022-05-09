import { DATE } from '@faker-js/faker/definitions/date';
import { IsDate, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { IWorkingTime } from '../models/workingTimeModel';

@ObjectType()
export class TimeType {
  @Field()
  checkIn!: string;

  @Field()
  checkOut!: string;

  @Field()
  lunchBreakStart!: string;

  @Field()
  lunchBreakEnd!: string;

  @Field()
  flexibleTime!: number;

  @Field()
  isOpen!: boolean;
}

@InputType()
export class InputTimeType {
  @Field()
  checkIn!: string;

  @Field()
  checkOut!: string;

  @Field()
  lunchBreakStart!: string;

  @Field()
  lunchBreakEnd!: string;

  @Field()
  flexibleTime!: number;

  @Field()
  isOpen!: boolean;
}

@InputType()
export class CreateWorkingTimeInput {
  @Field(() => String)
  @IsNotEmpty()
  name!: string;

  @Field(() => Number)
  @IsNotEmpty()
  userId!: number;
}

@InputType()
export class RenameWorkingTimeInput {
  @Field(() => ID)
  @IsNotEmpty()
  uid!: string;

  @Field(() => String)
  @IsNotEmpty()
  newName!: string;
}

@InputType()
export class EditWorkingTimeInput {
  @Field(() => ID)
  @IsNotEmpty()
  uid!: string;

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
  uid!: string;

  @Field(() => Date)
  @IsNotEmpty()
  checkIn!: Date;

  @Field(() => Date)
  checkOut?: Date;
}

@ObjectType()
export class WorkingTimeType {
  @Field(() => ID)
  uid!: string;

  @Field(() => String)
  @IsEmail()
  name!: string;

  @Field(() => Number)
  @IsNotEmpty()
  @IsEmail()
  userId!: number;

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
    (this.uid = workingTime.uid),
      (this.name = workingTime.name),
      (this.userId = workingTime.userId),
      (this.status = workingTime.status),
      (this.monday = workingTime.monday),
      (this.tuesday = workingTime.tuesday),
      (this.wednesday = workingTime.wednesday),
      (this.thursday = workingTime.thursday),
      (this.friday = workingTime.friday),
      (this.saturday = workingTime.saturday),
      (this.sunday = workingTime.sunday);
  }
}
