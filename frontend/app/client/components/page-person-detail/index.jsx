// @flow
import React from 'react';

import wrapMainLayout from 'client/components/main-layout/index.jsx';
import withPersonInfo from 'client/components/person/with-person-info.jsx';

import PersonDetailPage from './person-detail-page';

let PersonDetailPageComponent;
PersonDetailPageComponent = wrapMainLayout(PersonDetailPage);
PersonDetailPageComponent = withPersonInfo(PersonDetailPageComponent);

type PropsType = {
  params: {
    personId: string
  }
};

export const PersonDetailPageWrapper = (props: PropsType) => {
  const personId = parseInt(props.params.personId, 10);

  return <PersonDetailPageComponent personId={personId} />;
};

export default PersonDetailPageWrapper;
