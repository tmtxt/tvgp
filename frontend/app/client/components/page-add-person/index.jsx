// @flow
import React from 'react';
import { compose } from 'redux';

import wrapMainLayout from 'client/components/main-layout/index.jsx';
import withPersonInfo from 'client/components/person/with-person-info.jsx';

import AddPersonPage from './add-person-page';

const withPersonId = (WrappedComponent: ReactClass<*>) => (props: Object) => {
  const { params: { personId } } = props;

  return <WrappedComponent personId={personId} />;
};

const hoc = compose(withPersonId, withPersonInfo, wrapMainLayout);

export default hoc(AddPersonPage);
