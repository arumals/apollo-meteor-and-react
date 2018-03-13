import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class LoginForm extends Component {
  loginUser = (e) => { 
    e.preventDefault();
    Meteor.loginWithPassword(
      this.email.value, 
      this.password.value, 
      err => alert(!err ? 'Authenticated!' : err.message)
    );
    this.email.value = this.password.value = "";
  }
  render(){
    return (
      <form onSubmit={this.loginUser}>
        <h2>Login</h2>
        <table>
          <tbody>
            <tr><td>Email:</td><td><input type="email" ref={input => (this.email = input)} /></td></tr>
            <tr><td>Password:</td><td><input type="password" ref={input => (this.password = input)} /></td></tr>
            <tr><td>&nbsp;</td><td><button type="submit">Login</button></td></tr>
          </tbody>
        </table>
        <br />
      </form>
    )
  }
}

export default LoginForm;