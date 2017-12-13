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
import {List} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import ClosedIcon from 'material-ui/svg-icons/av/not-interested';

import Comment from './CommentComponent';
import NewComment from './NewCommentComponent';
import NewPost from './NewPostComponent';

require('styles//ThreadPage.scss');

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
      },
      status: {
        error: {}
      }
    };
    const myThread = myThreadContainer.thread;
    const error = myThreadContainer.status.error;
    console.log(myThread);
    const { posts, comments } = myThread;

    return (
      <div className="threadpage-component">
        <Paper
          zDepth={2}
          className="paper">
          <List>
            {posts.map(post =>
              <Post
                key={post.isSending ? 'sending-post' : post.id}
                image={post.image}
                timestamp={post.updated_at}
                text={myThread.is_open ? '' : post.answer}
                userId={post.user.id}
                userName={post.user.username}
                userAvatar={post.user.avatar}
                style={{ opacity: post.isSending? 0.5 : 1 }} />
              )}
            {myThread.is_open && (<NewPost threadId={myThreadId}></NewPost>)}
            {!myThread.is_open && (<div className="thread-closed"><ClosedIcon/>このスレッドは終了しました</div>)}
          </List>
          <List>
          {comments.map(comment =>
            <Comment
              key={comment.isSending ? 'sending-comment' : comment.id}
              userAvatar={comment.user.avatar}
              userName={comment.user.username}
              comment={comment.comment}
              timestamp={comment.updated_at}
              style={{ opacity: comment.isSending? 0.5 : 1 }} />
            )}
            <NewComment threadId={myThreadId}></NewComment>
          </List>
        </Paper>
      </div>
    );
  }
}

ThreadPageComponent.displayName = 'ThreadPageComponent';

// Uncomment properties you need
// ThreadPageComponent.propTypes = {};
// ThreadPageComponent.defaultProps = {};

// ownProps
// See: https://github.com/reactjs/redux/issues/693
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

const ThreadPageContainer = connect(mapStateToProps)(ThreadPageComponent);
export default ThreadPageContainer;


// const ThreadPage = connect(mapStateToProps)(ThreadPageComponent);

// const store = configureStore();
//
// export default class ThreadPageContainer extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <ThreadPage match={this.props.match}/>
//       </Provider>
//     )
//   }
// }

// export default ThreadPageComponent;
