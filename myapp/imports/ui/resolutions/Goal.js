import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const toggleGoal = gql`
  mutation toggleGoal($id: String!){
    toggleGoal(id: $id){
      _id
    }
  }
`;

class Goal extends Component {
  toggleGoal = (e) => {
    this.props.toggleGoal({
      variables: {
        id: this.props._id
      }
    })
  }
  render(){
    return (
      <div className="checkbox">
        <label><input type="checkbox" onChange={this.toggleGoal} /> {this.props.name}</label>
      </div>
    )
  }
}

export default graphql(toggleGoal,{
  name: 'toggleGoal',
  options: {
    refetch: ['Resolutions'],
  }
})(Goal);