// @flow
import React, { Component } from 'react';

import Loader from 'client/components/shared/loader.jsx';

import type { PersonInfoType } from 'client/components/person/types';

export class AddPersonPage extends Component {
  static displayName = 'AddPersonPage';

  props: {
    person: PersonInfoType
  };

  render() {
    const { person } = this.props;

    if (!person) {
      return <Loader />;
    }

    return (
      <div>
        Hello
      </div>
    );
  }
}

export default AddPersonPage;
