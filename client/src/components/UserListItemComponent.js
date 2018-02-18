'use strict';

import React from 'react';

// import { _host } from '../clientHttp';
import pluralize from 'pluralize';

import MyAvatar from './MyAvatar';
import ListItem from 'material-ui/List/ListItem';

require('styles//UserListItem.css');

class UserListItemComponent extends React.Component {
  render() {
    const { disabled, user } = this.props;
    const { avatar, username, postsCount, commentsCount } = user;
    return (
      <ListItem
        disabled={disabled}
        leftAvatar={
          <MyAvatar
            src={avatar}
          />
        }
        primaryText={username}
        secondaryText={
          `${postsCount} ${pluralize('post', postsCount)}, ${commentsCount} ${pluralize('comment', commentsCount)}`
        }
      />
    );
  }
}

UserListItemComponent.displayName = 'UserListItemComponent';

// Uncomment properties you need
// UserListItemComponent.propTypes = {};
// UserListItemComponent.defaultProps = {};

export default UserListItemComponent;
