'use strict';

import React from 'react';
import { connect } from 'react-redux';

import {
  trySignIn,
  trySignUp,
} from '../actions/index';

require('styles//Login.css');

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    // const { mode } = this.props;
    // if (mode === 'signin') {
    //   trySignIn();
    // } else if (mode === 'signup') {
    //   trySignUp();
    // }
    this.doSignIn();
  }

  doSignIn() {
    const { dispatch } = this.props;
    const credentials = {
      'username': this.refs.username.value,
      'password': this.refs.password.value
    }
    dispatch(trySignIn(credentials));
    this.refs.username.value = '';
    this.refs.password.value = '';
  }
  doSignUp() {
    const { dispatch } = this.props;
    const credentials = {
      'username': this.refs.username.value,
      'password': this.refs.password.value
    }
    dispatch(trySignUp(credentials));
    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  render() {
    return (
      <div className="login-component">
        <form method="POST" onSubmit={this.onSubmit}>
          <label>username</label>
          <input type="text" name="username" ref="username"/>
          <br/>
          <label>password</label>
          <input type="text" name="password" ref="password"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

LoginComponent.displayName = 'LoginComponent';

// Uncomment properties you need
// LoginComponent.propTypes = {};
// LoginComponent.defaultProps = {};


function mapStateToProps(state) {
  const { userInfo } = state;

  return {
    userInfo
  }
}
const LoginContainer = connect(mapStateToProps)(LoginComponent);
export default LoginContainer;
