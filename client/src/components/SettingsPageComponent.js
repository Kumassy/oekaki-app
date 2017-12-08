'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { _host } from '../clientHttp';

require('styles//SettingsPage.css');

class SettingsPageComponent extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="settingspage-component">
        <ul>
          <li>username: {user.username}</li>
          <li>avatar: <img src={`${_host}/${user.avatar}`} /></li>
        </ul>
      </div>
    );
  }
}

SettingsPageComponent.displayName = 'SettingsPageComponent';

// Uncomment properties you need
// SettingsPageComponent.propTypes = {};
// SettingsPageComponent.defaultProps = {};

function mapStateToProps(state) {
  const { userInfo } = state;
  const { user } = userInfo;

  return {
    user
  }
}
const SettingsPageContainer = connect(mapStateToProps)(SettingsPageComponent);
export default SettingsPageContainer;
