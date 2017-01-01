// @flow
import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router';
import {
  compose
} from 'recompose';
import {
  connect
} from 'react-redux';

import wrapMainLayout from 'client/components/main-layout/index.jsx';
import {
  selectors
} from 'client/components/user/logic-bundle';
import push, {
  getRoute
} from 'client/helpers/routing';
import Loader from 'client/components/shared/loader.jsx';

/* beautify preserve:start */
const wrapAdminLayout = (WrappedComponent: ReactClass<*>): ReactClass < * > => {
  /* beautify preserve:end */

  class AdminLayout extends Component {
    componentDidMount() {
      const {
        user
      } = this.props;

      const isUpdating = user.get('isUpdating');
      if (isUpdating) {
        return;
      }

      const isAuthenticated = user.get('isAuthenticated');
      const userRole = user.get('userRole');

      if (!isAuthenticated || userRole !== 'admin') {
        push('Home');
      }
    }

    props: {
      user: Object
    };

    render() {
      const {
        user
      } = this.props;
      const isUpdating = user.get('isUpdating');
      if (isUpdating) {
        return (
          <div>
            <Loader size="5" />
          </div>
        );
      }

      return (
        <div>
          <div className="row">
            <div className="col-md-3">
              <div className="list-group">
                <div className="list-group-item list-group-item-warning">
                  <strong>Thông tin tài khoản</strong>
                </div>
                <Link to={getRoute('Admin.changePassword')} className="list-group-item">Đổi mật khẩu</Link>

                <div className="list-group-item list-group-item-warning">
                  <strong>Thông tin khác</strong>
                </div>
                <Link to="/admin/preface" className="list-group-item">Lời tâm huyết</Link>
                <Link to="/admin/treeDescManagement" className="list-group-item">Chú thích cây gia phả</Link>
              </div>
            </div>

            <div className="col-md-9">
              <WrappedComponent {...this.props} />
            </div>
          </div>
        </div>
      );
    }
  }

  return connect(
    (state) => ({
      user: selectors.getUser(state)
    }), {}
  )(AdminLayout);
};


export default compose(
  wrapMainLayout,
  wrapAdminLayout
);
