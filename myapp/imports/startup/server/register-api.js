// entry point from the automatically compiled inside the server
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

// query
const BaseSchema = `
  type Query {
    resolutions: [Resolution]
    user: User
  }
`;

// resolutions
import ResolutionsSchema from './../../api/resolutions/schema';
import ResolutionsResolvers from './../../api/resolutions/resolvers';

// users
import UsersSchema from './../../api/users/schema';
import UsersResolvers from './../../api/users/resolvers';

// resolutions array
const typeDefs = [ BaseSchema, ResolutionsSchema, UsersSchema];
const resolvers = merge(ResolutionsResolvers, UsersResolvers);

// generate the schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// create the server
createApolloServer({ schema });