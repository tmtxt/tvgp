// @flow
// Tree reducer is stored as a map with key is the tree id
// tree from root will have id root

import { Map as ImmutableMap, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { SET_TREE, TOGGLE_INDIRECT_CHILDREN, TOGGLE_ALL_CHILDREN } from './action-types';

import type { TreeIdType } from './types';

const toggle = (d: ImmutableMap<string, any>) => {
  if (d.get('children')) {
    const children = d.get('children');
    return d.delete('children').set('_children', children);
  }
  const children = d.get('_children');
  return d.delete('_children').set('children', children);
};

const toggleAll = (d: ImmutableMap<string, any>) => {
  if (!d.get('children')) {
    return d;
  }

  d = d.update('children', children => children.map(toggleAll));
  return toggle(d);
};

export const handleToggleIndirectChildren = (
  state: ImmutableMap<TreeIdType, any>,
  { treeId }: { treeId: TreeIdType }
) => {
  const tree = state.get(treeId);
  if (!tree || !tree.get('children')) {
    return state;
  }

  return state.updateIn([treeId, 'children'], children => children.map(toggleAll));
};

export const handleToggleAllChildren = (
  state: ImmutableMap<TreeIdType, any>,
  { treeId }: { treeId: TreeIdType }
) => {
  const tree = state.get(treeId);
  if (!tree) {
    return state;
  }

  return state.update(treeId, toggleAll);
};

//
export default handleActions(
  {
    [SET_TREE]: (state, { treeId, treeData }: { treeId: string | number, treeData: Object }) =>
      state.set(treeId, fromJS(treeData)),
    [TOGGLE_INDIRECT_CHILDREN]: handleToggleIndirectChildren,
    [TOGGLE_ALL_CHILDREN]: handleToggleAllChildren
  },
  ImmutableMap({})
);
