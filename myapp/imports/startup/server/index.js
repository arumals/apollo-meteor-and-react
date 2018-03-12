// entry point from the automatically compiled inside the server
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type Query {
    hi: String
  }
`;

const resolvers = {
  Query: {
    hi(){
      return `Hello from Mi App`;
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

createApolloServer({ schema });
