import React, { Component } from 'react';

class Goal extends Component {
  render(){
    return (
      <div className="checkbox">
        <label><input type="checkbox" /> {this.props.name}</label>
      </div>
    )
  }
}

export default Goal;