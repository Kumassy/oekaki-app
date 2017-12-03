'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';

require('styles//Header.css');

class HeaderComponent extends React.Component {
  render() {
    return (
      <AppBar
        className="header-component"
        title="Insta"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  }
}

HeaderComponent.displayName = 'HeaderComponent';

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
