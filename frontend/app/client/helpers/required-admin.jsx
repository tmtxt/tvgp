// @flow
import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';

import {
  selectors
} from 'client/components/user/logic-bundle';
import push from 'client/helpers/routing';


/* beautify preserve:start */
export default (WrappedComponent: ReactClass<*>) => {
  /* beautify preserve:end */

  class RequiredAdminWrapper extends Component {
    componentDidMount() {
      const {
        user
      } = this.props;

      const isAuthenticated = user.get('isAuthenticated');
      const userRole = user.get('userRole');

      if (!isAuthenticated || userRole !== 'admin') {
        push('Home');
      }
    }

    props: {
      user: Object
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(
    (state) => ({
      user: selectors.getUser(state)
    }), {}
  )(RequiredAdminWrapper);
};
