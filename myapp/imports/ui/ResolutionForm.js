import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'; 

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;

class Resolution extends Component {
  submitForm = (e) => {
    e.preventDefault();
    if(this.name.value.trim().length == 0) return;
    this.props.createResolution({
      variables: {
        name: this.name.value.trim()
      }
    }).then(res => {
      this.props.onSaved(res);
      this.name.value = '';
    }).catch(err => {
      alert(err.message);
    });
  }
  render(){
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <input ref={input => (this.name = input)} onClick={this.props.onCancelUpdate} /> 
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default graphql(createResolution, { 
  name: 'createResolution',
  options: {
    refetchQueries: [
      'Resolutions'
    ]
  }
})(Resolution);