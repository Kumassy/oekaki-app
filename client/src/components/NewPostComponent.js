'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
  createPost,
  newPostInputFileChanged,
  newPostInputAnswerChanged,
  newPostInputClear
} from '../actions';


import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
require('styles//NewPost.css');

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

class NewPostComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  handleFileChange(e) {
    const { dispatch } = this.props;
    dispatch(newPostInputFileChanged(this.refs.image.files[0]));
  }
  handleAnswerChange(e, newValue) {
    const { dispatch } = this.props;
    dispatch(newPostInputAnswerChanged(newValue));
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch, user, threadId, input } = this.props;
    const post = {
      'user': user,
      'thread_id': parseInt(threadId),
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
    dispatch(createPost(post));
    dispatch(newPostInputClear());
    this.refs.form.reset();
    // this.refs.input.value = '';
  }
  render() {
    const { input } = this.props;
    const { isValid } = input;
    return (
      <div className="newpost-component">
        <form ref="form">
          <FlatButton
            label="Choose an Image"
            labelPosition="before"
            style={styles.uploadButton}
            containerElement="label"
          >
            <input type="file" name="image" ref="image" style={styles.uploadInput} onChange={this.handleFileChange}/>
          </FlatButton>
          <TextField
            hintText="ひらがなのみ"
            floatingLabelText="answer"
            onChange={this.handleAnswerChange} />

          <FlatButton
            label="Submit"
            disabled={!isValid}
            onClick={this.onSubmit} />
        </form>
      </div>
    );
  }
}

NewPostComponent.displayName = 'NewPostComponent';

// Uncomment properties you need
// NewPostComponent.propTypes = {};
// NewPostComponent.defaultProps = {};


function mapStateToProps(state) {
  const { userInfo, newPost } = state;
  const { user } = userInfo;

  return {
    user,
    input: newPost
  }
}
const NewPostContainer = connect(mapStateToProps)(NewPostComponent);
export default NewPostContainer;
