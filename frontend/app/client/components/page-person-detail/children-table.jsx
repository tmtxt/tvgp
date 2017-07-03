// @flow
import _ from 'lodash';
import React from 'react';

import Loader from 'client/components/shared/loader.jsx';
import type { PersonInfoType, ChildInfoType } from 'client/components/person/types';

import ChildRow from './child-row';

type PropsType = {
  person: PersonInfoType
};

export const ChildrenTable = (props: PropsType) => {
  const { person: { children } } = props;

  if (!children) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!children.length) {
    return <div />;
  }

  return (
    <div>
      <h3>Con cái</h3>
      {_.map(children, (child: ChildInfoType, idx: number) => <ChildRow child={child} key={idx} />)}
    </div>
  );
};

export default ChildrenTable;
