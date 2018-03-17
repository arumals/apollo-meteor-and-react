import gql from 'graphql-tag';

export default gql`
  type Resolution {
    _id: String!
    name: String!
    goals: [Goal]
    completed: Boolean
  }
  type Query {
    resolutions: [Resolution]
  }
  type Mutation {
    createResolution(name: String!): Resolution
    updateResolution(id: String!, name: String!): Resolution
    removeResolution(id: String!): Resolution
  }
`;