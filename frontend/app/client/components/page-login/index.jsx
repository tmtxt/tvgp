import React from 'react';
import { compose } from 'recompose';

import wrapMainLayout from 'client/layouts/main-layout.jsx';

import style from './style.scss';


export const PageLogin = () => (
  <div className={style.pageLogin}>
    <div className={`panel panel-warning ${style.loginPanel}`}>
      <div className="panel-heading">
        <h3 className="panel-title">Vui lòng đăng nhập</h3>
      </div>
      <div className="panel-body">
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-default">Đăng nhập</button>
      </div>
    </div>
  </div>
);


export const enhance = compose(
  wrapMainLayout
);

export default enhance(PageLogin);
