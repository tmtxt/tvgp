// @flow
import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';

import type { AliveStatusType, GenderType } from 'client/components/person/types';
import { formatVNDate, fromVNDate } from 'client/helpers/date-time';

export class PersonInfoForm extends Component {
  static displayName = 'PersonInfoForm';

  props: {
    // person info
    fullName: string,
    birthDate: ?string,
    deathDate: ?string,
    aliveStatus: AliveStatusType,
    gender: GenderType,
    job: string,
    address: string,
    summary: string,

    // event handler
    onPersonDataChanged: (dataKey: string, value: any) => void
  };

  renderDeathDateInput() {
    const { aliveStatus, deathDate, onPersonDataChanged } = this.props;

    if (aliveStatus !== 'dead') {
      return null;
    }

    return (
      <div className="form-group">
        <label htmlFor="deathDateInput">Ngày mất</label>
        <DatePicker
          value={deathDate && fromVNDate(deathDate)}
          formatDate={formatVNDate}
          hintText="Ngày mất"
          onChange={(e, d) => onPersonDataChanged('deathDate', formatVNDate(d))}
        />
      </div>
    );
  }

  render() {
    const { fullName, birthDate, aliveStatus, gender, job, address, summary } = this.props;
    const { onPersonDataChanged } = this.props;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="fullNameInput">Họ và Tên</label>
          <input
            type="text"
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
            value={birthDate && fromVNDate(birthDate)}
            formatDate={formatVNDate}
            hintText="Ngày sinh"
            onChange={(e, d) => onPersonDataChanged('birthDate', formatVNDate(d))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="aliveStatusInput">Tình trạng</label>
          <select
            value={aliveStatus}
            className="form-control"
            onChange={e => onPersonDataChanged('aliveStatus', e.target.value)}
          >
            <option value="unknown">Không rõ</option>
            <option value="alive">Còn sống</option>
            <option value="dead">Đã mất</option>
          </select>
        </div>

        {this.renderDeathDateInput()}

        <div className="form-group">
          <label htmlFor="genderInput">Giới tính</label>
          <select
            value={gender}
            className="form-control"
            onChange={e => onPersonDataChanged('gender', e.target.value)}
          >
            <option value="unknown">Không rõ</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="jobInput">Nghề nghiệp</label>
          <input
            type="text"
            className="form-control"
            id="jobInput"
            placeholder="Nghề nghiệp"
            value={job}
            onChange={e => onPersonDataChanged('job', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="addressInput">Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            id="addressInput"
            placeholder="Địa chỉ"
            value={address}
            onChange={e => onPersonDataChanged('address', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="addressInput">Thông tin thêm</label>
          <textarea
            value={summary}
            className="form-control"
            rows="10"
            onChange={e => onPersonDataChanged('summary', e.target.value)}
          />
        </div>
      </form>
    );
  }
}

export default PersonInfoForm;
