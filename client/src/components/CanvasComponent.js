'use strict';

import React from 'react';
import $ from 'jquery'

import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
require('styles//Canvas.scss');

const styles = {
  radioButton: {
    marginBottom: 16,
  },
};

class CanvasComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      context: null
    };

    this.handleHandChange = this.handleHandChange.bind(this);
    this.handleThicknessChange = this.handleThicknessChange.bind(this);
    this.handleClearCanvas = this.handleClearCanvas.bind(this);
  }
  componentDidMount() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    this.setState({
      context
    });
    context.strokeStyle = 'black';
    context.lineWidth = 3;

    let startX,
        startY,
        isDrawing = false;

    $(canvas).mousedown((e) => {
        isDrawing = true;
        startX = e.pageX - $(canvas).offset().left;
        startY = e.pageY - $(canvas).offset().top;
    })
    .mousemove((e) => {
        if (!isDrawing) return;
        const x = e.pageX - $(canvas).offset().left;
        const y = e.pageY - $(canvas).offset().top;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(x, y);
        context.stroke();
        startX = x;
        startY = y;
    })
    .mouseup(() => {
        isDrawing = false;
    })
    .mouseleave(() => {
        isDrawing = false;
    });
  }

  handleHandChange(e, value) {
    const { context } = this.state;
    if (context) {
      context.strokeStyle = value;
    }
  }

  handleThicknessChange(e, value) {
    const { context } = this.state;
    if (context) {
      context.lineWidth = value;
    }
  }

  handleClearCanvas(e) {
    this.clearCanvas();
  }

  getBlob(callback) {
    return this.refs.canvas.toBlob(callback);
  }

  toDataURL() {
    return this.refs.canvas.toDataURL();
  }

  clearCanvas() {
    const { width, height } = this.props;
    this.state.context && this.state.context.clearRect(0, 0, width, height);
  }


  render() {
    const { width, height } = this.props;
    return (
      <div className="canvas-component">
        <div className="control">
          <RadioButtonGroup
            className="hand"
            name="hand"
            defaultSelected="black"
            onChange={this.handleHandChange}>
            <RadioButton
              value="black"
              label="えんぴつ"
              style={styles.radioButton}
            />
            <RadioButton
              value="white"
              label="けしごむ"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <RadioButtonGroup
            className="thickness"
            name="thickness"
            defaultSelected="3"
            onChange={this.handleThicknessChange}>
            <RadioButton
              value="1"
              label="細い"
              style={styles.radioButton}
            />
            <RadioButton
              value="3"
              label="ふつう"
              style={styles.radioButton}
            />
            <RadioButton
              value="8"
              label="太い"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <FlatButton
            label="全部消す"
            secondary={true}
            onClick={this.handleClearCanvas} />
        </div>
        <canvas width={width} height={height} ref="canvas">
          Canvas is not supported
        </canvas>
      </div>
    );
  }
}

CanvasComponent.displayName = 'CanvasComponent';

// Uncomment properties you need
// CanvasComponent.propTypes = {};
CanvasComponent.defaultProps = {
  width: 800,
  height: 500
};

export default CanvasComponent;
