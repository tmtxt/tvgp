// @flow
import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';

import type { AliveStatusType, GenderType } from 'client/components/person/types';
import { formatDate } from 'client/helpers/date-time';

export class PersonInfoForm extends Component {
  static displayName = 'PersonInfoForm';

  props: {
    // person info
    fullName: string,
    birthDate: string,
    deathDate: string,
    aliveStatus: AliveStatusType,
    gender: GenderType,
    job: string,
    address: string,
    summary: string,

    // event handler
    onPersonDataChanged: (dataKey: string, value: any) => void
  };

  render() {
    const { fullName } = this.props;
    const { onPersonDataChanged } = this.props;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="fullNameInput">Họ và Tên</label>
          <input
            type="email"
            className="form-control"
            id="fullNameInput"
            placeholder="Họ và Tên"
            value={fullName}
            onChange={e => onPersonDataChanged('fullName', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthDateInput">Ngày sinh</label>
          <DatePicker
            formatDate={formatDate}
            hintText="Ngày sinh"
            onChange={(e, d) => console.log(d)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="aliveStatusInput">Tình trạng</label>
          <select className="form-control">
            <option value="unknown">Không rõ</option>
            <option value="alive">Còn sống</option>
            <option value="dead">Đã mất</option>
          </select>
        </div>
      </form>
    );
  }
}

export default PersonInfoForm;
