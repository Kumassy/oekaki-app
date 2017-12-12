'use strict';

import React from 'react';
import PropTypes from 'prop-types'

import MyAvatar from './MyAvatar';

import { _host } from '../clientHttp';
require('styles//Post.scss');

class PostComponent extends React.Component {
  render() {
    const { image, userAvatar, userName, timestamp, text } = this.props;
    return (
      <div className="post-component">
        <div className="post-image">
          <img src={image.startsWith('images/') ? `${_host}/${image}` : image} />

        </div>
        <div className="post-meta">
          <div className="post-account">
            <MyAvatar
              src={userAvatar}
            />
            <span className="screen-name">{userName}</span>
            <span className="timestamp">{timestamp}</span>
          </div>
          <div className="post-text">
            {text}
          </div>
          <div className="post-action">
            ******Action******
          </div>
        </div>
      </div>
    );
  }
}

PostComponent.displayName = 'PostComponent';

// Uncomment properties you need
PostComponent.propTypes = {
  // post: PropTypes.oneOfType([PropTypes.object]).isRequired
};
// PostComponent.defaultProps = {};

export default PostComponent;
