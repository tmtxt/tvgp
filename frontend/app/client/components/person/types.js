// @flow
export type ParentInfoType = {
  id: number,
  type: 'Mother_child'|'Father_child',
  fullName: ?string,
  picture: string
};
export type ParentsType = Array<ParentInfoType>;

export type ChildInfoType = {
  id: number,
  fullName: ?string,
  picture: string
};
export type ChildrenType = Array<ChildInfoType>;

export type AliveStatusType = 'alive' | 'dead' | 'unknown';
export type GenderType = 'male' | 'female' | 'gay' | 'les' | 'unknown';
export type PersonInfoType = {
  address: ?string,
  aliveStatus: ?AliveStatusType,
  birthDate: ?string,
  deathDate: ?string,
  fullName: ?string,
  gender: ?GenderType,
  id: number,
  job: ?string,
  phoneNo: ?string,
  picture: string,
  summary: string,

  parents?: ParentsType
};
