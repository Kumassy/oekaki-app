'use strict';

import React from 'react';

require('styles//Comment.scss');

class CommentComponent extends React.Component {
  render() {
    return (
      <div className="comment-component">
        <div className="comment-avatar">
          <img src={this.props.userAvatar} />
        </div>
        <div className="comment-body">
          <div className="username">{this.props.userName}</div>
          <div className="comment">{this.props.comment}</div>
          <div className="timestamp">{this.props.timestamp}</div>
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
