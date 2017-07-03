// @flow
import React from 'react';
import { Link } from 'react-router';

import { getRoute } from 'client/helpers/routing';
import type { ChildInfoType } from 'client/components/person/types';

type PropsType = {
  child: ChildInfoType
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

export const ChildRow = (props: PropsType) => {
  const { child } = props;

  return (
    <div style={styles.container}>
      <img
        width="50"
        height="50"
        className="img-rounded"
        alt=""
        src={child.picture}
        style={styles.picture}
      />
      <div style={styles.name}>
        <Link to={getRoute('Person.detail', { personId: child.id })}>{child.fullName}</Link>
      </div>
    </div>
  );
};

export default ChildRow;
