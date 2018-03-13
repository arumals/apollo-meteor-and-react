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
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td><input ref={input => (this.name = input)} onClick={this.props.onCancelUpdate} /></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td><button onClick={this.submitForm}>Submit</button></td>
            </tr>
          </tbody>
        </table>
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