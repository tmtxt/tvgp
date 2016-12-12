import React from 'react';

import style from './style.scss';

export const Header = () => (
  <header className="site-header">
    <div className={`container-fluid ${style.headerBanner}`}>
      <div className={style.headerContainer}>
        <div className={style.siteName}>
          Trần Văn gia phả
        </div>
        <div className={style.headline}>
          Gìn giữ cho muôn đời sau
        </div>
      </div>
    </div>
  </header>
);

export default Header;
