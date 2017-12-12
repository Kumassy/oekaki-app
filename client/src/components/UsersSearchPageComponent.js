'use strict';

import React from 'react';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom';

import {
  fetchSearchUsers,
  searchUsersInputChanged
} from '../actions/index';
import UserListItem from './UserListItemComponent';
import {List} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';

require('styles//UsersSearchPage.scss');

class UsersSearchPageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
  }
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch(fetchSearchUsers());
  // }
  handleKeywordChange(e, newValue) {
    const { dispatch } = this.props;
    dispatch(searchUsersInputChanged(newValue));
  }
  onSubmit(e) {
    e.preventDefault();

    const { dispatch, keyword } = this.props;
    dispatch(fetchSearchUsers(keyword));
  }



  render() {
    const { users, keyword } = this.props;
    return (
      <div className="userssearchpage-component">
        <Paper
          zDepth={2}
          className="paper">
          <TextField
            hintText=""
            floatingLabelText="ユーザーを検索"
            onChange={this.handleKeywordChange}
            value={keyword}
          />
          <FlatButton
            label="検索"
            onClick={this.onSubmit} />
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
            {(() => {
              if (keyword !== '' && users.length === 0) {
                return <div>ユーザーが見つかりませんでした</div>
              }
            })()}
          </List>
        </Paper>
      </div>
    );
  }
}

UsersSearchPageComponent.displayName = 'UsersSearchPageComponent';

// Uncomment properties you need
// UsersSearchPageComponent.propTypes = {};
// UsersSearchPageComponent.defaultProps = {};

function mapStateToProps(state) {
  const { pageSearchUsers } = state;
  const { users, keyword } = pageSearchUsers;

  return {
    users,
    keyword
  }
}
const UsersSearchPageContainer = connect(mapStateToProps)(UsersSearchPageComponent);
export default UsersSearchPageContainer;
