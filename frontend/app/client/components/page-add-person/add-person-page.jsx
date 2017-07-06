// @flow
import React, { Component } from 'react';

import Loader from 'client/components/shared/loader.jsx';

import type { PersonInfoType, AliveStatusType, GenderType } from 'client/components/person/types';

import PersonInfoForm from './person-info-form';
import ParentInfoForm from './parent-info-form';

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
    summary: string,

    matchingParentId: string
  } = {
    fullName: '',
    birthDate: null,
    deathDate: null,
    aliveStatus: 'unknown',
    gender: 'unknown',
    job: '',
    address: '',
    summary: '',
    matchingParentId: ''
  };

  onPersonDataChanged = (dataKey: string, value: any) => this.setState({ [dataKey]: value });

  onMatchingParentSelect = (matchingParentId: string) => this.setState({ matchingParentId });

  onSubmit = () => {

  };

  props: {
    fromRole: string,
    person: PersonInfoType // from person
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

  renderRelationInfoForm() {
    const { fromRole, person: fromPerson } = this.props;

    if (fromRole === 'parent') {
      const fromParentPerson = fromPerson;
      const { onMatchingParentSelect } = this;
      const { matchingParentId } = this.state;
      return <ParentInfoForm {...{ fromParentPerson, matchingParentId, onMatchingParentSelect }} />;
    }

    return null;
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
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">Thông tin thêm</h3>
              </div>
              <div className="panel-body">
                {this.renderRelationInfoForm()}
              </div>
            </div>

            <div className="panel panel-warning">
              <div className="panel-body">
                <input
                  onClick={this.onSubmit}
                  className="btn btn-primary"
                  type="button"
                  value="Hoàn tất"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPersonPage;
