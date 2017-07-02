// @flow
import React, { Component } from 'react';

import Loader from 'client/components/shared/loader.jsx';
import type { PersonInfoType } from 'client/components/person/types';

export class PersonDetailPage extends Component {
  static displayName = 'PersonDetailPage';

  props: {
    person: PersonInfoType
  };

  render() {
    const { person } = this.props;

    if (!person) {
      return (
        <div className="center-block">
          <Loader />
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <img className="img-responsive" alt="" src={person.picture} />
          </div>
          <div className="col-md-9">
            Info
          </div>
        </div>
      </div>
    );
  }
}

export default PersonDetailPage;
