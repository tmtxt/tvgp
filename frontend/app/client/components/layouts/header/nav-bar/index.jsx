import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  Link
} from 'react-router';

import {
  selectors
} from 'client/components/user/logic-bundle';
import {
  getRoute
} from 'client/helpers/routing';

import style from './nav-bar-style.scss';


export class NavBar extends Component {

  props: {
    user: Object
  };


  renderRightNav() {
    const {
      user
    } = this.props;
    const isAuthenticated = user.get('isAuthenticated');

    if (!isAuthenticated) {
      return (
        <ul className={`nav navbar-nav navbar-right ${style.listWrapper}`}>
          <li>
            <Link to={getRoute('User.login')}>Đăng nhập</Link>
          </li>
        </ul>
      );
    }

    const username = user.get('username');

    return (
      <ul className={`nav navbar-nav navbar-right ${style.listWrapper}`}>
        <li className="dropdown">
          <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Xin chào {username} <span className="caret" />
          </a>
          <ul className="dropdown-menu">
            <li><a href="/">Action</a></li>
          </ul>
        </li>
      </ul>
    );
  }

  render() {
    return (
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

              { this.renderRightNav() }
            </div>
          </div>
        </div>
      </nav>
    );
  }
}


export default connect(
  (state) => ({
    user: selectors.getUser(state)
  }),
  () => ({}),
)(NavBar);
