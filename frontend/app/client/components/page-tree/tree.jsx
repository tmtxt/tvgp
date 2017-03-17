// @flow
import React, { Component } from 'react';
import dimensions from 'react-dimensions';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { selectors as treeSelectors } from 'client/components/tree/logic-bundle';

import type { TreeIdType } from 'client/components/tree/types';

type ExportedPropsType = {
  treeId: TreeIdType
};
type PropsType = {
  nodesList: Array<Object>,
  linksList: Array<Object>
};

export const Tree = ({ nodesList, linksList }: PropsType) => {
  return (
    <div>
      Hello
    </div>
  );
};

const mapStateToProps = (state: Object, props: Object) => {
  const { treeId, containerWidth } = props;
  const { nodesList, linksList } = treeSelectors.selectTreeData(state, treeId, containerWidth);

  return {
    nodesList,
    linksList
  };
};

const enhance = compose(dimensions(), connect(mapStateToProps));

export const TreeComponent: Class<Component<void, ExportedPropsType, void>> = enhance(Tree);
export default TreeComponent;
