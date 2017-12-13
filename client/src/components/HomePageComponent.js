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
              <Link
                className="link"
                key={post.isSending ? 'sending-post' : post.id}
                to={`threads/${post.thread_id}`}>
                <Post image={post.image}
                      timestamp={post.updated_at}
                      text={post.answer}
                      userName={post.user.username}
                      userAvatar={post.user.avatar} />
              </Link>)}
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
