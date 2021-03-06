// @flow
import type { PersonInfoType } from 'client/components/person';

export type NodeConfigType = {
  x: number,
  y: number,
  depth: number,
  path: Array<number>,
  info: PersonInfoType,
  marriages: Array<PersonInfoType>,
  children?: Array<NodeConfigType>
};

export type LinkConfigType = {
  source: NodeConfigType,
  target: NodeConfigType
};
