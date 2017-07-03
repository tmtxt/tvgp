// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';

import { getPersonById, selectors } from 'client/components/person';
import type { PersonInfoType } from 'client/components/person/types';

type ExportComponentType = {
  personId: number
};

/**
 * HOC to create component that auto load person info
 * The WrappedComponent will be injected props person, which contains the person info
 * The output component required personId prop
 */
export const withPersonInfo = (
  WrappedComponent: ReactClass<*>
): Class<Component<void, ExportComponentType, void>> => {
  class WithPersonInfo extends Component {
    static displayName = 'WithPersonInfo';

    componentDidMount() {
      const { personId } = this.props;
      this.props.getPersonById(personId);
    }

    props: {
      personId: number,
      getPersonById: typeof getPersonById,
      // eslint-disable-next-line
      person: PersonInfoType
    };

    render() {
      const props = _.omit(this.props, ['getPersonById']);
      return <WrappedComponent {...props} />;
    }
  }

  function mapStateToProps(state: Object, ownProps: Object) {
    const { personId } = ownProps;
    const person = selectors.selectPersonById(state, personId);
    return { person: person && person.toJS() };
  }
  let WithPersonInfoComponent = hoistStatics(WithPersonInfo, WrappedComponent);
  WithPersonInfoComponent = connect(mapStateToProps, { getPersonById })(WithPersonInfoComponent);
  return WithPersonInfoComponent;
};

export default withPersonInfo;
