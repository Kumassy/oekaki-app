'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import { _host } from '../clientHttp';

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
  updateAvatar,

  trySignOut
} from '../actions';

import UserListItem from './UserListItemComponent';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { red600 } from 'material-ui/styles/colors';
require('styles//SettingsPage.scss');

const styles = {
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

    // this.onSubmitPassword = this.onSubmitPassword.bind(this);
    // this.onSubmitAvatar = this.onSubmitAvatar.bind(this);
    // this.handleFileChange = this.handleFileChange.bind(this);
    // this.handleCurrentPasswordChange = this.handleCurrentPasswordChange.bind(this);
    // this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    // this.handleNewPasswordConfirmChange = this.handleNewPasswordConfirmChange.bind(this);
    // this.closeDialogPassword = this.closeDialogPassword.bind(this);
    // this.closeDialogPasswordAndRedirect = this.closeDialogPasswordAndRedirect.bind(this);
    // this.closeDialogAvatar = this.closeDialogAvatar.bind(this);
    // this.closeDialogAvatarAndRedirect = this.closeDialogAvatarAndRedirect.bind(this);
    this.doSignOut = this.doSignOut.bind(this);
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

  // handleFileChange(e) {
  //   const { dispatch } = this.props;
  //   dispatch(settingsInputFileChanged(this.refs.image.files[0]));
  // }
  // handleCurrentPasswordChange(e, newValue) {
  //   const { dispatch } = this.props;
  //   dispatch(settingsInputCurrentPasswordChanged(newValue));
  // }
  // handleNewPasswordChange(e, newValue) {
  //   const { dispatch } = this.props;
  //   dispatch(settingsInputNewPasswordChanged(newValue));
  // }
  // handleNewPasswordConfirmChange(e, newValue) {
  //   const { dispatch } = this.props;
  //   dispatch(settingsInputNewPasswordConfirmChanged(newValue));
  // }
  //
  // closeDialogPassword() {
  //   const { dispatch } = this.props;
  //   dispatch(settingsCloseDialogPassword());
  // }
  // closeDialogPasswordAndRedirect() {
  //   const { dispatch } = this.props;
  //   dispatch(settingsCloseDialogPassword());
  //   dispatch(push('/login'));
  // }
  //
  // closeDialogAvatar() {
  //   const { dispatch } = this.props;
  //   dispatch(settingsCloseDialogFile());
  // }
  // closeDialogAvatarAndRedirect() {
  //   const { dispatch } = this.props;
  //   dispatch(settingsCloseDialogFile());
  //   dispatch(push('/login'));
  // }
  //
  doSignOut(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(trySignOut());
  }
  //
  //
  // onSubmitPassword(e) {
  //   e.preventDefault();
  //
  //   const { dispatch, settings } = this.props;
  //   const { currentPassword, newPassword } = settings.password;
  //
  //   const credentials = {
  //     currentPassword,
  //     newPassword
  //   }
  //
  //   dispatch(updatePassword(credentials));
  // }
  // onSubmitAvatar(e) {
  //   e.preventDefault();
  //
  //   const { dispatch, settings } = this.props;
  //   const { file } = settings.avatar;
  //
  //   const user = {
  //     avatar: file
  //   }
  //
  //   dispatch(updateAvatar(user));
  // }

  render() {
    const { user, settings } = this.props;
    const { password, avatar } = settings;


    // let actions = {
    //   password: [],
    //   avatar: []
    // };
    // switch(password.error.type) {
    //   case 'INVALID_INPUT':
    //   case 'EMPTY_INPUT':
    //     actions.password = [
    //       <FlatButton
    //         label="OK"
    //         primary={true}
    //         keyboardFocused={true}
    //         onClick={this.closeDialogPassword}
    //       />
    //     ];
    //     break;
    //   case 'SIGNIN_REQUIRED':
    //     actions.password = [
    //       <FlatButton
    //         label="Cancel"
    //         primary={false}
    //         onClick={this.closeDialogPassword}
    //       />,
    //       <FlatButton
    //         label="ログインページへ移動"
    //         primary={true}
    //         keyboardFocused={true}
    //         onClick={this.closeDialogPasswordAndRedirect}
    //       />
    //     ];
    //     break;
    //   default:
    //     actions.password = [
    //       <FlatButton
    //         label="OK"
    //         primary={true}
    //         keyboardFocused={true}
    //         onClick={this.closeDialogPassword}
    //       />
    //     ];
    // }
    // switch(avatar.error.type) {
    //   case 'EMPTY_INPUT':
    //     actions.avatar = [
    //       <FlatButton
    //         label="OK"
    //         primary={true}
    //         keyboardFocused={true}
    //         onClick={this.closeDialogAvatar}
    //       />
    //     ];
    //     break;
    //   case 'SIGNIN_REQUIRED':
    //     actions.avatar = [
    //       <FlatButton
    //         label="Cancel"
    //         primary={false}
    //         onClick={this.closeDialogAvatar}
    //       />,
    //       <FlatButton
    //         label="ログインページへ移動"
    //         primary={true}
    //         keyboardFocused={true}
    //         onClick={this.closeDialogAvatarAndRedirect}
    //       />
    //     ];
    //     break;
    //   default:
    //     actions.avatar = [
    //       <FlatButton
    //         label="OK"
    //         primary={true}
    //         keyboardFocused={true}
    //         onClick={this.closeDialogAvatar}
    //       />
    //     ];
    // }

    return (
      <div className="settingspage-component">
        <Paper
          zDepth={2}
          className="paper">
          <h3>You</h3>
          <UserListItem
            disabled={true}
            user={user}
          />

          <FlatButton
            label="ログアウト"
            secondary={true}
            onClick={this.doSignOut} />

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
