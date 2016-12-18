export type SetUsernameActionType = (username: string) => { payload: string };
export type SetPasswordActionType = (username: string) => { payload: string };
export type ClearDataActionType = Function;
export type SetErrorActionType = (error: bool) => { payload: bool };
