export const USER_FETCH = 'USER/FETCH';
export const USER_ERROR = 'USER/ERROR';
export const USER_SUCCESS = 'USER/SUCCESS';
export const USER_LOADING = 'USER/LOADING';
export const USER_LOGIN = 'USER/LOGIN';
export const USER_CLEAN = 'USER/CLEAN';

// export type UserType = {
//     // name: string,
//     // email: string,

// }
export type UserType = UserPayload | UserAuthPayload;

type UserToken = {
	exp: number,
	token: string
};

export type UserAuthPayload = {
    token: UserToken,
    id: string
};

export type UserPayload = {
    // token: UserToken,
    // exp: number
    id: string;
    name: string;
    email: string;
    address?: string;
    phone?: string;
    roles?: string[];
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface UserFetchI {
    type: typeof USER_FETCH
};

export interface UserErrorI {
    type: typeof USER_ERROR;
    message?: string;
};

export interface UserSuccessI {
    type: typeof USER_SUCCESS;
    payload: UserPayload | UserAuthPayload;
};

export interface UserLoadingI {
    type: typeof USER_LOADING;
}

export interface UserLogInI {
	type: typeof USER_LOGIN;
};

export interface UserCleanI {
	type: typeof USER_CLEAN;
};

export interface SignUpDataI {
  username: string;
  email: string;
  password: string;
};

export type UserDispatchTypes = UserFetchI | UserErrorI | UserSuccessI | UserLoadingI | UserLogInI | UserCleanI;
