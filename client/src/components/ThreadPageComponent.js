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
    const { match, isFetching, threads } = this.props;
    const myThreadId = parseInt(match.params.id);
    const myThreadContainer = threads.find(th => th.thread.id === myThreadId) || {
      thread: {
        posts: [],
        comments: []
      }
    };
    const myThread = myThreadContainer.thread;
    console.log(myThread);
    const { posts, comments } = myThread;

    return (
      <div className="threadpage-component">
        <ul className="posts">
          {posts.map(post =>
            <li key={post.isSending ? 'sending-post' : post.id}>
              <Post image={`${_host}/${post.image}`}
                    timestamp={post.updated_at}
                    text={post.answer}
                    userName={post.user.username}
                    userAvatar={`${_host}/${post.user.avatar}`}
                    style={{ opacity: post.isSending? 0.5 : 1 }} />
            </li>)}
            <li key="new-post">
              <NewPost dispatch={this.props.dispatch} user={myuser} threadId={myThreadId}></NewPost>
            </li>
        </ul>
        <ul className="comments">
          {comments.map(comment =>
            <li key={comment.isSending ? 'sending-comment' : comment.id}>
              <Comment  userAvatar={`${_host}/${comment.user.avatar}`}
                        userName={comment.user.username}
                        comment={comment.comment}
                        timestamp={comment.updated_at}
                        style={{ opacity: comment.isSending? 0.5 : 1 }} />
            </li>)}
            <li key="new-comment">
              <NewComment dispatch={this.props.dispatch} user={myuser} threadId={myThreadId}></NewComment>
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
  // TODO:
  // ```
  // myThreadContainer = threads.find(th => th.thread.id === myThreadId) || {
  //   thread: {
  //     posts: [],
  //     comments: []
  //   }
  // };
  // ```
  // あたりのロジックをここにかく


  // const {
  //   isFetching,
  //   lastUpdated,
  //   item
  // } = state || {
  //   isFetching: true,
  //   item: {}
  // };
  const { pageThreads } = state;
  // const isFetching = thread.isFetching || true;
  const { threads } = pageThreads;
  // const lastUpdated = thread.lastUpdated;

  return {
    // thread: item,
    // isFetching: isFetching,
    // lastUpdated: lastUpdated
    threads
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
