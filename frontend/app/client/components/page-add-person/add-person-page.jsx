// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';

import Loader from 'client/components/shared/loader.jsx';
import { addPersonFromParent } from 'client/components/person';
import { push } from 'client/helpers/routing';

import type { PersonInfoType, AliveStatusType, GenderType } from 'client/components/person/types';

import PersonInfoForm from './person-info-form';
import ParentInfoForm from './parent-info-form';

const styles = {
  updatingDialog: {
    width: 180
  }
};

export class AddPersonPage extends Component {
  static displayName = 'AddPersonPage';

  state: {
    // person info
    fullName: string,
    birthDate: ?string,
    deathDate: ?string,
    aliveStatus: AliveStatusType,
    gender: GenderType,
    job: string,
    address: string,
    summary: string,

    // from person info
    matchingParentId: string,

    // whether the page is sending api request
    isUpdating: boolean
  } = {
    // person info
    fullName: '',
    birthDate: null,
    deathDate: null,
    aliveStatus: 'unknown',
    gender: 'unknown',
    job: '',
    address: '',
    summary: '',

    // from person info
    matchingParentId: '',

    //
    isUpdating: false
  };

  onPersonDataChanged = (dataKey: string, value: any) => this.setState({ [dataKey]: value });
  onMatchingParentSelect = (matchingParentId: string) => this.setState({ matchingParentId });
  onFinishAddingPerson = (personId: number) => push('Person.detail', { personId });
  onSubmit = () => {
    const { fromRole } = this.props;
    this.setState({ isUpdating: true });

    if (fromRole === 'parent') {
      this.addPersonFromParent();
    }
  };

  getPersonInfo() {
    return _.pick(
      this.state,
      ['fullName', 'birthDate', 'deathDate', 'aliveStatus', 'gender', 'job', 'address', 'summary']
    );
  }

  addPersonFromParent() {
    const personInfo = this.getPersonInfo();
    const { person: { id: parentId } } = this.props;
    const { matchingParentId } = this.state;
    let parsedMatchingParentId;
    if (matchingParentId !== '') {
      parsedMatchingParentId = parseInt(matchingParentId, 10);
    }
    this.props.addPersonFromParent(
      personInfo,
      parentId,
      parsedMatchingParentId,
      this.onFinishAddingPerson
    );
  }

  props: {
    // data
    fromRole: string,
    person: PersonInfoType, // from person

    // actions
    addPersonFromParent: typeof addPersonFromParent
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

  renderUpdatingDialog() {
    const { isUpdating } = this.state;

    return (
      <Dialog title="Đang xử lý" modal contentStyle={styles.updatingDialog} open={isUpdating}>
        <Loader size={5} />
      </Dialog>
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

        {this.renderUpdatingDialog()}
      </div>
    );
  }
}

export default AddPersonPage;
