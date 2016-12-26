import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  compose
} from 'recompose';

import wrapAdminLayout from 'client/components/admin-layout/index.jsx';
import {
  changePassword,
  selectors
} from 'client/components/user/logic-bundle';


export class PageChangePassword extends Component {

  state: {
    success: bool,
    error: bool,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  } = {
    success: false,
    error: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  setSuccess = () => {
    this.setState({
      success: true,
      error: false
    });
  }

  setError = () => {
    this.setState({
      success: false,
      error: true
    });
  }

  resetForm = () => {
    this.setState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }


  handleCurrentPasswordChange = (e) => {
    this.setState({
      currentPassword: e.target.value
    });
  }

  handleNewPasswordChange = (e) => {
    this.setState({
      newPassword: e.target.value
    });
  }

  handleConfirmPasswordChange = (e) => {
    this.setState({
      confirmPassword: e.target.value
    });
  }

  handleChangePassword = () => {
    const {
      user
    } = this.props;
    const {
      currentPassword,
      newPassword
    } = this.state;

    const username = user.get('username');
    this.props.changePassword(username, currentPassword, newPassword)
      .then(() => {
        this.resetForm();
        this.setSuccess();
      }, () => {
        this.setError();
      });
  }

  props: {
    user: Object,
    changePassword: Function
  };


  render() {
    const {
      error,
      success
    } = this.state;

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            Đổi mật khẩu
          </h3>
        </div>
        <div className="panel-body">
          { success &&
            <div className="alert alert-success" role="alert">
              Thay đổi mật khẩu thành công
            </div>
          }
          { error &&
            <div className="alert alert-danger" role="alert">
              Mật khẩu không đúng
            </div>
          }

          <div className="form-group">
            <label htmlFor="password">Mật khẩu hiện tại</label>
            <input
              onChange={this.handleCurrentPasswordChange} type="password"
              className="form-control" placeholder="Mật khẩu hiện tại" value={this.state.currentPassword}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu mới</label>
            <input
              onChange={this.handleNewPasswordChange} type="password"
              className="form-control" placeholder="Mật khẩu mới" value={this.state.newPassword}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Nhập lại mật khẩu mới</label>
            <input
              onChange={this.handleConfirmPasswordChange} type="password"
              className="form-control" placeholder="Nhập lại mật khẩu mới" value={this.state.confirmPassword}
            />
          </div>
          <button onClick={this.handleChangePassword} className="btn btn-default">Đổi mật khẩu</button>
        </div>
      </div>
    );
  }
}

const enhance = compose(
  wrapAdminLayout,
  connect(
    (state) => ({
      user: selectors.getUser(state)
    }), {
      changePassword
    }
  )
);


export default enhance(PageChangePassword);
