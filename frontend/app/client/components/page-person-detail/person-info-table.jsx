// @flow
import _ from 'lodash';
import React, { Component } from 'react';

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

export class PersonInfoTable extends Component {
  static displayName = 'PersonInfoTable';

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

  render() {
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
}

export default PersonInfoTable;
