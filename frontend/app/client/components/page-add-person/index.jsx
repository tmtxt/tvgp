// @flow
import React from 'react';
import { compose } from 'redux';

import wrapMainLayout from 'client/components/main-layout/index.jsx';
import withPersonInfo from 'client/components/person/with-person-info.jsx';

import AddPersonPage from './add-person-page';

const withPersonId = (WrappedComponent: ReactClass<*>) => (props: Object) => {
  const { params: { personId } } = props;

  return <WrappedComponent personId={personId} {...props} />;
};

const withFromRole = (WrappedComponent: ReactClass<*>) => (props: Object) => {
  const { params: { role } } = props;

  return <WrappedComponent fromRole={role} {...props} />;
};

const hoc = compose(withPersonId, withPersonInfo, wrapMainLayout, withFromRole);

export default hoc(AddPersonPage);
