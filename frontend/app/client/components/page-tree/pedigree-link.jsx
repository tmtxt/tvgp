// @flow
import React from 'react';
import d3 from 'd3';

import type { LinkConfigType } from './type';

type PropsType = {
  linkConfig: LinkConfigType
};

const diagonal = d3.svg.diagonal().projection(d => [d.x, d.y]);

const styles = {
  link: {
    fill: 'none',
    stroke: '#ccc',
    strokeWidth: '1.5px'
  }
};

export const PedigreeLink = (props: PropsType) => {
  const { linkConfig } = props;
  const d = diagonal(linkConfig);

  return <path d={d} style={styles.link} />;
};

export default PedigreeLink;
