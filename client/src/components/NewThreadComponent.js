'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
  createThread,
  newThreadInputFileChanged,
  newThreadInputAnswerChanged,
  newThreadInputClear,
  newThreadCloseDialog,
  switchNewThreadMode
} from '../actions';

import Canvas from './CanvasComponent';
import MyAvatar from './MyAvatar';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui/Tabs';
require('styles//NewThread.scss');

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class NewThreadComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitCanvas = this.onSubmitCanvas.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.closeDialogAndRedirect = this.closeDialogAndRedirect.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }

  handleFileChange(e) {
    const { dispatch } = this.props;
    dispatch(newThreadInputFileChanged(this.refs.image.files[0]));
  }
  handleAnswerChange(e, newValue) {
    const { dispatch } = this.props;
    dispatch(newThreadInputAnswerChanged(newValue));
  }

  closeDialog() {
    const { dispatch } = this.props;
    dispatch(newThreadCloseDialog());
  }
  closeDialogAndRedirect() {
    const { dispatch } = this.props;
    dispatch(newThreadCloseDialog());
    dispatch(push('/login'));
  }

  handleModeChange(mode) {
    const { dispatch } = this.props;
    dispatch(switchNewThreadMode(mode));
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch, input, user } = this.props;
    const post = {
      'user': user,
      'answer': input.answer,
      'image': input.file
    }

    // const params = new FormData();
    // params.append('image', document.querySelector('.newpost-component input[name=\'image\']').files[0]);
    // params.append('user_id', 1);
    // params.append('thread_id', 1);
    // params.append('answer', 'ついったー');
    //
    // newPost(params);
    dispatch(createThread(post, this.refs.form));
  }

  onSubmitCanvas(e) {
    e.preventDefault();

    const { dispatch, user, input } = this.props;
    this.refs.canvas.getBlob((blob) => {
      const post = {
        'user': user,
        'answer': input.answer,
        'image': blob
      }
      dispatch(createThread(post, this.refs.form, () => {
        if (this.refs.canvas) {
          this.refs.canvas.clearCanvas();
        }
      }));
    });
  }

  render() {
    const { input, user } = this.props;
    const { isValid, invalidReason, file, answer, shouldOpenDialog, error } = input;

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
      <div className="newthread-component">
        <Tabs
          value={input.mode}
          onChange={this.handleModeChange}
        >
          <Tab label="ファイル送信モード" value="file">
            <div className="file-tab-container">
              <MyAvatar
                className="avatar"
                src={user.avatar}
              />
              <form ref="form" className="form-file">
                <FlatButton
                  className="button"
                  label={file && file.name ? file.name : 'Choose an Image'}
                  labelPosition="before"
                  style={styles.uploadButton}
                  containerElement="label"
                >
                  <input
                    type="file"
                    name="image"
                    ref="image"
                    style={styles.uploadInput}
                    onChange={this.handleFileChange}
                  />
                </FlatButton>
                <TextField
                  className="textfield"
                  hintText="ひらがなのみ"
                  errorText={invalidReason}
                  floatingLabelText="answer"
                  onChange={this.handleAnswerChange}
                  value={answer} />

                <FlatButton
                  className="submit"
                  label="Submit"
                  disabled={!isValid}
                  onClick={this.onSubmit} />
              </form>
            </div>
          </Tab>
          <Tab label="お絵かきモード" value="canvas">
            <div className="canvas-tab-container">
              <Canvas
                ref="canvas"
              />
              <div className="input-wrapper">
                <MyAvatar
                  className="avatar"
                  src={user.avatar}
                />
                <div className="form-file">
                  <TextField
                    hintText="ひらがなのみ"
                    floatingLabelText="answer"
                    errorText={invalidReason}
                    onChange={this.handleAnswerChange}
                    value={answer} />
                  <FlatButton
                    label="Submit"
                    disabled={!isValid}
                    onClick={this.onSubmitCanvas} />
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>

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

NewThreadComponent.displayName = 'NewThreadComponent';

// Uncomment properties you need
// NewThreadComponent.propTypes = {};
// NewThreadComponent.defaultProps = {};

function mapStateToProps(state) {
  const { userInfo, newThread } = state;
  const { user } = userInfo;

  return {
    user,
    input: newThread
  }
}
const NewThreadContainer = connect(mapStateToProps)(NewThreadComponent);

export default NewThreadContainer;
