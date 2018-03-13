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
    }).then(res => {
      this.props.onSaved(res);
    }).catch(err => {
      alert(err.message);
    });
    this.name.value = '';
  }
  render(){
    return (
      <div>
        <input ref={input => (this.name = input)} onClick={this.props.onCancelUpdate} />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    )
  }
}

export default graphql(createResolution, { name: 'createResolution' })(Resolution);