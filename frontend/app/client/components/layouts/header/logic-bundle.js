// @flow
import globalizeSelectors from 'client/helpers/globalize-selectors';
import identity from 'lodash/identity';
import type {
  UserType
} from './types';


export const mountPoint = 'layout-header-user';

export const selectors = globalizeSelectors({
  getUser: identity
}, mountPoint);

// export const fetchUser = () => (dispatch: Function): Promise<UserType> => {

// };
