import React from 'react';
import {
  compose
} from 'recompose';

import wrapAdminLayout from 'client/components/admin-layout/index.jsx';
import requiredAdmin from 'client/helpers/required-admin.jsx';


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


export const enhance = compose(
  wrapAdminLayout,
  requiredAdmin
);

export default enhance(PageAdminIndex);
