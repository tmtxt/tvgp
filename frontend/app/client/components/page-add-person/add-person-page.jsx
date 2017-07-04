// @flow
import React, { Component } from 'react';

import Loader from 'client/components/shared/loader.jsx';

import type { PersonInfoType } from 'client/components/person/types';

const styles = {
  pictureButtonContainer: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center'
  }
};

export class AddPersonPage extends Component {
  static displayName = 'AddPersonPage';

  state: {
    pictureLink: string,
    pictureChanged: boolean
  } = {
    pictureLink: '/img/userbasic.jpg',
    pictureChanged: false
  };

  onSelectPicture = () => {};

  props: {
    fromRole: string,
    person: PersonInfoType
  };

  render() {
    const { person: fromPerson } = this.props;
    const { pictureLink } = this.state;

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
                <form>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Họ và Tên</label>
                    <input type="email" className="form-control" id="fullNameInput" placeholder="Họ và Tên" />
                  </div>
                </form>
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
