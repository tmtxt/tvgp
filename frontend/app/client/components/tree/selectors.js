// @flow
import globalizeSelectors from 'client/helpers/globalize-selectors';

import { mountPoint } from './constants';

import type { TreeIdType } from './types';

// selectors
export const selectTreeById = (state, treeId: TreeIdType) => state.get(treeId);

export const selectors = globalizeSelectors({ selectTreeById }, mountPoint);

export default selectors;
