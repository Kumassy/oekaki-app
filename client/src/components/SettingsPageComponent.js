'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { _host } from '../clientHttp';

import {
  settingsInputCurrentPasswordChanged,
  settingsInputNewPasswordChanged,
  settingsInputNewPasswordConfirmChanged,
  settingsInputClearPassword,
  settingsCloseDialogPassword,
  settingsInputFileChanged,
  settingsInputClearFile,
  settingsCloseDialogFile,

  updatePassword,
  updateAvatar
} from '../actions';

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
  constructor(props) {
    super(props);

    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onSubmitAvatar = this.onSubmitAvatar.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleCurrentPasswordChange = this.handleCurrentPasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleNewPasswordConfirmChange = this.handleNewPasswordConfirmChange.bind(this);
    // this.closeDialog = this.closeDialog.bind(this);
    // this.closeDialogAndRedirect = this.closeDialogAndRedirect.bind(this);
  }

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

  handleFileChange(e) {
    const { dispatch } = this.props;
    dispatch(settingsInputFileChanged(this.refs.image.files[0]));
  }
  handleCurrentPasswordChange(e, newValue) {
    const { dispatch } = this.props;
    dispatch(settingsInputCurrentPasswordChanged(newValue));
  }
  handleNewPasswordChange(e, newValue) {
    const { dispatch } = this.props;
    dispatch(settingsInputNewPasswordChanged(newValue));
  }
  handleNewPasswordConfirmChange(e, newValue) {
    const { dispatch } = this.props;
    dispatch(settingsInputNewPasswordConfirmChanged(newValue));
  }

  onSubmitPassword(e) {
    e.preventDefault();

    const { dispatch, settings } = this.props;
    const { currentPassword, newPassword } = settings.password;

    const credentials = {
      currentPassword,
      newPassword
    }

    dispatch(updatePassword(credentials));
  }
  onSubmitAvatar(e) {
    e.preventDefault();

    const { dispatch, settings } = this.props;
    const { file } = settings.avatar;

    const user = {
      avatar: file
    }

    dispatch(updateAvatar(user));
  }

  render() {
    const { user, settings } = this.props;
    const { password, avatar } = settings;

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
            onChange={this.handleCurrentPasswordChange}
            value={password.currentPassword}
          /><br />
          <TextField
            hintText=""
            floatingLabelText="新しいパスワード"
            type="password"
            errorText={password.isPasswordMatch ? '' : 'パスワードが一致しません'}
            onChange={this.handleNewPasswordChange}
            value={password.newPassword}
          /><br />
          <TextField
            hintText=""
            floatingLabelText="新しいパスワード（確認用）"
            type="password"
            errorText={password.isPasswordMatch ? '' : 'パスワードが一致しません'}
            onChange={this.handleNewPasswordConfirmChange}
            value={password.newPasswordConfirm}
          /><br />
          <FlatButton
            label="Submit"
            disabled={!password.isValid}
            onClick={this.onSubmitPassword} />

          <Divider />
          <h3>画像の変更</h3>
          <FlatButton
            label={avatar.file && avatar.file.name ? avatar.file.name : 'Choose an Image'}
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
          </FlatButton><br />
          <FlatButton
            label="Submit"
            disabled={!avatar.isValid}
            onClick={this.onSubmitAvatar} />
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
  const { userInfo, pageSettings } = state;
  const { user } = userInfo;

  return {
    user,
    settings: pageSettings
  }
}
const SettingsPageContainer = connect(mapStateToProps)(SettingsPageComponent);
export default SettingsPageContainer;
