'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { _host } from '../clientHttp';

import UserListItem from './UserListItemComponent';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { red600 } from 'material-ui/styles/colors';
require('styles//SettingsPage.css');

const styles = {
  paper: {
    padding: '8px 24px'
  },
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  }
}

class SettingsPageComponent extends React.Component {
  componentDidMount() {
    const { dispatch, user } = this.props;

    if (!user || !user.username) {
      dispatch(push('/login'));
    }
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { user } = nextProps;

    if (!user || !user.username) {
      dispatch(push('/login'));
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div className="settingspage-component">
        <Paper zDepth={2} style={styles.paper}>
          <h3>You</h3>
          <UserListItem
            disabled={true}
            user={user}
          />

          <FlatButton label="ログアウト" secondary={true} />
          <Divider />
          <h3>パスワードの変更</h3>

          <TextField
            hintText=""
            floatingLabelText="現在のパスワード"
            type="password"
          /><br />
          <TextField
            hintText=""
            floatingLabelText="新しいパスワード"
            type="password"
          /><br />
          <TextField
            hintText=""
            floatingLabelText="新しいパスワード（確認用）"
            type="password"
          /><br />

          <Divider />
          <h3>画像の変更</h3>
          <FlatButton
            label={'Choose an Image'}
            labelPosition="before"
            style={styles.uploadButton}
            containerElement="label"
          >
            <input
              type="file"
              name="image"
              ref="image"
              style={styles.uploadInput}
              onChange={this.handleFileChange}
            />
          </FlatButton>
        </Paper>
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
