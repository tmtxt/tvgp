// @flow
import React from 'react';
import { Link } from 'react-router';

import { getRoute } from 'client/helpers/routing';
import type { ParentInfoType } from 'client/components/person/types';

type PropsType = {
  parent: ParentInfoType
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'flex-start'
  },

  picture: {
    // marginRight: 10
  },

  name: {
    marginLeft: 10
  }
};

export const ParentsRow = (props: PropsType) => {
  const { parent } = props;

  return (
    <div style={styles.container}>
      <img
        width="50"
        height="50"
        className="img-rounded"
        alt=""
        src={parent.picture}
        style={styles.picture}
      />
      <div style={styles.name}>
        <Link to={getRoute('Person.detail', { personId: parent.id })}>{parent.fullName}</Link>
      </div>
    </div>
  );
};

export default ParentsRow;
