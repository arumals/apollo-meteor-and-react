import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const updateResolution = gql`
  mutation updateResolution($id: String!, $name: String!){
    updateResolution(id: $id, name: $name){
      _id
    }
  }
`;

const removeResolution = gql`
  mutation removeResolution($id: String!){
    removeResolution(id: $id){
      _id
    }
  }
`;

class EditResolutionForm extends Component {
  onClickSave = () => {
    if(!this.name.value) return this.props.onCancelUpdate();
    this.props.updateResolution({
      variables: { 
        id: this.props._id, 
        name: this.name.value,
      }
    }).then(res => {
      this.props.onUpdated();
    }).catch(err => {
      alert(err.message);
    });
  }
  onClickCancel = () => {
    this.props.onCancelUpdate();
  }
  onClickRemove = () => {
    this.props.removeResolution({ 
      variables: { 
        id: this.props._id 
      } 
    }).then(res => {
      this.props.onUpdated();
    }).catch(err => {
      alert(err.message);
    });
  }
  render(){
    return (
      <div className="edit-form">
        <input ref={input => (this.name = input)} placeholder={this.props.name} />
        <button onClick={this.onClickSave}>Save</button>
        <button onClick={this.onClickCancel}>Cancel</button>
        <button onClick={this.onClickRemove}>Remove</button>
      </div>
    )
  }
}

export default compose(
  graphql(updateResolution, { name: 'updateResolution', options: { refetchQueries: ['Resolutions'] } }),
  graphql(removeResolution, { name: 'removeResolution', options: { refetchQueries: ['Resolutions'] } })
)(EditResolutionForm);