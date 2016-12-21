import React from 'react';
import {
  Link
} from 'react-router';
import {
  compose
} from 'recompose';

import wrapMainLayout from 'client/components/main-layout/index.jsx';


const wrapAdminLayout = (WrappedComponent) => (props) => (
  <div>
    <div className="row">
      <div className="col-md-3">
        <div className="list-group">
          <div className="list-group-item list-group-item-warning">
            <strong>Thông tin tài khoản</strong>
          </div>
          <Link to="/admin/changePassword" className="list-group-item">Đổi mật khẩu</Link>

          <div className="list-group-item list-group-item-warning">
            <strong>Thông tin khác</strong>
          </div>
          <Link to="/admin/prefaceManagement" className="list-group-item">Lời tâm huyết</Link>
          <Link to="/admin/treeDescManagement" className="list-group-item">Chú thích cây gia phả</Link>
        </div>
      </div>

      <div className="col-md-9">
        <WrappedComponent {...props} />
      </div>
    </div>
  </div>
);


export default compose(
  wrapMainLayout,
  wrapAdminLayout
);
