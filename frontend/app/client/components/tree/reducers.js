// @flow
// Tree reducer is stored as a map with key is the tree id
// tree from root will have id root

import _ from 'lodash';
import { Map as ImmutableMap, List as ImmutableList, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  SET_TREE,
  TOGGLE_INDIRECT_CHILDREN,
  TOGGLE_ALL_CHILDREN,
  TOGGLE_CHILDREN_FOR_NODE
} from './action-types';

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

const convertRawPathToTreePath = (treeNode, rawPath) => {
  const convert = (_treeNode, _rawPath, _treePath) => {
    if (_rawPath.length === 0) {
      return null;
    }

    if (_rawPath.length === 1) {
      return _treePath;
    }

    const nextId = _.nth(_rawPath, 1);
    const children = _treeNode.get('children', ImmutableList());
    const nextNodeIdx = children.findIndex(child => child.getIn(['info', 'id']) === nextId);
    const nextNode = children.get(nextNodeIdx);

    if (nextNodeIdx === -1) {
      return null;
    }

    const remainingPath = _.tail(_rawPath);
    _treePath = _treePath.concat(['children', nextNodeIdx]);

    return convert(nextNode, remainingPath, _treePath);
  };

  return convert(treeNode, rawPath, []);
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

export const handleToggleChildrenForNode = (
  state: ImmutableMap<TreeIdType, any>,
  { treeId, path }: { treeId: TreeIdType, path: Array<number> }
) => {
  const tree = state.get(treeId);
  if (!tree) {
    return state;
  }

  path = convertRawPathToTreePath(tree, path);
  if (!path) {
    return state;
  }

  path = [treeId].concat(path);
  state = state.updateIn(path, toggle);
  return state;
};

//
export default handleActions(
  {
    [SET_TREE]: (state, { treeId, treeData }: { treeId: string | number, treeData: Object }) =>
      state.set(treeId, fromJS(treeData)),
    [TOGGLE_INDIRECT_CHILDREN]: handleToggleIndirectChildren,
    [TOGGLE_ALL_CHILDREN]: handleToggleAllChildren,
    [TOGGLE_CHILDREN_FOR_NODE]: handleToggleChildrenForNode
  },
  ImmutableMap({})
);
