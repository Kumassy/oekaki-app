'use strict';

import React from 'react';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';

import {
  trySignIn,
  trySignUp,
  trySignOut,
  fetchLoggedInUser,
  switchSignInMode
} from '../actions/index';

require('styles//Login.css');

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.doSignIn = this.doSignIn.bind(this);
    this.doSignUp = this.doSignUp.bind(this);
    this.doSignOut = this.doSignOut.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }

  // onSubmit(e) {
  //   e.preventDefault();
  //
  //   // const { mode } = this.props;
  //   // if (mode === 'signin') {
  //   //   trySignIn();
  //   // } else if (mode === 'signup') {
  //   //   trySignUp();
  //   // }
  //   this.doSignIn();
  // }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchLoggedInUser());
  }

  doSignIn(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const credentials = {
      'username': this.refs.usernameSignIn.value,
      'password': this.refs.passwordSignIn.value
    }
    dispatch(trySignIn(credentials));
    this.refs.usernameSignIn.value = '';
    this.refs.passwordSignIn.value = '';
  }
  doSignUp(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const credentials = {
      'username': this.refs.usernameSignUp.value,
      'password': this.refs.passwordSignUp.value
    }
    dispatch(trySignUp(credentials));
    this.refs.usernameSignUp.value = '';
    this.refs.passwordSignUp.value = '';
  }
  doSignOut(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(trySignOut());
  }

  handleModeChange(mode) {
    const { dispatch } = this.props;
    dispatch(switchSignInMode(mode));
  }

  render() {
    const { status, user } = this.props;
    return (
      <div className="login-component">
        <Tabs
          value={status.mode}
          onChange={this.handleModeChange}
        >
          <Tab label="Sign In" value="signin">
            <div>
              <form method="POST" onSubmit={this.doSignIn}>
                <label>username</label>
                <input type="text" name="username" ref="usernameSignIn"/>
                <br/>
                <label>password</label>
                <input type="text" name="password" ref="passwordSignIn"/>
                <button type="submit">Submit</button>
              </form>
            </div>
          </Tab>
          <Tab label="Sign Up" value="signup">
            <div>
              <form method="POST" onSubmit={this.doSignUp}>
                <label>username</label>
                <input type="text" name="username" ref="usernameSignUp"/>
                <br/>
                <label>password</label>
                <input type="text" name="password" ref="passwordSignUp"/>
                <button type="submit">Submit</button>
              </form>
            </div>
          </Tab>
        </Tabs>
        <button onClick={this.doSignOut}>Sign Out</button>
        <div>
          Sign In as: {user.username}
        </div>
        <div>
          {status.error.message}
        </div>
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
    user: userInfo.user,
    status: userInfo.status
  }
}
const LoginContainer = connect(mapStateToProps)(LoginComponent);
export default LoginContainer;
