// @flow
import React from 'react';

import Loader from 'client/components/shared/loader.jsx';
import type { PersonInfoType } from 'client/components/person/types';
import withUserInfo from 'client/components/user/with-user-info';
import push from 'client/helpers/routing';

import PersonInfoTable from './person-info-table';
import ParentsTable from './parents-table';
import ChildrenTable from './children-table';

type PropsType = {
  // passed from parent
  person: PersonInfoType,

  // injected by hoc
  isAdmin: boolean
};

const styles = {
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
};

export const PersonDetailPage = (props: PropsType) => {
  const { person, isAdmin } = props;

  if (!person) {
    return (
      <div className="center-block">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {isAdmin &&
        <div style={styles.buttonsContainer}>
          <input
            className="btn btn-primary"
            type="button"
            value="Thêm con"
            onClick={() => push('Person.add', { personId: person.id, role: 'parent' })}
          />
        </div>}
      <div className="row">
        <div className="col-md-3">
          <img className="img-responsive img-rounded" alt="" src={person.picture} />
        </div>
        <div className="col-md-6">
          <h1>{person.fullName}</h1>
          <PersonInfoTable person={person} />
        </div>
        <div className="col-md-3">
          <ParentsTable person={person} />
          <ChildrenTable person={person} />
        </div>
      </div>
    </div>
  );
};

export default withUserInfo(PersonDetailPage);
