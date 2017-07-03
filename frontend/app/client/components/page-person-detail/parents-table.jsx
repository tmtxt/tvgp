// @flow
import _ from 'lodash';
import React from 'react';

import Loader from 'client/components/shared/loader.jsx';
import type { PersonInfoType, ParentInfoType } from 'client/components/person/types';

import ParentRow from './parent-row';

type PropsType = {
  person: PersonInfoType
};

export const ParentsTable = (props: PropsType) => {
  const { person: { parents } } = props;

  if (!parents) {
    return <Loader />;
  }

  if (!parents.length) {
    return <div />;
  }

  return (
    <div>
      <h3>Cha mẹ</h3>
      {_.map(parents, (parent: ParentInfoType, idx: number) => (
        <ParentRow parent={parent} key={idx} />
      ))}
    </div>
  );
};

export default ParentsTable;
