import React from 'react';
import { compose } from 'recompose';

import wrapMainLayout from 'client/layouts/main-layout.jsx';


export const PageIndex = () => (
  <div>
    Hello
  </div>
);


export const enhance = compose(
  wrapMainLayout
);

export default enhance(PageIndex);
