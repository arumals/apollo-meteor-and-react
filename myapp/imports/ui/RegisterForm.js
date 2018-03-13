import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

class RegisterForm extends Component {
  registerUser = (e) => { 
    e.preventDefault();
    Accounts.createUser({
      email: this.email.value,
      password: this.password.value,
    }, err => alert(!err ? 'Registered' : err.message));
    this.email.value = this.password.value = "";
  }
  render(){
    return (
      <form onSubmit={this.registerUser}>
        <h2>Register</h2>
        <table>
          <tbody>
            <tr><td>Email:</td><td><input type="email" ref={input => (this.email = input)} /></td></tr>
            <tr><td>Password:</td><td><input type="password" ref={input => (this.password = input)} /></td></tr>
            <tr><td>&nbsp;</td><td><button type="submit">Register User</button></td></tr>
          </tbody>
        </table>
        <br />
      </form>
    )
  }
}

export default RegisterForm;