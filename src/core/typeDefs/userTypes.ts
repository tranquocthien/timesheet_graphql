import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { IUser } from '../models/userModel';
import { RoleType } from './roleTypes';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field(() => String)
  @IsNotEmpty()
  username!: string;

  @Field(() => String)
  @IsNotEmpty()
  password!: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  password?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  role?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  created_by?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  active?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  avatar?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  age?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  address?: string;
}

@ObjectType()
export class UserType {
  @Field(() => ID)
  uid: string;

  @Field()
  email: string;

  @Field({ nullable: true})
  username: string;

  @Field()
  role!: RoleType;

  @Field({ nullable: true})
  created_by: string;

  @Field({ nullable: true})
  active: boolean;

  @Field({ nullable: true})
  avatar: string;

  @Field(() => Int, {nullable: true})
  age: number;

  @Field({ nullable: true})
  address: string;

  roleId: string;

  constructor(user: IUser) {
    this.uid = user.uid;
    this.email = user.email;
    this.username = user.username;
    this.roleId = user.role;
    this.created_by = user.created_by;
    this.active = user.active;
    this.avatar = user.avatar;
    this.age = user.age;
    this.address = user.address;
  }
}

@InputType()
export class RegisterUser {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field(() => String)
  @IsNotEmpty()
  username!: string;

  @Field(() => String)
  @IsNotEmpty()
  password!: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field(() => String)
  @IsNotEmpty()
  password!: string;
}