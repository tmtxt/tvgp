// @flow
import React, { Component } from 'react';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import wrapMainLayout from 'client/layouts/main-layout.jsx';

import style from './style.scss';
import { selectors, setUsername, setPassword } from './logic-bundle';
import type { SetUsernameActionType, SetPasswordActionType } from './types';


export class PageLogin extends Component {

  props: {
    pageData: Object,
    actions: {
      setUsername: SetUsernameActionType,
      setPassword: SetPasswordActionType
    }
  };


  handleUsernameChange = (e: Object) => {
    this.props.actions.setUsername(e.target.value);
  }

  handlePasswordChange = (e: Object) => {
    this.props.actions.setPassword(e.target.value);
  }


  render() {
    const { pageData } = this.props;

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
                value={pageData.get('username')}
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
                value={pageData.get('password')}
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={this.handlePasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-default">Đăng nhập</button>
          </div>
        </div>
      </div>
    );
  }
}


export const enhance = compose(
  wrapMainLayout,
  connect(
    state => ({
      pageData: selectors.getData(state)
    }),
    dispatch => ({
      actions: bindActionCreators({
        setUsername,
        setPassword
      }, dispatch)
    })
  )
);

export default enhance(PageLogin);
