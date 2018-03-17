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
        <label>
          <input type="checkbox" checked={this.props.completed} onChange={this.toggleGoal} />
          <span style={{textDecoration:this.props.completed ? 'line-through':'none'}}>{this.props.name}</span>
        </label>
      </div>
    )
  }
}

export default graphql(toggleGoal,{
  name: 'toggleGoal',
  options: {
    refetchQueries: ['Resolutions'],
  }
})(Goal);