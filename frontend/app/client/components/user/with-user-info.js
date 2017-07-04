// @flow
import { connect } from 'react-redux';

import { selectors } from 'client/components/user/logic-bundle';

// Wrap the component with current user info
// Auto inject prop user, isAdmin
export const withUserInfo = (WrappedComponent: ReactClass<*>): ReactClass<*> => {
  function mapStateToProps(state: Object) {
    const user = selectors.getUser(state);
    const isAdmin = selectors.isAdmin(state);

    return { user, isAdmin };
  }

  return connect(mapStateToProps)(WrappedComponent);
};

export default withUserInfo;
