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
  submitForm = () => {
    this.props.createResolution({
      variables: {
        name: this.name.value
      }
    }).then(val => {
      this.props.refetch();
    }).catch(err => {
      console.error(err);
    })
  }
  render(){
    return (
      <div>
        <input ref={input => (this.name = input)} />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    )
  }
}

export default graphql(createResolution, { name: 'createResolution' })(Resolution);