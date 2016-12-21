import React from 'react';

import wrapAdminLayout from 'client/components/admin-layout/index.jsx';


const PageChangePassword = () => (
  <div className="panel panel-warning">
    <div className="panel-heading">
      <h3 className="panel-title">
        Đổi mật khẩu
      </h3>
    </div>
    <div className="panel-body">
      Đổi
    </div>
  </div>
);


export default wrapAdminLayout(PageChangePassword);
