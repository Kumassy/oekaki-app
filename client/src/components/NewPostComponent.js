'use strict';

import React from 'react';

import {newPost} from '../clientHttp';

require('styles//NewPost.css');

class NewPostComponent extends React.Component {
  onSubmit(e) {
    e.preventDefault();

    const params = new FormData();
    params.append('image', document.querySelector('.newpost-component input[name=\'image\']').files[0]);
    params.append('user_id', 1);
    params.append('answer', 'ついったー');

    newPost(params);
  }
  render() {
    return (
      <div className="newpost-component">
        <form method="POST" onSubmit={this.onSubmit}>
          <input type="file" name="image"/>
          <button type="submit">Submit</button>
        </form>
        Please edit src/components///NewPostComponent.js to update this component!
      </div>
    );
  }
}

NewPostComponent.displayName = 'NewPostComponent';

// Uncomment properties you need
// NewPostComponent.propTypes = {};
// NewPostComponent.defaultProps = {};

export default NewPostComponent;
