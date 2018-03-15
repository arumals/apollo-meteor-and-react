// entry point from the automatically compiled inside the server
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

// resolutions
import ResolutionsSchema from './../../api/resolutions/schema';
import ResolutionsResolvers from './../../api/resolutions/resolvers';

// users
import UsersSchema from './../../api/users/schema';
import UsersResolvers from './../../api/users/resolvers';

// resolutions array
const typeDefs = [ ResolutionsSchema, UsersSchema];
const resolvers = merge(ResolutionsResolvers, UsersResolvers);

// generate the schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// create the server
createApolloServer({ schema });