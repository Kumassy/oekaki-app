'use strict';

import React from 'react';
import $ from 'jquery'

require('styles//Canvas.css');

class CanvasComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      context: null
    };
  }
  componentDidMount() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    this.setState({
      context
    });

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

  getBlob(callback) {
    return this.refs.canvas.toBlob(callback);
  }

  clearCanvas() {
    const { width, height } = this.props;
    this.state.context && this.state.context.clearRect(0, 0, width, height);
  }


  render() {
    const { width, height } = this.props;
    return (
      <div className="canvas-component">
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
  width: 400,
  height: 300
};

export default CanvasComponent;
