import React from 'react';

import Banner from './banner';
import NavBar from './nav-bar/index';

export const Header = () => (
  <header className="site-header">
    <Banner />
    <NavBar />
  </header>
);

export default Header;
