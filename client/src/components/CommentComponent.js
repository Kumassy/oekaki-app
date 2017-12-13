'use strict';

import React from 'react';

import MyAvatar from './MyAvatar';
import {ListItem} from 'material-ui/List';
require('styles//Comment.scss');

class CommentComponent extends React.Component {
  render() {
    const { userAvatar, userName, comment, timestamp } = this.props;
    return (
      <ListItem
        className="comment-component"
        leftAvatar={
          <MyAvatar
            className="avatar"
            src={userAvatar}
          />}
        primaryText={
          <div className="comment-meta">
            <span className="username">{userName}</span>
            <span className="timestamp">{timestamp}</span>
          </div>
        }
        secondaryText={
          <p className="comment-body">
            {comment}
          </p>
        }
      />
    );
  }
}

CommentComponent.displayName = 'CommentComponent';

// Uncomment properties you need
// CommentComponent.propTypes = {};
// CommentComponent.defaultProps = {};

export default CommentComponent;
