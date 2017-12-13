'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import MyAvatar from './MyAvatar';

import FlatButton from 'material-ui/FlatButton';

require('styles//UserIconButton.css');

class UserIconButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleAvatarClick(e) {
    const { dispatch } = this.props;
    dispatch(push('/settings'));
  }
  handleButtonClick(e) {
    const { dispatch } = this.props;
    dispatch(push('/login'));
  }

  render() {
    const { user } = this.props;
    return (
      <div className="usericonbutton-component">
        {user.id &&
          <MyAvatar
            src={user.avatar}
            onClick={this.handleAvatarClick}
            style={{cursor: 'pointer'}}
          />
        }
        {!user.id &&
          <FlatButton
            label="ログイン"
            primary={true}
            onClick={this.handleButtonClick}
            backgroundColor="#eee"
            hoverColor="#ddd"
          />
        }
      </div>
    );
  }
}

UserIconButtonComponent.displayName = 'UserIconButtonComponent';

// Uncomment properties you need
// UserIconButtonComponent.propTypes = {};
// UserIconButtonComponent.defaultProps = {};


function mapStateToProps(state) {
  const { userInfo } = state;
  const { user } = userInfo;

  return {
    user
  }
}
const UserIconButtonContainer = connect(mapStateToProps)(UserIconButtonComponent);
export default UserIconButtonContainer;
