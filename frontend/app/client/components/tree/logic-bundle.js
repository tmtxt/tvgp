// @flow
import treeReducer from './reducers';

export default treeReducer;

// selectors
export { default as selectors } from './selectors';

// mount point
export { mountPoint } from './constants';

// actions
export {
  setTree,
  toggleIndirectChildren,
  toggleAllChildren,
  toggleChildrenForNode,
  getTreeFromDefaultRoot
} from './actions';

// types
export type { TreeIdType, PersonInfoType } from './types';
