import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

class RegisterForm extends Component {
  registerUser = (e) => { 
    e.preventDefault();
    Accounts.createUser({
      email: this.email.value,
      password: this.password.value,
    }, err => {
      if(err) return alert(err.message);
      this.props.client.resetStore();
    });
    this.email.value = this.password.value = "";
  }
  render(){
    return (
      <div className="row">
        <form onSubmit={this.registerUser}>
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="email" className="label-control">Email:</label>
            <input type="email" ref={input => (this.email = input)} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label-control">Password:</label>
            <input type="password" ref={input => (this.password = input)} className="form-control" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Register User</button>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterForm;