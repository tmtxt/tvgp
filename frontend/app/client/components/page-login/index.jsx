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

import wrapMainLayout from 'client/layouts/main-layout.jsx';
import {
  login
} from 'client/components/user/logic-bundle';

import style from './style.scss';


export class PageLogin extends Component {

  state: {
    username: string,
    password: string
  } = {
    username: '',
    password: ''
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
    this.props.actions.login(username, password);
  }


  render() {
    return (
      <div className={style.pageLogin}>
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
