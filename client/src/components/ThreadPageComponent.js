'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'

import configureStore from '../stores/configureStore';
import {
  fetchThreadIfNeeded
} from '../actions';

import { _host, getThread } from '../clientHttp';
import Post from './PostComponent';
import Comment from './CommentComponent';
import NewComment from './NewCommentComponent';
import NewPost from './NewPostComponent';

require('styles//ThreadPage.css');

const myuser = {
  id: 1,
  username: "pandaman",
  avatar: "images/pandaman.jpg"
};

class ThreadPageComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchThreadIfNeeded(match.params.id));
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, match } = this.props;
    if (match.params.id !== nextProps.match.params.id) {
      dispatch(fetchThreadIfNeeded(nextProps.match.params.id));
    }
  }

  render() {
    const { isFetching, thread } = this.props;
    const posts = thread.posts || [];
    const comments = thread.comments || [];

    return (
      <div className="threadpage-component">
        <ul className="posts">
          {posts.map(post =>
            <li key={post.id}>
              <Post image={`${_host}/${post.image}`}
                    timestamp={post.timestamp}
                    text={post.answer}
                    userName={post.user.username}
                    userAvatar={`${_host}/${post.user.avatar}`} />
            </li>)}
            <li key="new-post">
              <NewPost dispatch={this.props.dispatch} user={myuser} threadId={thread.id}></NewPost>
            </li>
        </ul>
        <ul className="comments">
          {comments.map(comment =>
            <li key={comment.isSending ? 'sending-comment' : comment.id}>
              <Comment  userAvatar={`${_host}/${comment.user.avatar}`}
                        userName={comment.user.username}
                        comment={comment.comment}
                        timestamp={comment.timestamp}
                        style={{ opacity: comment.isSending? 0.5 : 1 }} />
            </li>)}
            <li key="new-comment">
              <NewComment dispatch={this.props.dispatch} user={myuser} threadId={thread.id}></NewComment>
            </li>
        </ul>
      </div>
    );
  }
}

ThreadPageComponent.displayName = 'ThreadPageComponent';

// Uncomment properties you need
// ThreadPageComponent.propTypes = {};
// ThreadPageComponent.defaultProps = {};

function mapStateToProps(state) {
  // const {
  //   isFetching,
  //   lastUpdated,
  //   item
  // } = state || {
  //   isFetching: true,
  //   item: {}
  // };
  const { thread } = state;
  const isFetching = thread.isFetching || true;
  const item = thread.item || {};
  const lastUpdated = thread.lastUpdated;

  return {
    thread: item,
    isFetching: isFetching,
    lastUpdated: lastUpdated
  };
}

const ThreadPage = connect(mapStateToProps)(ThreadPageComponent);

const store = configureStore();

export default class ThreadPageContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThreadPage match={this.props.match}/>
      </Provider>
    )
  }
}

// export default ThreadPageComponent;
