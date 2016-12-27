import React, {
  Component
} from 'react';
import {
  compose
} from 'recompose';
import {
  connect
} from 'react-redux';

import wrapAdminLayout from 'client/components/admin-layout/index.jsx';
import fetchDataEnhancer from 'client/helpers/fetch-data-enhancer.jsx';
import {
  fetchPreface,
  updatePreface,
  selectors
} from 'client/components/preface/logic-bundle';

import Loader from 'client/components/shared/loader.jsx';

import style from './style.scss';


export class PageAdminPreface extends Component {

  state: {
    content: string,
    success: bool,
    error: bool
  } = {
    content: this.props.preface.get('content'),
    success: false,
    error: false,
  };

  setSuccess = () => {
    this.setState({
      success: true,
      error: false
    });
  }

  setError = () => {
    this.setState({
      success: false,
      error: true
    });
  }

  props: {
    preface: Object,
    updatePreface: Function
  };

  handleOnChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  handleSubmit = () => {
    const {
      content
    } = this.state;

    this.props.updatePreface(content)
      .then(this.setSuccess, this.setError);
  }

  renderBody() {
    const {
      preface
    } = this.props;
    const content = preface.get('content');

    /* preface not fetched yet, render loader */
    if (!content) {
      return (
        <div className={`${style.loaderContainer}`}>
          <Loader size="3" />
        </div>
      );
    }

    /* render preface edit area */
    const {
      content: prefaceContent
    } = this.state;
    return (
      <div>
        <div className="form-group">
          <label htmlFor="preface-content">Nội dung</label>
          <textarea onChange={this.handleOnChange} className="form-control" rows="10" value={prefaceContent} />
        </div>
        <button onClick={this.handleSubmit} className="btn btn-default">Cập nhật</button>
      </div>
    );
  }

  render() {
    const {
      success,
      error
    } = this.state;

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            Lời tâm huyết
          </h3>
        </div>
        <div className="panel-body">
          { success &&
            <div className="alert alert-success" role="alert">
              Cập nhật thành công
            </div>
          }
          { error &&
            <div className="alert alert-danger" role="alert">
              Có lỗi xảy ra
            </div>
          }
          { this.renderBody() }
        </div>
      </div>
    );
  }
}


export const enhance = compose(
  fetchDataEnhancer(({
    store
  }) => store.dispatch(fetchPreface())),
  wrapAdminLayout,
  connect(
    (state) => ({
      preface: selectors.getPreface(state)
    }), {
      updatePreface
    }
  )
);

export default enhance(PageAdminPreface);
