//
export type PrefaceType = {
  content: string,
  picture: string
};

export type SetPrefaceActionType = (preface: PrefaceType) => {
  payload: PrefaceType
};
