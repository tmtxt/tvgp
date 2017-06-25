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
import PedigreeLink from './pedigree-link';

type ExportedPropsType = {
  treeId: TreeIdType
};
type PropsType = {
  containerWidth: number,
  treeData: Object
};
type StateType = {
  nodesList: Array<Object>,
  linksList: Array<Object>
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

export class Tree extends Component {
  state: StateType = {
    nodesList: [],
    linksList: []
  };

  componentWillMount() {
    const { treeData, containerWidth } = this.props;
    const { nodesList, linksList } = computeTreeData(treeData, containerWidth);
    this.setState({ nodesList, linksList });
  }

  props: PropsType;

  render() {
    const { containerWidth } = this.props;
    const { nodesList, linksList } = this.state;

    return (
      <div>
        <svg height="1000" width={containerWidth}>
          <g>
            <g transform="translate(0,0)">
              {map(linksList, (linkConfig, key) => (
                <PedigreeLink key={key} linkConfig={linkConfig} />
              ))}
            </g>
            <g transform="translate(0,0)">
              {map(nodesList, (nodeConfig, key) => (
                <PersonNode key={key} nodeConfig={nodeConfig} />
              ))}
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

const mapStateToProps = (state: Object, props: Object) => {
  const { treeId } = props;
  const treeData = treeSelectors.selectTreeById(state, treeId).toJS();

  return {
    treeData
  };
};

const enhance = compose(dimensions(), connect(mapStateToProps));

export const TreeComponent: Class<Component<void, ExportedPropsType, void>> = enhance(Tree);
export default TreeComponent;
