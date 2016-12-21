// @flow
import React, {
  Component
} from 'react';
import {
  compose
} from 'recompose';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';

import wrapMainLayout from 'client/components/main-layout/index.jsx';
import {
  login
} from 'client/components/user/logic-bundle';
import push from 'client/helpers/routing';

import style from './style.scss';


export class PageLogin extends Component {

  state: {
    username: string,
    password: string,
    error: bool
  } = {
    username: '',
    password: '',
    error: false
  }


  props: {
    actions: {
      login: Function
    }
  };


  handleUsernameChange = (e: Object) => {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange = (e: Object) => {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin = () => {
    const {
      username,
      password
    } = this.state;

    this.props.actions.login(username, password)
      .then(this.handleLoginSuccess)
      .catch(this.handleLoginFail);
  }

  handleLoginSuccess = () => {
    this.setState({
      error: false
    });
    push('Home');
  }

  handleLoginFail = () => {
    this.setState({
      error: true
    });
  }


  renderError() {
    const { error } = this.state;
    if (!error) {
      return null;
    }

    return (
      <div className="alert alert-danger login-message" role="alert">
        Tên đăng nhập hoặc mật khẩu không đúng
      </div>
    );
  }

  render() {
    return (
      <div className={style.pageLogin}>
        { this.renderError() }
        <div className={`panel panel-warning ${style.loginPanel}`}>
          <div className="panel-heading">
            <h3 className="panel-title">Vui lòng đăng nhập</h3>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                value={this.state.username}
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                onChange={this.handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                value={this.state.password}
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={this.handlePasswordChange}
              />
            </div>
            <button onClick={this.handleLogin} type="submit" className="btn btn-default">Đăng nhập</button>
          </div>
        </div>
      </div>
    );
  }
}


export const enhance = compose(
  wrapMainLayout,
  connect(
    () => ({}),
    dispatch => ({
      actions: bindActionCreators({
        login
      }, dispatch)
    })
  )
);

export default enhance(PageLogin);
