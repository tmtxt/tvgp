// @flow
import React, { Component } from 'react';

import withPersonInfo from 'client/components/person/with-person-info';

import PersonDetailPage from './person-detail-page';

const PersonDetailPageComponent = withPersonInfo(PersonDetailPage);

export class PersonDetailPageWrapper extends Component {
  static displayName = 'PersonDetailPageWrapper';

  props: {
    params: {
      personId: string
    }
  }

  render() {
    let personId = this.props.params.personId;
    personId = parseInt(personId, 10);

    return <PersonDetailPageComponent personId={personId} />;
  }
}

export default PersonDetailPageWrapper;
