'use strict';

import React from 'react';

import Login from './LoginComponent';
import Paper from 'material-ui/Paper';
require('styles//LoginPage.scss');

class LoginPageComponent extends React.Component {
  render() {
    return (
      <div className="loginpage-component">
        <Paper
          zDepth={2}
          className="paper">
          <Login></Login>
        </Paper>
      </div>
    );
  }
}

LoginPageComponent.displayName = 'LoginPageComponent';

// Uncomment properties you need
// LoginPageComponent.propTypes = {};
// LoginPageComponent.defaultProps = {};

export default LoginPageComponent;
