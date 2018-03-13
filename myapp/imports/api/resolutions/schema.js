import gql from 'graphql-tag';

export default gql`
  # name
  # createdAt
  # [todoId]

  type Resolution {
    _id: String!
    name: String!
  }

  type Mutation {
    createResolution(name: String!): Resolution
    updateResolution(id: String!, name: String!): Resolution
    removeResolution(id: String!): Resolution
  }
`;