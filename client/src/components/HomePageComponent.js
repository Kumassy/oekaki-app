'use strict';

import React from 'react';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom';

import {
  fetchHomePosts
} from '../actions/index';
import { _host } from '../clientHttp';

import {List} from 'material-ui/List';
import Post from './PostComponent';
import Paper from 'material-ui/Paper';
import NewThread from './NewThreadComponent';

require('styles//HomePage.scss');

class HomePageComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchHomePosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="homepage-component">
        <Paper
          zDepth={2}
          className="paper">
          <List>
            <NewThread></NewThread>
            {posts.map(post =>
              <Post
                key={post.isSending ? 'sending-post' : post.id}
                threadId={post.thread_id}
                image={post.image}
                timestamp={post.updated_at}
                text={post.answer}
                userId={post.user.id}
                userName={post.user.username}
                userAvatar={post.user.avatar} />
              )}
          </List>
        </Paper>
      </div>
    );
  }
}

HomePageComponent.displayName = 'HomePageComponent';

// Uncomment properties you need
// HomePageComponent.propTypes = {};
// HomePageComponent.defaultProps = {};

export { HomePageComponent }

function mapStateToProps(state) {
  const { pageHome } = state;
  const { posts } = pageHome;

  return {
    posts
  }
}
const HomePageContainer = connect(mapStateToProps)(HomePageComponent);
export default HomePageContainer;
