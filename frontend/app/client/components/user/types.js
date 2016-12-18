// data types
export type UserType = { username: string, userRole: string };

// action types
export type SetUserActionType = (user: UserType) => { payload: UserType };
