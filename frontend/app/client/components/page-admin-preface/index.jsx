import React from 'react';
import {
  compose
} from 'recompose';

import wrapAdminLayout from 'client/components/admin-layout/index.jsx';


export const PageAdminPreface = () => (
  <div>
    Hello
  </div>
);


export const enhance = compose(
  wrapAdminLayout
);

export default enhance(wrapAdminLayout);
