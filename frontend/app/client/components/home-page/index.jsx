import React from 'react';
import { compose } from 'recompose';

import wrapMainLayout from 'client/layouts/main-layout.jsx';


export const HomePage = () => (
  <div>
    Hello
  </div>
);


export const enhance = compose(
  wrapMainLayout
);

export default enhance(HomePage);
