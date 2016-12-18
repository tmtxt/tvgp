// @flow
import { Map } from 'immutable';
import identity from 'lodash/identity';
import {
  createAction,
  handleActions
} from 'redux-actions';
import globalizeSelectors from 'client/helpers/globalize-selectors';
import type {
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


// reducer
export default handleActions({
  [SET_USER]: (state, {
    payload: user
  }) => state.set('test', user)
}, new Map());
