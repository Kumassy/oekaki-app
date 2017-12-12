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
import Subheader from 'material-ui/Subheader'
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
        <List>
          <Subheader>画像一覧</Subheader>
          {posts.map(post =>
            <Link
              className="link"
              to={`/posts/${post.id}`}
              key={post.id}>
              <Post image={post.image}
                    timestamp={post.updated_at}
                    text={post.answer}
                    userName={post.user.username}
                    userAvatar={post.user.avatar}
                    style={{ opacity: post.isSending? 0.5 : 1 }} />
            </Link>)}
        </List>
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
