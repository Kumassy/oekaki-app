'use strict';

import React from 'react';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom';

import {
  fetchUsers
} from '../actions/index';
import UserListItem from './UserListItemComponent';
import {List} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

require('styles//UsersPage.scss');

class UsersPageComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUsers());
  }
  render() {
    const { users } = this.props;
    return (
      <div className="userspage-component">
        <Paper
          zDepth={2}
          className="paper">
          <List>
            <Subheader>ユーザー一覧</Subheader>
            {users.map(user =>
              <Link
                className="link"
                to={`/users/${user.id}`}
                key={user.id}>
                <UserListItem
                  disabled={false}
                  user={user}
                />
              </Link>)}
          </List>
        </Paper>
      </div>
    );
  }
}

UsersPageComponent.displayName = 'UsersPageComponent';

// Uncomment properties you need
// UsersPageComponent.propTypes = {};
// UsersPageComponent.defaultProps = {};

function mapStateToProps(state) {
  const { pageUsers } = state;
  const { users } = pageUsers;

  return {
    users
  }
}
const UsersPageContainer = connect(mapStateToProps)(UsersPageComponent);
export default UsersPageContainer;
