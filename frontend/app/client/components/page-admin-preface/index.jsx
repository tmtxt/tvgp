import React, {
  Component
} from 'react';
import {
  compose
} from 'recompose';
import {
  connect
} from 'react-redux';

import wrapAdminLayout from 'client/components/admin-layout/index.jsx';

export class PageAdminPreface extends Component {
  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            Lời tâm huyết
          </h3>
        </div>
      </div>
    );
  }
}


export const enhance = compose(
  wrapAdminLayout
);

export default enhance(PageAdminPreface);
