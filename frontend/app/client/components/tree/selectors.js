// @flow
import globalizeSelectors from 'client/helpers/globalize-selectors';
import { Map as ImmutableMap } from 'immutable';

import { mountPoint } from './constants';

import type { TreeIdType } from './types';

type TreeStateType = ImmutableMap<TreeIdType, any>;

// selectors
export const selectTreeById = (state: TreeStateType, treeId: TreeIdType) => state.get(treeId);
export const isTreeLoaded = (state: TreeStateType, treeId: TreeIdType) => state.get(treeId);

export const selectors = globalizeSelectors(
  { selectTreeById, isTreeLoaded },
  mountPoint
);
export default selectors;
