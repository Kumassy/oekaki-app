'use strict';

import React from 'react';
import PropTypes from 'prop-types'

require('styles//Post.scss');

class PostComponent extends React.Component {
  render() {
    return (
      <div className="post-component">
        <div className="post-image">
          <img src={this.props.image} />
        </div>
        <div className="post-meta">
          <div className="post-account">
            <img src={this.props.userAvatar}/>
            <span className="screen-name">{this.props.userName}</span>
            <span className="timestamp">{this.props.timestamp}</span>
          </div>
          <div className="post-text">
            {this.props.text}
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
