// @flow
import {
  Map
} from 'immutable';
import {
  createAction,
  handleActions
} from 'redux-actions';
import identity from 'lodash/identity';

import globalizeSelectors from 'client/helpers/globalize-selectors';
import api from 'client/helpers/api';

import type {
  PrefaceType,
  SetPrefaceActionType
} from './types';


// mount point from main reducer
export const mountPoint = 'preface';

// selector
export const selectors = globalizeSelectors({
  getPreface: identity
}, mountPoint);


// action types
export const SET_PREFACE = 'preface/SET_PREFACE';


// actions
export const setPreface: SetPrefaceActionType = createAction(SET_PREFACE);

/* beautify preserve:start */
export const fetchPreface = () => (dispatch: Function): Promise<*> =>
  api('MinorContent.getPreface')
  .then((res: PrefaceType) => dispatch(setPreface(res)));
/* beautify preserve:end */


// reducers
export default handleActions({
  [SET_PREFACE]: (state, {
    payload: preface
  }) => state.merge(preface)
}, Map({
  content: null,
  picture: null
}));
