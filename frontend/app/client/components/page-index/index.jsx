import React from 'react';
import { compose } from 'recompose';

import wrapMainLayout from 'client/components/main-layout/index.jsx';


export const PageIndex = () => (
  <div>
    <div className="row">
      Hello
    </div>
  </div>
);


export const enhance = compose(
  wrapMainLayout
);

export default enhance(PageIndex);
