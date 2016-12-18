// @flow
import fetch from 'isomorphic-fetch';
import {
  Map
} from 'immutable';
import identity from 'lodash/identity';
import {
  createAction,
  handleActions
} from 'redux-actions';

import globalizeSelectors from 'client/helpers/globalize-selectors';
import getUrl from 'client/helpers/get-url';

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
  fetch(getUrl('/api/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(res => res.json())
  .then((res: UserType) => dispatch(setUser(res)));


// reducer
export default handleActions({
  [SET_USER]: (state, {
    payload: user
  }) => state.set('test', user)
}, new Map({
  isAuthenticated: false,
  username: null,
  userRole: null
}));
