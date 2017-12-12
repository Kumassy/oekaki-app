'use strict';

import React from 'react';
import { connect } from 'react-redux';

import {
  fetchHomePosts
} from '../actions/index';
import { _host } from '../clientHttp';

import Post from './PostComponent';
import NewThread from './NewThreadComponent';

require('styles//HomePage.css');

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
        <ul className="posts">
          <li key="new-thread">
            <NewThread></NewThread>
          </li>
          {posts.map(post =>
            <li key={post.isSending ? 'sending-post' : post.id}>
              <Post image={post.image}
                    timestamp={post.updated_at}
                    text={post.answer}
                    userName={post.user.username}
                    userAvatar={post.user.avatar} />
            </li>)}
        </ul>
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
