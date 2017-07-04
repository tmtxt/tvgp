// @flow
import React, { Component } from 'react';

import Loader from 'client/components/shared/loader.jsx';

import type { PersonInfoType, AliveStatusType, GenderType } from 'client/components/person/types';

import PersonInfoForm from './person-info-form';

export class AddPersonPage extends Component {
  static displayName = 'AddPersonPage';

  state: {
    fullName: string,
    birthDate: ?string,
    deathDate: ?string,
    aliveStatus: AliveStatusType,
    gender: GenderType,
    job: string,
    address: string,
    summary: string
  } = {
    fullName: '',
    birthDate: null,
    deathDate: null,
    aliveStatus: 'unknown',
    gender: 'unknown',
    job: '',
    address: '',
    summary: ''
  };

  onPersonDataChanged = (dataKey: string, value: any) => {
    this.setState({ [dataKey]: value });
  };

  props: {
    fromRole: string,
    person: PersonInfoType
  };

  renderPersonInfoForm() {
    const {
      fullName,
      birthDate,
      deathDate,
      aliveStatus,
      gender,
      job,
      address,
      summary
    } = this.state;
    const { onPersonDataChanged } = this;

    return (
      <PersonInfoForm
        {...{
          fullName,
          birthDate,
          deathDate,
          aliveStatus,
          gender,
          job,
          address,
          summary,
          onPersonDataChanged
        }}
      />
    );
  }

  render() {
    const { person: fromPerson } = this.props;

    if (!fromPerson) {
      return <Loader />;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">Thông tin chung</h3>
              </div>
              <div className="panel-body">
                {this.renderPersonInfoForm()}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            Info
          </div>
        </div>
      </div>
    );
  }
}

export default AddPersonPage;
