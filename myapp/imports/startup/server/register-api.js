// entry point from the automatically compiled inside the server
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

// schema
import ResolutionsSchema from './../../api/resolutions/Resolutions.graphql';

const testSchema = `
  type Query {
    hi: String
    resolutions: [Resolution]
  }
`;

const typeDefs = [
  testSchema, 
  ResolutionsSchema
];

const resolvers = {
  Query: {
    hi(){
      return `Hello from Mi App`;
    },
    resolutions(){
      return [
        {
          _id: "345kscjs423rk",
          name: "Lorem ipsum dolor",
        },
        {
          _id: "iak39qq21",
          name: "Mea presto, maer",
        }
      ]
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

createApolloServer({ schema });