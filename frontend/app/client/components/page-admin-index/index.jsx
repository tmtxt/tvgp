import React, { Component } from 'react';

import wrapMainLayout from 'client/components/main-layout/index.jsx';


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
