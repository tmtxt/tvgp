// @flow
import { map } from 'lodash';
import React, { Component } from 'react';
import dimensions from 'react-dimensions';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import d3 from 'd3';

import {
  selectors as treeSelectors,
  toggleChildrenForNode
} from 'client/components/tree/logic-bundle';

import type { TreeIdType } from 'client/components/tree/types';

import PersonNode from './person-node';
import PedigreeLink from './pedigree-link';
import type { NodeConfigType, LinkConfigType } from './type';

type ExportedPropsType = {
  treeId: TreeIdType
};
type PropsType = {
  // passed from parent
  treeId: TreeIdType,
  containerWidth: number,

  // connect props
  nodesList: Array<NodeConfigType>,
  linksList: Array<LinkConfigType>,

  // connect actions
  toggleChildrenForNode: typeof toggleChildrenForNode
};

export class Tree extends Component {
  onNodeClicked = (nodeConfig: NodeConfigType) => {
    const { treeId } = this.props;
    const path = nodeConfig.path;

    this.props.toggleChildrenForNode(treeId, path);
  };

  props: PropsType;

  render() {
    const { containerWidth, nodesList, linksList } = this.props;

    return (
      <div>
        <svg height="1000" width={containerWidth}>
          <g>
            <g transform="translate(0,0)">
              {map(linksList, (linkConfig: LinkConfigType, key: number) => (
                <PedigreeLink key={key} linkConfig={linkConfig} />
              ))}
            </g>
            <g transform="translate(0,0)">
              {map(nodesList, (nodeConfig: NodeConfigType, key: number) => (
                <PersonNode key={key} nodeConfig={nodeConfig} onClick={this.onNodeClicked} />
              ))}
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

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
  const treeData = treeSelectors.selectTreeById(state, treeId).toJS();
  const { nodesList, linksList } = computeTreeData(treeData, containerWidth);

  return {
    nodesList,
    linksList
  };
};

const enhance = compose(dimensions(), connect(mapStateToProps, { toggleChildrenForNode }));

export const TreeComponent: Class<Component<void, ExportedPropsType, void>> = enhance(Tree);
export default TreeComponent;
