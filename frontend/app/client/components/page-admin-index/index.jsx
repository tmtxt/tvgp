import React from 'react';

import wrapAdminLayout from 'client/components/admin-layout/index.jsx';


const PageAdminIndex = () => (
  <div className="panel panel-warning">
    <div className="panel-heading">
      <h3 className="panel-title">
        Quản trị
      </h3>
    </div>
    <div className="panel-body">
      Xin chào admin
    </div>
  </div>
);


export default wrapAdminLayout(PageAdminIndex);
