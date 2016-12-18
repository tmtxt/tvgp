// @flow
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
  SetUserActionType
} from './types';

// mount point from main reducer
export const mountPoint = 'user';

// selector
export const selectors = globalizeSelectors({
  getUser: identity
}, mountPoint);

// action types
export const SET_USER = 'user/SET_USER';

// actions
export const setUser: SetUserActionType = createAction(SET_USER);
export const login = (username: string, password: string) =>
  (dispatch: Function): Promise < UserType > =>
  api('Auth.login', null, null, {
    username,
    password
  })
  .then((res: UserType) => dispatch(setUser(res)));


// reducer
export default handleActions({
  [SET_USER]: (state, {
    payload: user
  }) => state.merge(user)
}, new Map({
  isAuthenticated: false,
  authToken: null,
  username: null,
  userRole: null
}));
