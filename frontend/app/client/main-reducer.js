import { combineReducers } from 'redux-immutable';

// shared components reducers
import todosReducer, { mountPoint as todosMountPoint } from './components/todos/logic-bundle';
import routingReducer, { mountPoint as routingMountPoint } from './components/routing/logic-bundle';
import userReducer, { mountPoint as userMountPoint } from './components/user/logic-bundle';
import prefaceReducer, { mountPoint as prefaceMountPoint } from './components/preface/logic-bundle';
import treeReducer, { mountPoint as treeMountPoint } from './components/tree/logic-bundle';
import personReducer, { mountPoint as personMountPoint } from './components/person';

export default combineReducers({
  [todosMountPoint]: todosReducer,
  [routingMountPoint]: routingReducer,
  [userMountPoint]: userReducer,
  [prefaceMountPoint]: prefaceReducer,
  [treeMountPoint]: treeReducer,
  [personMountPoint]: personReducer
});
