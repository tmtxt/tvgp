// @flow
import _ from 'lodash';
import React, { Component } from 'react';

import Loader from 'client/components/shared/loader.jsx';

import type { PersonInfoType, GenderType, MarriageInfoType } from 'client/components/person/types';

const styles = {
  parentRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'flex-start'
  },

  name: {
    marginLeft: 10
  }
};

const getParentLabel = (gender: ?GenderType) => {
  if (gender === 'male' || gender === 'les') {
    return 'Cha';
  }

  return 'Mẹ';
};

const getMatchingParentLabel = (gender: ?GenderType) => {
  const parentLabel = getParentLabel(gender);

  if (parentLabel === 'Cha') {
    return 'Mẹ';
  }

  return 'Cha';
};

export class ParentInfoForm extends Component {
  static displayName = 'ParentInfoForm';

  props: {
    fromParentPerson: PersonInfoType,
    matchingParentId: ?number,
    onMatchingParentSelect: (matchingParentId: string) => void
  };

  renderFromParentPerson() {
    const { fromParentPerson: parent } = this.props;
    const { gender } = parent;
    const parentLabel = getParentLabel(gender);

    return (
      <div style={styles.parentRow}>
        <img width="50" height="50" className="img-rounded" alt="" src={parent.picture} />
        <div style={styles.name}>
          <strong>{parentLabel}:</strong> {parent.fullName}
        </div>
      </div>
    );
  }

  renderMatchingParentsSelect() {
    const { fromParentPerson, onMatchingParentSelect, matchingParentId } = this.props;
    const { marriages } = fromParentPerson;

    if (!marriages) {
      return <Loader />;
    }

    const matchingParentLabel = getMatchingParentLabel(fromParentPerson.gender);
    return (
      <div className="form-group">
        <label htmlFor="parentMarriageStatusInput">Chọn {matchingParentLabel}</label>
        <select
          value={matchingParentId}
          className="form-control"
          onChange={e => onMatchingParentSelect(e.target.value)}
        >
          <option value="">Không có {matchingParentLabel}</option>
          {_.map(marriages, (marriage: MarriageInfoType, idx: number) => (
            <option key={idx} value={marriage.id}>{marriage.fullName}</option>
          ))}
        </select>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderFromParentPerson()}
        {this.renderMatchingParentsSelect()}
      </div>
    );
  }
}

export default ParentInfoForm;
