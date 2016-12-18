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

import type {
  SetUsernameActionType,
  SetPasswordActionType
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

// actions
export const setUsername: SetUsernameActionType = createAction(SET_USERNAME);
export const setPassword: SetPasswordActionType = createAction(SET_PASSWORD);

// reducer
export default handleActions({
  [SET_USERNAME]: (state, {
    payload: username
  }) => state.set('username', username),

  [SET_PASSWORD]: (state, {
    payload: password
  }) => state.set('password', password)
}, new Map({
  username: '',
  password: '',
  error: false
}));
