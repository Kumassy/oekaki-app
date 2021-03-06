'use strict';

import React from 'react';

import { _host } from '../clientHttp';
import pluralize from 'pluralize';

import MyAvatar from './MyAvatar';
import ListItem from 'material-ui/List/ListItem';

require('styles//UserListItem.css');

class UserListItemComponent extends React.Component {
  render() {
    const { disabled, user } = this.props;
    const { avatar, username, posts_count, comments_count } = user;
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
          `${posts_count} ${pluralize('post', posts_count)}, ${comments_count} ${pluralize('comment', comments_count)}`
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
