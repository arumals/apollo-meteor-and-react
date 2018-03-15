import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import GoalForm from './GoalForm';

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
        id: this.props.resolutionId, 
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
        id: this.props.resolutionId 
      } 
    }).then(res => {
      this.props.onUpdated();
    }).catch(err => {
      alert(err.message);
    });
  }
  render(){
    return (
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <form onSubmit={this.onSubmit} style={{marginBottom:'5px'}}>
            <div className="input-group">
              <input ref={input => (this.name = input)} placeholder={this.props.name} className="form-control" />
              <div className="input-group-btn">
                <button type="submit" className="btn btn-default">Save</button>
                <button type="button" onClick={this.onClickCancel} className="btn btn-default">Cancel</button>
                <button type="button" onClick={this.onClickRemove} className="btn btn-default">Remove</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-xs-12 col-md-4">
          <GoalForm resolutionId={this.props.resolutionId} />
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(updateResolution, { name: 'updateResolution', options: { refetchQueries: ['Resolutions'] } }),
  graphql(removeResolution, { name: 'removeResolution', options: { refetchQueries: ['Resolutions'] } })
)(EditResolutionForm);