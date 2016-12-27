import React from 'react';
import {
  Map
} from 'immutable';
import {
  compose
} from 'recompose';
import {
  connect
} from 'react-redux';

import wrapMainLayout from 'client/components/main-layout/index.jsx';
import fetchDataEnhancer from 'client/helpers/fetch-data-enhancer.jsx';
import {
  fetchPreface,
  selectors
} from 'client/components/preface/logic-bundle';

import PrefaceView from './preface';


export const PageIndex = ({
  preface
}: {
  preface: Map
}) => (
  <div>
    <div className="row">
      <PrefaceView preface={preface} />
    </div>
  </div>
);


export const enhance = compose(
  fetchDataEnhancer(({
    store
  }) => store.dispatch(fetchPreface())),
  wrapMainLayout,
  connect(
    (state) => ({
      preface: selectors.getPreface(state)
    }), {}
  )
);

export default enhance(PageIndex);
