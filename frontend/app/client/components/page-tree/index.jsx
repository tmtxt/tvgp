// @flow
import React from 'react';
import { compose } from 'recompose';

import wrapMainLayout from 'client/components/main-layout/index.jsx';

export const PageTree = () => (
  <div>
    Hello
  </div>
);

export const enhance = compose(wrapMainLayout);

export default enhance(PageTree);
