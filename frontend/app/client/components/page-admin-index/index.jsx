import React, { Component } from 'react';

import wrapMainLayout from 'client/layouts/main-layout.jsx';


export class PageAdminIndex extends Component {
  render() {
    return (
      <div>
        Admin
      </div>
    );
  }
}

export default wrapMainLayout(PageAdminIndex);
