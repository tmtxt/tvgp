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
  selectors,
  logout
} from 'client/components/user/logic-bundle';
import push, {
  getRoute
} from 'client/helpers/routing';

import style from './nav-bar-style.scss';


export class NavBar extends Component {

  props: {
    user: Object,
    isAdmin: bool,
    logout: Function
  };


  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout()
      .then(() => {
        push('User.login');
      });
  }


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
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="/" className={`dropdown-toggle ${style.usernameLink}`} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Xin chào {username} <span className="caret" />
          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="/" onClick={this.handleLogout}>Thoát</a>
            </li>
          </ul>
        </li>
      </ul>
    );
  }

  render() {
    const {
      isAdmin
    } = this.props;

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
                <li><Link to="/">Trang chủ</Link></li>
                <li><Link to="/">Thành viên</Link></li>
                <li><Link to="/tree">Cây gia phả</Link></li>
                <li><Link to="/">Lịch sử dòng họ</Link></li>
                <li><Link to="/">Liên hệ</Link></li>
                { isAdmin && <li><Link to={getRoute('Admin.index')}>Quản trị</Link></li> }
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
    user: selectors.getUser(state),
    isAdmin: selectors.isAdmin(state)
  }), {
    logout
  }
)(NavBar);
