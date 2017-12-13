'use strict';

import React from 'react';
import { connect } from 'react-redux';

import {
  Link
} from 'react-router-dom';

import {
  fetchUserPosts
} from '../actions/index'
import UserListItem from './UserListItemComponent';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper';
import Post from './PostComponent';

require('styles//UserPage.scss');


class UserPageComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchUserPosts(match.params.id));
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, match } = this.props;
    if (match.params.id !== nextProps.match.params.id) {
      dispatch(fetchUserPosts(nextProps.match.params.id));
    }
  }

  render() {
    const { posts, user } = this.props;

    return (
      <div className="userpage-component">
        <Paper
          zDepth={2}
          className="paper">
          <UserListItem
            disabled={true}
            user={user}
          />
          <List>
            <Subheader>画像一覧</Subheader>
            {posts.map(post =>
              <Post
                  key={post.id}
                  threadId={post.thread_id}
                  image={post.image}
                  timestamp={post.updated_at}
                  text={post.answer}
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

UserPageComponent.displayName = 'UserPageComponent';

// Uncomment properties you need
// UserPageComponent.propTypes = {};
// UserPageComponent.defaultProps = {};

// UsersPageComponent.defaultProps = {};

function mapStateToProps(state) {
  const { pageUser } = state;
  const { user, posts } = pageUser;

  return {
    user,
    posts
  }
}
const UserPageContainer = connect(mapStateToProps)(UserPageComponent);
export default UserPageContainer;
