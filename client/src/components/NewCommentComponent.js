'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';

import {
  createComment
} from '../actions';
import {newComment} from '../clientHttp';

require('styles//NewComment.css');

class NewCommentComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();

    // const params = new FormData();
    // params.append('user_id', 1);
    // params.append('thread_id', 1);
    // params.append('comment', 'コメント');

    // return newComment(params);

    const { dispatch, user, threadId } = this.props;
    const comment = {
      'user': user,
      'thread_id': parseInt(threadId),
      'comment': this.refs.input.value
    }
    dispatch(createComment(comment));
    this.refs.input.value = '';
  }
  render() {
    return (
      <div className="newcomment-component">
        <form method="POST" onSubmit={this.onSubmit}>
          <input type="text" name="comment" ref="input"/>
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



function mapStateToProps(state) {
  const { userInfo } = state;
  const { user } = userInfo;

  return {
    user
  }
}
const NewComponentContainer = connect(mapStateToProps)(NewCommentComponent);
export default NewComponentContainer;
