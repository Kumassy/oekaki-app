'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
  createPost
} from '../actions';
require('styles//NewPost.css');

class NewPostComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch, user, threadId } = this.props;
    const post = {
      'user': user,
      'thread_id': parseInt(threadId),
      'answer': this.refs.input.value,
      'image': this.refs.image.files[0]
    }

    // const params = new FormData();
    // params.append('image', document.querySelector('.newpost-component input[name=\'image\']').files[0]);
    // params.append('user_id', 1);
    // params.append('thread_id', 1);
    // params.append('answer', 'ついったー');
    //
    // newPost(params);
    dispatch(createPost(post));
    this.refs.input.value = '';
  }
  render() {
    return (
      <div className="newpost-component">
        <form method="POST" onSubmit={this.onSubmit}>
          <input type="file" name="image" ref="image"/>
          <input type="text" name="comment" ref="input"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

NewPostComponent.displayName = 'NewPostComponent';

// Uncomment properties you need
// NewPostComponent.propTypes = {};
// NewPostComponent.defaultProps = {};


function mapStateToProps(state) {
  const { userInfo } = state;
  const { user } = userInfo;

  return {
    user
  }
}
const NewPostContainer = connect(mapStateToProps)(NewPostComponent);
export default NewPostContainer;
