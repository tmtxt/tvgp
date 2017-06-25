// @flow
import { chain } from 'lodash';
import React, { Component } from 'react';

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
  }
};

export class PersonNode extends Component {
  static displayName = 'PersonNode';

  onClick = () => {
    const { nodeConfig } = this.props;
    this.props.onClick(nodeConfig);
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

    return <circle r="10" style={style} onClick={this.onClick} />;
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

    return <image href={nodeConfig.info.picture} x="-20" y="-68" width="40px" height="40px" />;
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
