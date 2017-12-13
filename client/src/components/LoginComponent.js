'use strict';

import React from 'react';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {
  trySignIn,
  trySignUp,
  trySignOut,
  fetchLoggedInUser,
  switchSignInMode,
  loginInputChanged,
  loginInputClear
} from '../actions/index';

require('styles//Login.scss');

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.doSignIn = this.doSignIn.bind(this);
    this.doSignUp = this.doSignUp.bind(this);
    this.doSignOut = this.doSignOut.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

    const { dispatch, loginInput } = this.props;
    const credentials = {
      'username': loginInput.username,
      'password': loginInput.password
    }
    dispatch(trySignIn(credentials));
  }
  doSignUp(e) {
    e.preventDefault();

    const { dispatch, loginInput } = this.props;
    const credentials = {
      'username': loginInput.username,
      'password': loginInput.password
    }
    dispatch(trySignUp(credentials));
  }
  doSignOut(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(trySignOut());
  }

  handleUsernameChange(e, username) {
    const { dispatch } = this.props;
    dispatch(loginInputChanged({
      username
    }));
  }
  handlePasswordChange(e, password) {
    const { dispatch } = this.props;
    dispatch(loginInputChanged({
      password
    }));
  }

  handleModeChange(mode) {
    const { dispatch } = this.props;
    dispatch(switchSignInMode(mode));
  }

  render() {
    const { status, user, loginInput } = this.props;
    return (
      <div className="login-component">
        <Tabs
          value={status.mode}
          onChange={this.handleModeChange}
        >
          <Tab label="Sign In" value="signin">
            <div>
              <form>
                <TextField
                  hintText=""
                  floatingLabelText="ユーザー名"
                  type="text"
                  onChange={this.handleUsernameChange}
                  value={loginInput.username}
                /><br />
                <TextField
                  hintText=""
                  floatingLabelText="パスワード"
                  type="password"
                  onChange={this.handlePasswordChange}
                  value={loginInput.password}
                /><br />
                <FlatButton
                  label="Submit"
                  disabled={!loginInput.isValid}
                  onClick={this.doSignIn} />
              </form>
            </div>
          </Tab>
          <Tab label="Sign Up" value="signup">
            <div>
              <form>
                <TextField
                  hintText=""
                  floatingLabelText="ユーザー名"
                  type="text"
                  onChange={this.handleUsernameChange}
                  value={loginInput.username}
                /><br />
                <TextField
                  hintText=""
                  floatingLabelText="パスワード"
                  type="password"
                  onChange={this.handlePasswordChange}
                  value={loginInput.password}
                /><br />
                <FlatButton
                  label="Submit"
                  disabled={!loginInput.isValid}
                  onClick={this.doSignUp} />
              </form>
            </div>
          </Tab>
        </Tabs>
        <div className="error-message">
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
  const { user, status, loginInput } = userInfo;

  return {
    user,
    status,
    loginInput
  }
}
const LoginContainer = connect(mapStateToProps)(LoginComponent);
export default LoginContainer;
