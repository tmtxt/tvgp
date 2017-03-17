// @flow
import api from 'client/helpers/api';

import { SET_TREE, TOGGLE_INDIRECT_CHILDREN, TOGGLE_ALL_CHILDREN } from './action-types';

import type { TreeIdType } from './types';

// simple action to set tree
export const setTree = (treeId: TreeIdType, treeData: Object) => ({
  type: SET_TREE,
  treeId,
  treeData
});

// toggle show/hide all indirect child of this root tree (child from f2 ->)
export const toggleIndirectChildren = (treeId: TreeIdType) => ({
  type: TOGGLE_INDIRECT_CHILDREN,
  treeId
});

// toggle show/hide all children, including direct and indirect ones
export const toggleAllChildren = (treeId: TreeIdType) => ({
  type: TOGGLE_ALL_CHILDREN,
  treeId
});

export const getTreeFromDefaultRoot = () =>
  (dispatch: Function): Promise<*> =>
    api('Tree.getTreeFromDefaultRoot')
      .then((res: Object) => dispatch(setTree('root', res)))
      .then(() => dispatch(toggleIndirectChildren('root')));
