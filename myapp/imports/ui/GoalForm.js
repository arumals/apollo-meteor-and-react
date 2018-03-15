import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createGoal = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id 
    }
  }
`;

class GoalForm extends Component {
  submitForm = (e) => {
    e.preventDefault();
    if(this.name.value.trim().length == 0) return;
    this.props.createGoal({
      variables: {
        name: this.name.value,
        resolutionId: this.props.resolutionId,
      }
    }).then(res => {
      // this.props.onSaveGoal(res);
      this.name.value = '';
    }).catch(err => {
      alert(err.message);
    });
  }
  render(){
    return (
      <form onSubmit={this.submitForm}>
        <div className="input-group">
          <input ref={input => (this.name = input)} className="form-control" />
          <div className="input-group-btn">
            <button className="btn btn-default">Add Goal</button>
          </div>
        </div>
      </form>
    )
  }
}

export default graphql(createGoal, { 
  name: 'createGoal' 
})(GoalForm);