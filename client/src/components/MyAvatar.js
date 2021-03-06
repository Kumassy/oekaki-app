'use strict';

import React from 'react';
import Avatar from 'material-ui/Avatar';
import { _host } from '../clientHttp';

const MyAvatar = (props) => (
  <Avatar
    {...props}
    src={props.src ? `${_host}/${props.src}` : ''}
  />
)

export default MyAvatar;
