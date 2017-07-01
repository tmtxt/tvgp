// @flow
import { chain } from 'lodash';
import React, { Component } from 'react';

import { openNewPage } from 'client/helpers/routing';

import type { NodeConfigType } from './type';

const styles = {
  circle: {
    cursor: 'pointer',
    stroke: 'steelblue',
    strokeWidth: '1.5px'
  },

  circleEmpty: {
    fill: '#fff'
  },

  circleFill: {
    fill: 'lightsteelblue'
  },

  name: {
    fillOpacity: 1
  },

  personPicture: {
    cursor: 'pointer',
  }
};

export class PersonNode extends Component {
  static displayName = 'PersonNode';

  onCircleClick = () => {
    const { nodeConfig } = this.props;
    this.props.onClick(nodeConfig);
  };

  onPictureClick = () => {
    const { nodeConfig: { info: { id } } } = this.props;
    openNewPage('Person.detail', { personId: id });
  };

  props: {
    nodeConfig: NodeConfigType,
    onClick: (nodeConfig: NodeConfigType) => void
  };

  renderCircle() {
    const { nodeConfig } = this.props;
    const style = chain(styles.circle)
      .cloneDeep()
      .assign(nodeConfig.children ? styles.circleEmpty : styles.circleFill)
      .value();

    return <circle r="10" style={style} onClick={this.onCircleClick} />;
  }

  renderName() {
    const { nodeConfig } = this.props;
    return (
      <text y="-19" dy=".35em" textAnchor="middle" style={styles.name}>
        {nodeConfig.info.fullName}
      </text>
    );
  }

  renderPicture() {
    const { nodeConfig } = this.props;

    return (
      <image
        onClick={this.onPictureClick}
        style={styles.personPicture}
        href={nodeConfig.info.picture}
        x="-20"
        y="-68"
        width="40px"
        height="40px"
      />
    );
  }

  render() {
    const { nodeConfig } = this.props;

    return (
      <g transform={`translate(${nodeConfig.x}, ${nodeConfig.y})`}>
        {this.renderCircle()}
        {this.renderName()}
        {this.renderPicture()}
      </g>
    );
  }
}

export default PersonNode;
