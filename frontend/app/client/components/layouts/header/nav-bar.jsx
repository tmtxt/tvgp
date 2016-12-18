import React from 'react';

import style from './nav-bar-style.scss';


export const NavBar = () => (
  <nav className={`navbar navbar-default ${style.navBarWrapper}`}>
    <div className="container-fluid">
      <div className={`container ${style.innerWrapper}`}>
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Mở rộng</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </div>

        <div className={`collapse navbar-collapse ${style.collapseWrapper}`} id="bs-example-navbar-collapse-1">
          <ul className={`nav navbar-nav ${style.listWrapper}`}>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/">Thành viên</a></li>
            <li><a href="/">Cây gia phả</a></li>
            <li><a href="/">Lịch sử dòng họ</a></li>
            <li><a href="/">Liên hệ</a></li>
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret" /></a>
              <ul className="dropdown-menu">
                <li><a href="/">Action</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
