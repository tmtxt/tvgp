// @flow
import React, { Component } from 'react';
import d3 from 'd3';
import { Map as ImmutableMap } from 'immutable';
import dimensions from 'react-dimensions';
import { compose } from 'recompose';

type ExportedPropsType = {
  tree: ImmutableMap<string, any>
};
type PropsType = {
  tree: ImmutableMap<string, any>,
  containerWidth: number,
  containerHeight: number
};

export const Tree = ({ tree, containerWidth, containerHeight }: PropsType) => {
  const root = tree.toJS();
  const treeLayout = d3.layout.tree().size([containerWidth, containerHeight]);
  const nodesList = treeLayout.nodes(root).reverse();
  nodesList.forEach(d => {
    d.y = d.depth * 200;
    d.y += 80;
  });
  const linksList = treeLayout.links(nodesList);

  return (
    <div>
      Hello
    </div>
  );
};

const enhance = compose(dimensions());

export const TreeComponent: Class<Component<void, ExportedPropsType, void>> = enhance(
  Tree
);
export default TreeComponent;
