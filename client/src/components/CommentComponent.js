'use strict';

import React from 'react';

import MyAvatar from './MyAvatar';
require('styles//Comment.scss');

class CommentComponent extends React.Component {
  render() {
    const { userAvatar, userName, comment, timestamp } = this.props;
    return (
      <div className="comment-component">
        <div className="comment-avatar">
          <MyAvatar
            src={userAvatar}
          />
        </div>
        <div className="comment-body">
          <div className="username">{userName}</div>
          <div className="comment">{comment}</div>
          <div className="timestamp">{timestamp}</div>
        </div>
      </div>
    );
  }
}

CommentComponent.displayName = 'CommentComponent';

// Uncomment properties you need
// CommentComponent.propTypes = {};
// CommentComponent.defaultProps = {};

export default CommentComponent;
