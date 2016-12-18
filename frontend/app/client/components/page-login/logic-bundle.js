// @flow
import {
  Map
} from 'immutable';
import globalizeSelectors from 'client/helpers/globalize-selectors';
import identity from 'lodash/identity';
import {
  createAction,
  handleActions
} from 'redux-actions';

import {
  login as userLogin
} from 'client/components/user/logic-bundle';

import type {
  SetUsernameActionType,
  SetPasswordActionType,
  ClearDataActionType,
  SetErrorActionType
} from './types';

// mount point from main reducer
export const mountPoint = 'page-login';

// selectors
export const selectors = globalizeSelectors({
  getData: identity
}, mountPoint);

// action types
export const SET_USERNAME = 'page-login/SET_USERNAME';
export const SET_PASSWORD = 'page-login/SET_PASSWORD';
export const CLEAR_DATA = 'page-login/CLEAR_DATA';
export const SET_ERROR = 'page-login/SET_ERROR';

// actions
export const setUsername: SetUsernameActionType = createAction(SET_USERNAME);
export const setPassword: SetPasswordActionType = createAction(SET_PASSWORD);
export const clearData: ClearDataActionType = createAction(CLEAR_DATA);
export const setError: SetErrorActionType = createAction(SET_ERROR);
export const login = (username: string, password: string) =>
  (dispatch: Function) =>
  dispatch(userLogin(username, password, {
    done: () => dispatch(clearData()),
    fail: () => dispatch(setError(true))
  }));


// reducer
export default handleActions({
  [SET_USERNAME]: (state, {
    payload: username
  }) => state.set('username', username),

  [SET_PASSWORD]: (state, {
    payload: password
  }) => state.set('password', password),

  [CLEAR_DATA]: (state) => state.set('username', '').set('password', ''),

  [SET_ERROR]: (state, {
    payload: error
  }) => state.set('error', error)
}, new Map({
  username: '',
  password: '',
  error: false
}));
