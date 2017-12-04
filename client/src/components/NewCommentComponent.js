'use strict';

import React from 'react';

import {clientHttp, newComment} from '../clientHttp';

require('styles//NewComment.css');

class NewCommentComponent extends React.Component {
  onSubmit(e) {
    e.preventDefault();

    const params = new FormData();
    params.append('image', document.querySelector('.newcomment-component input[name=\'image\']'));
    params.append('user_id', 1);
    params.append('answer', 'ついったー');

    newComment(params);
  }
  render() {
    return (
      <div className="newcomment-component">
        <form method="POST" onSubmit={this.onSubmit}>
          <input type="file" name="image"/>
          <button type="submit">Submit</button>
        </form>
        Please edit src/components///NewCommentComponent.js to update this component!
      </div>
    );
  }
}

NewCommentComponent.displayName = 'NewCommentComponent';

// Uncomment properties you need
// NewCommentComponent.propTypes = {};
// NewCommentComponent.defaultProps = {};

export default NewCommentComponent;
