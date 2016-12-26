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
import fetchDataEnhancer from 'client/helpers/fetch-data-enhancer.jsx';
import {
  fetchPreface
} from 'client/components/preface/logic-bundle';


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
  fetchDataEnhancer(
    ({ store }) => store.dispatch(fetchPreface())
  ),
  wrapAdminLayout
);

export default enhance(PageAdminPreface);
