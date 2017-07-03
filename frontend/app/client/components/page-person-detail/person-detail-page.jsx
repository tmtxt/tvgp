// @flow
import React from 'react';

import Loader from 'client/components/shared/loader.jsx';
import type { PersonInfoType } from 'client/components/person/types';

import PersonInfoTable from './person-info-table';

type PropsType = { person: PersonInfoType };

export const PersonDetailPage = (props: PropsType) => {
  const { person } = props;

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
        <div className="col-md-6">
          <h1>{person.fullName}</h1>
          <PersonInfoTable person={person} />
        </div>
        <div className="col-md-3">
          Family
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
