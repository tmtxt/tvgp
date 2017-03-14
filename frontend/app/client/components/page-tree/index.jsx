// @flow
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Map as ImmutableMap } from 'immutable';

import wrapMainLayout from 'client/components/main-layout/index.jsx';
import fetchDataEnhancer from 'client/helpers/fetch-data-enhancer.jsx';

import {
  selectors as treeSelectors,
  getTreeFromDefaultRoot
} from 'client/components/tree/logic-bundle';
// import { selectors as routingSelectors } from 'client/components/routing/logic-bundle';

type PropsType = {
  tree: ImmutableMap<string, any>
};

export const PageTree = ({ tree }: PropsType) => {
  return (
    <div>
      Hello
    </div>
  );
};

export const enhance = compose(
  fetchDataEnhancer(({ store }) => store.dispatch(getTreeFromDefaultRoot())),
  wrapMainLayout,
  connect(state => ({
    tree: treeSelectors.getRootTree(state)
  }))
);

export default enhance(PageTree);
