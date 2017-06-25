// @flow
export type TreeIdType = string | number;

export type AliveStatusType = 'alive'|'dead'|'unknown';
export type GenderType = 'male'|'female'|'gay'|'les'|'unknown';
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
  summary: string
};
