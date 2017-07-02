// @flow
import React from 'react';

type PropsType = {
  label: string,
  value: any
};
export const PersonInfoRow = (props: PropsType) => {
  const { label, value } = props;

  return (
    <tr>
      <td>
        {label}
      </td>
      <td>
        {value}
      </td>
    </tr>
  );
};

export default PersonInfoRow;
