import React from 'react';

import Header from 'client/components/site-header/index.jsx';

import './main-layout-style.css';


const wrapMainLayout = (WrappedComponent) => () => (
  <div className="site">
    <Header />

    <main className="site-content">
      <div className="container site-container">
        <WrappedComponent />
      </div>
    </main>

  </div>
);

export default wrapMainLayout;
