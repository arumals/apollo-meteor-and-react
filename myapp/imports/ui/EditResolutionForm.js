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
  componentDidMount(){
    this.name.focus();
  }
  onSubmit = (e) => {
    e.preventDefault();
    if(this.name.value.trim().length == 0) return this.onClickCancel();
    this.props.updateResolution({
      variables: { 
        id: this.props._id, 
        name: this.name.value.trim(),
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
        <form onSubmit={this.onSubmit}>
          <input ref={input => (this.name = input)} placeholder={this.props.name} />
          <button type="submit">Save</button>
          <button type="button" onClick={this.onClickCancel}>Cancel</button>
          <button type="button" onClick={this.onClickRemove}>Remove</button>
        </form>
      </div>
    )
  }
}

export default compose(
  graphql(updateResolution, { name: 'updateResolution', options: { refetchQueries: ['Resolutions'] } }),
  graphql(removeResolution, { name: 'removeResolution', options: { refetchQueries: ['Resolutions'] } })
)(EditResolutionForm);