'use strict';

import React from 'react';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom';

import {
  fetchPosts
} from '../actions/index'
import {List} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Post from './PostComponent';

require('styles//PostsPage.scss');

class PostsPageComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="postspage-component">
        <Paper
          zDepth={2}
          className="paper">
          <List>
            <Subheader>画像一覧</Subheader>
            {posts.map(post =>
              <Post
                key={post.id}
                threadId={post.threadId}
                image={post.image.name}
                timestamp={post.updatedAt}
                text={post.caption}
                userId={post.user.id}
                userName={post.user.username}
                userAvatar={post.user.avatar}
                style={{ opacity: post.isSending? 0.5 : 1 }} />
            )}
          </List>
        </Paper>
      </div>
    );
  }
}

PostsPageComponent.displayName = 'PostsPageComponent';

// Uncomment properties you need
// PostsPageComponent.propTypes = {};
// PostsPageComponent.defaultProps = {};

function mapStateToProps(state) {
  const { pagePosts } = state;
  const { posts } = pagePosts;

  return {
    posts
  }
}
const PostsPageContainer = connect(mapStateToProps)(PostsPageComponent);
export default PostsPageContainer;
