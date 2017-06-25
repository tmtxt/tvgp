// @flow
import { map } from 'lodash';
import React, { Component } from 'react';
import dimensions from 'react-dimensions';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import d3 from 'd3';

import { selectors as treeSelectors } from 'client/components/tree/logic-bundle';

import type { TreeIdType } from 'client/components/tree/types';

import PersonNode from './person-node';

type ExportedPropsType = {
  treeId: TreeIdType
};
type PropsType = {
  nodesList: Array<Object>,
  linksList: Array<Object>,
  containerWidth: number
};

export const Tree = ({ nodesList, linksList, containerWidth }: PropsType) => {
  return (
    <div>
      <svg height="1000" width={containerWidth}>
        <g>
          <g transform="translate(0,0)">
            {map(nodesList, (nodeConfig, key) => <PersonNode key={key} nodeConfig={nodeConfig} />)}
          </g>
        </g>
      </svg>
    </div>
  );
};

const computeTreeData = (root, treeWidth) => {
  const treeLayout = d3.layout.tree().size([treeWidth, 0]);
  const nodesList: Array<Object> = treeLayout.nodes(root).reverse();
  nodesList.forEach(d => {
    d.y = d.depth * 200;
    d.y += 80;
  });
  const linksList: Array<Object> = treeLayout.links(nodesList);

  return {
    nodesList,
    linksList
  };
};

const mapStateToProps = (state: Object, props: Object) => {
  const { treeId, containerWidth } = props;
  const root = treeSelectors.selectTreeById(state, treeId).toJS();
  const { nodesList, linksList } = computeTreeData(root, containerWidth);

  return {
    nodesList,
    linksList
  };
};

const enhance = compose(dimensions(), connect(mapStateToProps));

export const TreeComponent: Class<Component<void, ExportedPropsType, void>> = enhance(Tree);
export default TreeComponent;
