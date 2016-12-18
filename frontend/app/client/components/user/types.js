// data types
export type UserType = { username: string };

// action types
export type SetUserActionType = (user: UserType) => { payload: UserType };
