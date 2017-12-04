/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';
import {findDOMNode} from 'react-dom';

import NewCommentComponent from 'components//NewCommentComponent.js';
import MockAdapter from 'axios-mock-adapter';
import {client, newComment} from '../../src/clientHttp';
const mockAxios = new MockAdapter(client);

describe('NewCommentComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(NewCommentComponent);

    mockAxios.onPost('/comment/new').reply(200, {id: 10});
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('newcomment-component');
  });


  // TODO: ajax test
  // it('should send post request', () => {
  //   const dom = findDOMNode(component);
  //   dom.querySelector('form input[name=\'comment\']').value = 'comment';
  //
  //   component.onSubmit({e: {preventDefault: () => ''}}).then(res => {
  //     expect(res.data).toEqual({id: 10});
  //   });
  // });
});
