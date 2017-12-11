'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
  createComment,
  newCommentInputCommentChanged,
  newCommentInputClear,
  newCommentCloseDialog
} from '../actions';
import { newComment } from '../clientHttp';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
require('styles//NewComment.css');

class NewCommentComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.closeDialogAndRedirect = this.closeDialogAndRedirect.bind(this);
  }
  handleCommentChange(e, newValue) {
    const { dispatch } = this.props;
    dispatch(newCommentInputCommentChanged(newValue));
  }
  closeDialog() {
    const { dispatch } = this.props;
    dispatch(newCommentCloseDialog());
  }
  closeDialogAndRedirect() {
    const { dispatch } = this.props;
    dispatch(newCommentCloseDialog());
    dispatch(push('/login'));
  }
  onSubmit(e) {
    e.preventDefault();

    // const params = new FormData();
    // params.append('user_id', 1);
    // params.append('thread_id', 1);
    // params.append('comment', 'コメント');

    // return newComment(params);

    const { dispatch, user, threadId, input } = this.props;
    const comment = {
      'user': user,
      'thread_id': parseInt(threadId),
      'comment': input.comment
    }
    dispatch(createComment(comment, this.refs.form));

    // this.refs.input.value = '';
  }
  render() {
    const { input } = this.props;
    const { comment, isValid, error, shouldOpenDialog } = input;

    let actions = [];
    switch(error.type) {
      case 'INVALID_INPUT':
        actions = [
          <FlatButton
            label="OK"
            primary={true}
            keyboardFocused={true}
            onClick={this.closeDialog}
          />
        ];
        break;
      case 'SIGNIN_REQUIRED':
        actions = [
          <FlatButton
            label="Cancel"
            primary={false}
            onClick={this.closeDialog}
          />,
          <FlatButton
            label="ログインページへ移動"
            primary={true}
            keyboardFocused={true}
            onClick={this.closeDialogAndRedirect}
          />
        ];
        break;
    }

    return (
      <div className="newcomment-component">
        <form method="POST" ref="form">
          <TextField
            hintText="コメントを入力"
            floatingLabelText="コメント"
            onChange={this.handleCommentChange}
            value={comment} />
          <FlatButton
            label="Submit"
            disabled={!isValid}
            onClick={this.onSubmit} />
        </form>
        <Dialog
          title="投稿に失敗しました"
          actions={actions}
          modal={true}
          open={shouldOpenDialog}
          onRequestClose={this.closeDialog}
        >
          {error && error.message}
        </Dialog>
      </div>
    );
  }
}

NewCommentComponent.displayName = 'NewCommentComponent';

// Uncomment properties you need
// NewCommentComponent.propTypes = {};
// NewCommentComponent.defaultProps = {};



function mapStateToProps(state) {
  const { userInfo, newComment } = state;
  const { user } = userInfo;

  return {
    user,
    input: newComment
  }
}
const NewComponentContainer = connect(mapStateToProps)(NewCommentComponent);
export default NewComponentContainer;
