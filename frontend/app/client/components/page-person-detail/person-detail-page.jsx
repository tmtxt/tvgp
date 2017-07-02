// @flow
import _ from 'lodash';
import React, { Component } from 'react';

import Loader from 'client/components/shared/loader.jsx';
import type { PersonInfoType } from 'client/components/person/types';

import PersonInfoRow from './person-info-row';

const renderDate = (dateValue: ?string) => {
  if (!dateValue) {
    return 'Không rõ';
  }

  return new Date(dateValue).toString();
};

const renderGender = (genderValue: ?string) => {
  const genderMap = {
    male: 'Nam',
    female: 'Nữ',
    gay: 'Gay',
    les: 'Les'
  };
  return _.get(genderMap, genderValue, 'Không rõ');
};

export class PersonDetailPage extends Component {
  static displayName = 'PersonDetailPage';

  props: {
    person: PersonInfoType
  };

  renderDeathDate() {
    const { person } = this.props;
    if (person.aliveStatus !== 'dead') {
      return null;
    }

    return <PersonInfoRow label="Ngày Mất" value={renderDate(person.deathDate)} />;
  }

  renderInfoTable() {
    const { person } = this.props;
    return (
      <table className="table">
        <tbody>
          <PersonInfoRow label="Ngày Sinh" value={renderDate(person.birthDate)} />
          {this.renderDeathDate()}
          <PersonInfoRow label="Giới Tính" value={renderGender(person.gender)} />
          <PersonInfoRow label="Nghề Nghiệp" value={person.job} />
          <PersonInfoRow label="Thông Tin Thêm" value={person.summary} />
        </tbody>
      </table>
    );
  }

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
          <div className="col-md-6">
            <h1>{person.fullName}</h1>
            {this.renderInfoTable()}
          </div>
          <div className="col-md-3">
            Family
          </div>
        </div>
      </div>
    );
  }
}

export default PersonDetailPage;
