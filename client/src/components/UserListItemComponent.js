'use strict';

import React from 'react';

import pluralize from 'pluralize';

import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';

require('styles//UserListItem.css');

class UserListItemComponent extends React.Component {
  render() {
    const { disabled, user} = this.props;
    const { avatar, username, posts_count, comments_count } = user;
    return (
      <ListItem
        disabled={disabled}
        leftAvatar={
          <Avatar
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
