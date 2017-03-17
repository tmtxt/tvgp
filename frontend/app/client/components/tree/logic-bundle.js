// @flow
import globalizeSelectors from 'client/helpers/globalize-selectors';

import treeReducer from './reducers';

// mount point from main reducer
export const mountPoint = 'tree';

// selectors
export const selectors = globalizeSelectors(
  {
    getRootTree: state => state.get('root')
  },
  mountPoint
);

// actions
export { setTree, toggleIndirectChildren, toggleAllChildren, getTreeFromDefaultRoot } from './actions';

export default treeReducer;
