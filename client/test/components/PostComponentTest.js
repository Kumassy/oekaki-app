/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import PostComponent from 'components//PostComponent.js';

describe('PostComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(PostComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('post-component');
  });
});
