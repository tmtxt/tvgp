// @flow
import globalizeSelectors from 'client/helpers/globalize-selectors';
import { Map as ImmutableMap } from 'immutable';
import { handleActions } from 'redux-actions';

import api from 'client/helpers/api';

import type { PersonInfoType } from './types';

// mount point from main reducer
export const mountPoint = 'person';

// selectors
const selectPersonById = (state: Object, personId: number) => state.get(personId);
export const selectors = globalizeSelectors({
  selectPersonById
}, mountPoint);

// types
export type { PersonInfoType } from './types';

// action types
export const SET_PERSON = 'person/SET_PERSON';

// actions
export const setPerson = (personId: number, person: PersonInfoType) => ({
  type: SET_PERSON,
  personId,
  person
});
export const getPersonById = (personId: number) => (
  dispatch: Function,
  getState: Function
): Promise<*> =>
  api('Person.getPersonById', { personId }, null, null, getState).then((person: PersonInfoType) =>
    dispatch(setPerson(personId, person))
  );

export default handleActions(
  {
    [SET_PERSON]: (state, { personId, person }) => state.set(personId, person)
  },
  ImmutableMap()
);
