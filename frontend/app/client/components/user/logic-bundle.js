// @flow
import _ from 'lodash';
import {
  Map
} from 'immutable';
import identity from 'lodash/identity';
import {
  createAction,
  handleActions
} from 'redux-actions';

import globalizeSelectors from 'client/helpers/globalize-selectors';
import api from 'client/helpers/api';

import type {
  UserType,
  SetUserActionType,
  ClearUserActionType
} from './types';

// utils
function storeUserToLocalStorage(username, password) {
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
}


// mount point from main reducer
export const mountPoint = 'user';

// selector
export const selectors = globalizeSelectors({
  getUser: identity,
  isAdmin: (user) => user.get('userRole') === 'admin'
}, mountPoint);


// action types
export const SET_USER = 'user/SET_USER';
export const CLEAR_USER = 'user/CLEAR_USER';


// actions
export const setUser: SetUserActionType = createAction(SET_USER);
export const clearUser: ClearUserActionType = createAction(CLEAR_USER);

export const login = (username: string, password: string) =>
  (dispatch: Function, getState: Function): Promise < * > =>
  api('Auth.login', null, null, {
    username,
    password
  }, getState)
  .then((res: UserType) => _.assign({
    isAuthenticated: true
  }, res))
  .then((res: UserType) => {
    storeUserToLocalStorage(username, password);
    return res;
  })
  .then((res: UserType) => dispatch(setUser(res)));

export const logout = () =>
  (dispatch: Function, getState: Function): Promise < * > =>
  api('Auth.logout', null, null, null, getState)
  .then(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  })
  .then(() => dispatch(clearUser()));

export const changePassword = (username: string, oldPassword: string, newPassword: string) =>
  (dispatch: Function, getState: Function): Promise < * > =>
  api('Auth.changePassword', null, null, {
    username,
    oldPassword,
    newPassword
  }, getState)
  .then((res: UserType) => {
    storeUserToLocalStorage(username, newPassword);
    return res;
  })
  .then((res: UserType) => dispatch(setUser(res)));


// reducer
const getInitialState = () => Map({
  isAuthenticated: false,
  authToken: null,
  username: null,
  userRole: null
});

export default handleActions({
  [SET_USER]: (state, {
    payload: user
  }) => state.merge(user),

  [CLEAR_USER]: () => getInitialState()
}, getInitialState());
