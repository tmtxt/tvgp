// @flow
import globalizeSelectors from 'client/helpers/globalize-selectors';
import { Map as ImmutableMap } from 'immutable';
import d3 from 'd3';

import { mountPoint } from './constants';

import type { TreeIdType } from './types';

type TreeStateType = ImmutableMap<TreeIdType, any>;

// selectors
export const selectTreeById = (state: TreeStateType, treeId: TreeIdType) => state.get(treeId);
export const isTreeLoaded = (state: TreeStateType, treeId: TreeIdType) => state.get(treeId);

export const selectTreeData = (state: TreeStateType, treeId: TreeIdType, treeWidth: number) => {
  const root = selectTreeById(state, treeId).toJS();
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

export const selectors = globalizeSelectors(
  { selectTreeById, isTreeLoaded, selectTreeData },
  mountPoint
);
export default selectors;
