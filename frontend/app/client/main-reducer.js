import { combineReducers } from 'redux-immutable';

// shared components reducers
import todosReducer, { mountPoint as todosMountPoint } from './components/todos/logic-bundle';
import routingReducer, { mountPoint as routingMountPoint } from './components/routing/logic-bundle';
import userReducer, { mountPoint as userMountPoint } from './components/user/logic-bundle';

// pages' reducers
import pageLoginReducer, { mountPoint as pageLoginMountPoint } from './components/page-login/logic-bundle';


export default combineReducers({
  [todosMountPoint]: todosReducer,
  [routingMountPoint]: routingReducer,
  [userMountPoint]: userReducer,

  [pageLoginMountPoint]: pageLoginReducer
});
