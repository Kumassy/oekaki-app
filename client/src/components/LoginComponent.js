'use strict';

import React from 'react';
import {
  tryLogin,
  trySignIn,
} from '../actions/index';

require('styles//Login.css');

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();


    const { mode } = this.props;
    if (mode === 'login') {
      doLogin();
    } else if (mode === 'signin') {
      doSignIn();
    }
  }

  doLogin() {
    const { dispatch } = this.props;
    const credentials = {
      'username': this.refs.username.value,
      'password': this.refs.password.value
    }
    dispatch(tryLogin(credentials));
    this.refs.username.value = '';
    this.refs.password.value = '';
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

  render() {
    return (
      <div className="login-component">
        <form method="POST" onSubmit={this.onSubmit}>
          <input type="text" name="username" ref="username"/>
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

export default LoginComponent;
