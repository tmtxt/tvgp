import React from 'react';

import Header from 'client/components/site-header/index.jsx';

import './main-layout-style.css';


const wrapMainLayout = (WrappedComponent) => (props) => (
  <div className="site">
    <Header />

    <main className="site-content">
      <div className="container site-container">
        <WrappedComponent {...props} />
      </div>
    </main>

  </div>
);

export default wrapMainLayout;
