// @flow
import globalizeSelectors from 'client/helpers/globalize-selectors';
import { Map as ImmutableMap, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import api from 'client/helpers/api';

import type { PersonInfoType, ParentsType, ChildrenType } from './types';

// mount point from main reducer
export const mountPoint = 'person';

// selectors
const selectPersonById = (state: Object, personId: number) => state.get(personId);
export const selectors = globalizeSelectors({ selectPersonById }, mountPoint);

// types
export type { PersonInfoType } from './types';

// action types
export const SET_PERSON = 'person/SET_PERSON';
export const SET_PARENTS = 'person/SET_PARENTS';
export const SET_CHILDREN = 'person/SET_CHILDREN';

// actions
export const setPerson = (personId: number, person: PersonInfoType) => ({
  type: SET_PERSON,
  personId,
  person
});
export const setParents = (personId: number, parents: ParentsType) => ({
  type: SET_PARENTS,
  personId,
  parents
});
export const setChildren = (personId: number, children: ChildrenType) => ({
  type: SET_CHILDREN,
  personId,
  children
});

export const getParentsByPersonId = (personId: number) => (
  dispatch: Function,
  getState: Function
): Promise<*> =>
  api(
    'PedigreeRelation.getParentsByPersonId',
    { personId },
    null,
    null,
    getState
  ).then((parents: ParentsType) => dispatch(setParents(personId, parents)));

export const getChildrenByPersonId = (personId: number) => (
  dispatch: Function,
  getState: Function
): Promise<*> =>
  api(
    'PedigreeRelation.getChildrenByPersonId',
    { personId },
    null,
    null,
    getState
  ).then((children: ChildrenType) => dispatch(setChildren(personId, children)));

export const getPersonById = (personId: number) => (
  dispatch: Function,
  getState: Function
): Promise<*> =>
  api('Person.getPersonById', { personId }, null, null, getState)
    .then((person: PersonInfoType) => dispatch(setPerson(personId, person)))
  .then(() => {
    dispatch(getParentsByPersonId(personId));
    dispatch(getChildrenByPersonId(personId));
  });

export default handleActions(
  {
    [SET_PERSON]: (state, { personId, person }) => state.set(personId, fromJS(person)),
    [SET_PARENTS]: (state, { personId, parents }) =>
      state.setIn([personId, 'parents'], fromJS(parents)),
    [SET_CHILDREN]: (state, { personId, children }) =>
      state.setIn([personId, 'children'], fromJS(children))
  },
  ImmutableMap()
);
