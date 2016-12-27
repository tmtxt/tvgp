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
  fetchPreface,
  selectors
} from 'client/components/preface/logic-bundle';

import Loader from 'client/components/shared/loader.jsx';

import style from './style.scss';


export class PageAdminPreface extends Component {

  props: {
    preface: Object
  };

  renderBody() {
    const {
      preface
    } = this.props;
    const content = preface.get('content');

    if (!content) {
      return (
        <div className={`${style.loaderContainer}`}>
          <Loader size="3" />
        </div>
      );
    }

    return 'hello';
  }

  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            Lời tâm huyết
          </h3>
        </div>
        <div className="panel-body">
          { this.renderBody() }
        </div>
      </div>
    );
  }
}


export const enhance = compose(
  fetchDataEnhancer(
    ({
      store
    }) => store.dispatch(fetchPreface())
  ),
  wrapAdminLayout,
  connect(
    (state) => ({
      preface: selectors.getPreface(state)
    }), {}
  )
);

export default enhance(PageAdminPreface);
