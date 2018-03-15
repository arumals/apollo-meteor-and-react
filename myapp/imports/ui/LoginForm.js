import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class LoginForm extends Component {
  loginUser = (e) => { 
    e.preventDefault();
    Meteor.loginWithPassword(
      this.email.value, 
      this.password.value, 
      err => {
        if(err) return alert(err.message);
        this.props.client.resetStore();
      }
    );
    this.email.value = this.password.value = "";
  }
  render(){
    return (
      <div className="row">
        <form onSubmit={this.loginUser}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="emal" className="label-control">Email:</label>
            <input type="email" ref={input => (this.email = input)} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label-control">Password</label>
            <input type="password" ref={input => (this.password = input)} className="form-control" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm;