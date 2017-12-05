'use strict';

import React from 'react';

import {newComment} from '../clientHttp';

require('styles//NewComment.css');

class NewCommentComponent extends React.Component {
  onSubmit(e) {
    e.preventDefault();

    const params = new FormData();
    params.append('user_id', 1);
    params.append('thread_id', 1);
    params.append('comment', 'コメント');

    return newComment(params);
  }
  render() {
    return (
      <div className="newcomment-component">
        <form method="POST" onSubmit={this.onSubmit}>
          <input type="text" name="comment"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

NewCommentComponent.displayName = 'NewCommentComponent';

// Uncomment properties you need
// NewCommentComponent.propTypes = {};
// NewCommentComponent.defaultProps = {};

export default NewCommentComponent;
