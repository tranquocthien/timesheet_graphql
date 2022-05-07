import { Ctx, Query, Resolver } from 'type-graphql';
import { PersonType } from '../typeDefs/PersonTypes';
import { Service } from 'typedi';
import { Context } from '../../dataSources/context';

@Service()
@Resolver()
export class PersonResolver {
  @Query(() => [PersonType])
  async getAllPerson(@Ctx() ctx: Context): Promise<PersonType[]> {
    return await ctx.dataSources.personAPI.getPerson();
  }
}
