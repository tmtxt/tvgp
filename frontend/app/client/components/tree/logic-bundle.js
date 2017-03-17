// @flow
// Tree reducer is stored as a map with key is the tree id
// tree from root will have id root
import { Map as ImmutableMap, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import globalizeSelectors from 'client/helpers/globalize-selectors';
import api from 'client/helpers/api';

// type
type TreeIdType = string | number;

// mount point from main reducer
export const mountPoint = 'tree';

// selectors
export const selectors = globalizeSelectors(
  {
    getRootTree: state => state.get('root')
  },
  mountPoint
);

// action types
export const SET_TREE = 'tree/SET_TREE';
export const TOGGLE_ALL_CHILDREN = 'tree/TOGGLE_ALL_CHILDREN';
export const TOGGLE_INDIRECT_CHILDREN = 'tree/TOGGLE_INDIRECT_CHILDREN';

// actions
// simple action to sett tree
export const setTree = (treeId: TreeIdType, treeData: Object) => ({
  type: SET_TREE,
  treeId,
  treeData
});

export const toggleIndirectChildren = (treeId: TreeIdType) => ({
  type: TOGGLE_INDIRECT_CHILDREN,
  treeId
});

export const toggleAllChildren = (treeId: TreeIdType) => ({
  type: TOGGLE_ALL_CHILDREN,
  treeId
});

export const getTreeFromDefaultRoot = () =>
  (dispatch: Function): Promise<*> =>
    api('Tree.getTreeFromDefaultRoot')
      .then((res: Object) => dispatch(setTree('root', res)))
      .then(() => dispatch(toggleIndirectChildren('root')));

// reducers
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
