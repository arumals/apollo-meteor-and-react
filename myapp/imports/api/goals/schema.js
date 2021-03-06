import gql from 'graphql-tag';

export default gql`
  type Goal {
    _id: String
    name: String
    completed: Boolean
  }
  extend type Mutation {
    createGoal(name: String!, resolutionId: String!): Goal
    toggleGoal(id: String): Goal
  }
`;