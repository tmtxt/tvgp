// @flow
// Tree reducer is stored as a map with key is the tree id
// tree from root will have id root
import { Map as ImmutableMap, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import globalizeSelectors from 'client/helpers/globalize-selectors';
import api from 'client/helpers/api';

// mount point from main reducer
export const mountPoint = 'tree';

// selectors
export const selectors = globalizeSelectors({
  getRootTree: state => state.get('root')
}, mountPoint);

// action types
export const SET_TREE = 'tree/SET_TREE';

// actions
export const setTree = (treeId: string | number, treeData: Object) => ({
  type: SET_TREE,
  treeId,
  treeData
});

export const getTreeFromDefaultRoot = () =>
  (dispatch: Function): Promise<*> =>
    api('Tree.getTreeFromDefaultRoot').then((res: Object) =>
      dispatch(setTree('root', res)));

export default handleActions(
  {
    [SET_TREE]: (
      state,
      { treeId, treeData }: { treeId: string | number, treeData: Object }
    ) => state.set(treeId, fromJS(treeData))
  },
  ImmutableMap({})
);
