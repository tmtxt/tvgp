// @flow
import React, { Component } from 'react';

import type { PersonInfoType, GenderType } from 'client/components/person/types';

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

export class ParentInfoForm extends Component {
  static displayName = 'ParentInfoForm';

  props: {
    fromParentPerson: PersonInfoType
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

  render() {
    return (
      <div>
        {this.renderFromParentPerson()}
      </div>
    );
  }
}

export default ParentInfoForm;
