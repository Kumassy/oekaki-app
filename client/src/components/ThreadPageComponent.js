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

class ThreadPageComponent extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //     thread: {}
    // };
  }

  componentDidMount() {
    // this.fetchData(this.props.match.params.id);
    // console.log(this.props);
    const { dispatch, match } = this.props;
    dispatch(fetchThreadIfNeeded(match.params.id));
  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.match.params.id !== nextProps.match.params.id) {
    //   this.fetchData(nextProps.match.params.id);
    // }
    const { dispatch, match } = this.props;
    if (match.params.id !== nextProps.match.params.id) {
      dispatch(fetchThreadIfNeeded(nextProps.match.params.id));
    }
  }

  // fetchData(id) {
  //   // return _posts[id];
  //   getThread(id).then((thread) => {
  //     this.setState({
  //       thread: thread
  //     });
  //   });
  // }

  render() {
    console.log('render');
    console.log(this.props);
    // const thread = this.state.thread;
    const { isFetching, thread } = this.props;
    // const thread = this.props.thread;
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
              <NewPost></NewPost>
            </li>
        </ul>
        <ul className="comments">
          {comments.map(comment =>
            <li key={comment.id}>
              <Comment  userAvatar={`${_host}/${comment.user.avatar}`}
                        userName={comment.user.username}
                        comment={comment.comment}
                        timestamp={comment.timestamp} />
            </li>)}
            <li key="new-comment">
              <NewComment></NewComment>
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
  console.log('beforemap')
  console.log(state);
  // const {
  //   isFetching,
  //   lastUpdated,
  //   item
  // } = state || {
  //   isFetching: true,
  //   item: {}
  // };
  const isFetching = state.thread.isFetching || true;
  const item = state.thread.item || {};
  const lastUpdated = state.thread.lastUpdated;

  const ret =  {
    thread: item,
    isFetching: isFetching,
    lastUpdated: lastUpdated
  };
  console.log('aftermap')
  console.log(ret);

  return ret;
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
